import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioEntry } from "@/content/portfolio";
import { cn } from "@/lib/utils";

interface FeaturedProjectsProps {
  featuredProjects: PortfolioEntry[];
  archiveProjects: PortfolioEntry[];
}

export function FeaturedProjects({
  featuredProjects,
  archiveProjects,
}: FeaturedProjectsProps) {
  return (
    <section
      id="featured-case-studies"
      aria-labelledby="featured-case-studies-title"
      className="section-frame"
    >
      <div className="section-intro">
        <p className="eyebrow">Selected work</p>
        <h2 id="featured-case-studies-title" className="section-title">
          Featured case studies
        </h2>
        <p className="lede">
          Three projects carry the strongest proof: shipped product surfaces,
          real workflow constraints, and enough technical depth to reward closer
          reading.
        </p>
      </div>

      <div className="space-y-14">
        {featuredProjects.map((project, index) => (
          <article
            key={project.slug}
            className="grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:gap-10 lg:pt-10"
          >
            <div
              className={cn(
                "space-y-5",
                index % 2 === 1 && "lg:order-2 lg:pl-8 xl:pl-14"
              )}
            >
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} / {project.eyebrow}
              </p>
              <div className="space-y-3">
                <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.96] tracking-[-0.05em] text-[var(--ink)]">
                  {project.title}
                </h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                  {project.role} / {project.period}
                </p>
              </div>

              <p className="max-w-[60ch] text-[1rem] leading-8 text-[var(--ink-muted)]">
                {project.summary}
              </p>

              <ul className="grid gap-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="border-t border-[var(--line)] pt-3 text-sm leading-7 text-[var(--ink)]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="quiet-tag">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  className="action-button action-button--primary"
                  href={`/projects/${project.slug}`}
                >
                  Read case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {project.liveUrl ? (
                  <Link
                    className="action-button"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live product
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            <div
              className={cn(
                "relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper-soft)]",
                index % 2 === 1 && "lg:order-1"
              )}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,color-mix(in_oklch,var(--ink)_36%,transparent),transparent)] p-5">
                <p className="font-display text-lg text-white">
                  {project.title}
                </p>
                <p className="mt-1 max-w-[34ch] text-sm leading-6 text-white/84">
                  {project.location}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <div className="surface-panel p-6">
          <div className="section-intro">
            <p className="eyebrow">Project archive</p>
            <h3 className="section-title !text-[clamp(1.8rem,3vw,2.6rem)]">
              Supporting work
            </h3>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Additional shipped products remain visible, but they do not compete
              with the primary case studies.
            </p>
          </div>

          <ul className="mt-6 grid gap-4">
            {archiveProjects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-2 border-t border-[var(--line)] pt-4 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="font-display text-xl tracking-[-0.03em] text-[var(--ink)]">
                    {project.title}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-[var(--ink-muted)]">
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Link className="action-link" href={`/projects/${project.slug}`}>
                    Project note
                  </Link>
                  {project.liveUrl ? (
                    <Link
                      className="action-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
