"use client";

import {
  FormEvent,
  ChangeEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { hireModal } from "@/data/portfolio";

type HireModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  /** Always stores the template with literal `[Name]` / `[Company]` placeholders. */
  message: string;
};

const NAME_PLACEHOLDER = hireModal.namePlaceholder;
const COMPANY_PLACEHOLDER = hireModal.companyPlaceholder;
const SUCCESS_MESSAGE = "Message sent successfully";

const emptyForm = (): FormState => ({
  name: "",
  company: "",
  email: "",
  message: hireModal.defaultMessage,
});

function replaceFirst(source: string, search: string, replace: string) {
  const index = source.indexOf(search);
  if (index === -1) return source;
  return source.slice(0, index) + replace + source.slice(index + search.length);
}

/** Show live name/company values in place of placeholders for the textarea. */
function toDisplayMessage(template: string, name: string, company: string) {
  let display = template;
  const trimmedName = name.trim();
  const trimmedCompany = company.trim();

  if (trimmedName) {
    display = display.split(NAME_PLACEHOLDER).join(trimmedName);
  }
  if (trimmedCompany) {
    display = display.split(COMPANY_PLACEHOLDER).join(trimmedCompany);
  }

  return display;
}

/**
 * Convert an edited display message back to a template that keeps placeholders.
 * Uses anchored phrases so short names/companies cannot corrupt other words.
 */
function toTemplateMessage(display: string, name: string, company: string) {
  let template = display;
  const trimmedName = name.trim();
  const trimmedCompany = company.trim();

  if (trimmedName) {
    template = replaceFirst(
      template,
      `My name is ${trimmedName}.`,
      `My name is ${NAME_PLACEHOLDER}.`,
    );
  }

  if (trimmedCompany) {
    template = replaceFirst(
      template,
      `at ${trimmedCompany}`,
      `at ${COMPANY_PLACEHOLDER}`,
    );
  }

  return template;
}

export function HireModal({ open, onClose }: HireModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const isSubmittingRef = useRef(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmittingRef.current) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const displayMessage = toDisplayMessage(
    form.message,
    form.name,
    form.company,
  );

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, email: event.target.value }));
    setError(null);
    setStatus(null);
  };

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      name: event.target.value,
    }));
    setError(null);
    setStatus(null);
  };

  const updateCompany = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      company: event.target.value,
    }));
    setError(null);
    setStatus(null);
  };

  const updateMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextDisplay = event.target.value;
    setForm((current) => ({
      ...current,
      message: toTemplateMessage(
        nextDisplay,
        current.name,
        current.company,
      ),
    }));
    setError(null);
    setStatus(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const name = form.name.trim();
    const company = form.company.trim();
    const email = form.email.trim();
    const message = toDisplayMessage(
      form.message,
      form.name,
      form.company,
    ).trim();

    if (!name || !company || !email || !message) {
      setError("Please fill in all fields before sending.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError(
        "Form submission is temporarily unavailable. Please try again later.",
      );
      return;
    }

    setError(null);
    setStatus("Sending…");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          company,
          subject: `Job opportunity at ${company}`,
          message,
          from_name: "Kabir Kakkar Portfolio",
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.status === 200 && result.success) {
        setStatus(SUCCESS_MESSAGE);
        setForm(emptyForm());
        closeTimerRef.current = window.setTimeout(() => {
          setIsSubmitting(false);
          setStatus(null);
          onClose();
        }, 1200);
        return;
      }

      setError(
        result.message ||
          "Something went wrong while sending your message. Please try again.",
      );
      setStatus(null);
      setIsSubmitting(false);
    } catch {
      setError(
        "Unable to send your message right now. Please check your connection and try again.",
      );
      setStatus(null);
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        aria-label="Close hire dialog"
        onClick={onClose}
        disabled={isSubmitting}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-[81] flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-[var(--shadow)] sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2
              id={titleId}
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              {hireModal.title}
            </h2>
            <p id={descriptionId} className="mt-1 text-sm text-muted">
              {hireModal.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close hire dialog"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-6"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              {hireModal.fields.name}
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                autoComplete="name"
                required
                disabled={isSubmitting}
                value={form.name}
                onChange={updateName}
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              {hireModal.fields.company}
              <input
                type="text"
                name="company"
                autoComplete="organization"
                required
                disabled={isSubmitting}
                value={form.company}
                onChange={updateCompany}
                className={inputClassName}
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              {hireModal.fields.email}
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                value={form.email}
                onChange={updateEmail}
                className={inputClassName}
              />
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-foreground">
            {hireModal.fields.message}
            <textarea
              name="message"
              required
              rows={8}
              disabled={isSubmitting}
              value={displayMessage}
              onChange={updateMessage}
              className={`${inputClassName} resize-y min-h-40`}
            />
          </label>

          {error ? (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          {status ? (
            <p className="mt-3 text-sm text-accent" role="status">
              {status}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {hireModal.cancelLabel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : hireModal.sendLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
