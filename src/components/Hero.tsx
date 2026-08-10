"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { hero, siteConfig } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { HireModal } from "@/components/HireModal";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [hireOpen, setHireOpen] = useState(false);
  const [hireKey, setHireKey] = useState(0);

  const openHireModal = () => {
    setHireKey((key) => key + 1);
    setHireOpen(true);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="hero-atmosphere relative overflow-hidden border-b border-border"
    >
      <div className="section-shell flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-medium tracking-wide text-accent uppercase">
            {siteConfig.title}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-3 inline-flex max-w-full items-center rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
            {hero.availability}
          </p>
          <p className="mt-4 text-sm font-medium text-muted sm:text-base">
            {hero.credential}
          </p>
          <p className="mt-5 font-display text-xl font-medium tracking-tight text-foreground/90 sm:text-2xl">
            {hero.headline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.introduction}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={openHireModal}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
            </button>
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <FileText className="h-4 w-4" aria-hidden />
              View Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <HireModal
        key={hireKey}
        open={hireOpen}
        onClose={() => setHireOpen(false)}
      />
    </section>
  );
}
