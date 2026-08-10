"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="projects"
      ariaLabelledBy="projects-heading"
      className="border-b border-border py-20 sm:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Featured work"
          description="Selected systems spanning streaming, lakehouses, and analytics warehouses."
        />

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow)] transition-colors hover:border-accent/40 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {project.name}
                </h3>
                {project.featured ? (
                  <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                    Featured
                  </span>
                ) : null}
              </div>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
                {project.summary}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                <span className="font-semibold text-foreground">Problem: </span>
                {project.problem}
              </p>

              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
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

              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label={`Technologies for ${project.name}`}
              >
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
