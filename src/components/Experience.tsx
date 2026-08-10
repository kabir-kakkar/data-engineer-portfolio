import { experience } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <MotionSection
      id="experience"
      ariaLabelledBy="experience-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Where I've built data systems"
          description="Roles focused on pipelines, warehouses, and production reliability."
        />

        <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
          {experience.map((role) => (
            <li key={`${role.company}-${role.dates}`} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background sm:-left-[2.4rem]"
                aria-hidden
              />
              <article className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-base font-medium text-accent">
                      {role.company}
                      <span className="text-muted"> · {role.type}</span>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted whitespace-nowrap">
                    {role.dates}
                  </p>
                </div>

                <ul className="mt-5 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Technologies used at ${role.company}`}>
                  {role.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </MotionSection>
  );
}
