import { skillCategories } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <MotionSection
      id="skills"
      ariaLabelledBy="skills-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Technical toolkit"
          description="Organized by the areas I use most in data engineering work."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow)]"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {category.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
