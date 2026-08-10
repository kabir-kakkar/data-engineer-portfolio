import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  return (
    <MotionSection
      id="education"
      ariaLabelledBy="education-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="education-heading"
          eyebrow="Education"
          title="Academic background"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <article
              key={item.institution}
              className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {item.institution}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {item.degree}
              </p>
              <p className="mt-4 text-sm font-medium text-accent">{item.dates}</p>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
