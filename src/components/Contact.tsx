import { Mail } from "lucide-react";
import { contact, siteConfig } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

export function Contact() {
  return (
    <MotionSection
      id="contact"
      ariaLabelledBy="contact-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title={contact.headline}
          description={contact.body}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground shadow-[var(--shadow)] transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground shadow-[var(--shadow)] transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedInIcon className="h-5 w-5 shrink-0 text-accent" />
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground shadow-[var(--shadow)] transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubIcon className="h-5 w-5 shrink-0 text-accent" />
            GitHub
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
