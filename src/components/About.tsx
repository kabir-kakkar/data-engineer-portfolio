import { about } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <MotionSection
      id="about"
      ariaLabelledBy="about-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="What I focus on"
          description="A concise look at how I approach data engineering work."
        />
        <div className="grid gap-6 max-w-3xl">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
