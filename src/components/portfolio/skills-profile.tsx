import React from "react";
import type { CredentialHighlight, SkillGroup } from "@/content/portfolio";

interface SkillsProfileProps {
  groups: SkillGroup[];
  credentials: CredentialHighlight[];
}

export function SkillsProfile({ groups, credentials }: SkillsProfileProps) {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="section-frame"
    >
      <div className="section-intro">
        <p className="eyebrow">Capabilities</p>
        <h2 id="credentials-title" className="section-title">
          Skills stay supportive. Credentials stay secondary.
        </h2>
        <p className="lede">
          The portfolio leads with work and uses capabilities as reinforcement,
          not as a substitute for proof.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
        <div className="grid gap-5">
          {groups.map((group) => (
            <article key={group.title} className="surface-panel p-6">
              <p className="eyebrow">{group.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
                {group.note}
              </p>
              <ul className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[var(--line)] pt-3 text-sm leading-7 text-[var(--ink)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="surface-panel p-6">
          <p className="eyebrow">Selected credentials</p>
          <h3 className="section-title !text-[clamp(1.8rem,3vw,2.4rem)]">
            Useful context, not the headline.
          </h3>
          <ul className="mt-6 grid gap-4">
            {credentials.map((credential) => (
              <li
                key={credential.title}
                className="border-t border-[var(--line)] pt-4"
              >
                <p className="font-display text-xl tracking-[-0.03em] text-[var(--ink)]">
                  {credential.title}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                  {credential.issuer}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                  {credential.note}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
