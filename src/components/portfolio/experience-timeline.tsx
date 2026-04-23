import React from "react";
import type { ExperienceItem } from "@/content/portfolio";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-frame"
    >
      <div className="section-intro">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title" className="section-title">
          Work history that reinforces the portfolio.
        </h2>
        <p className="lede">
          Experience supports the selected work instead of trying to outshout it.
          The message is simple: this is production experience, not portfolio
          theater.
        </p>
      </div>

      <ol className="grid gap-5">
        {items.map((item) => (
          <li
            key={`${item.organization}-${item.role}`}
            className="grid gap-3 border-t border-[var(--line)] pt-5 lg:grid-cols-[minmax(12rem,0.32fr)_minmax(0,1fr)] lg:gap-8"
          >
            <div className="space-y-1 text-sm text-[var(--ink-soft)]">
              <p className="uppercase tracking-[0.18em]">{item.period}</p>
              <p>{item.location}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-[1.75rem] tracking-[-0.04em] text-[var(--ink)]">
                {item.role}
              </h3>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                {item.organization}
              </p>
              <p className="max-w-[65ch] text-sm leading-7 text-[var(--ink-muted)]">
                {item.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
