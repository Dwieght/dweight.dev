import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import type { Profile } from "@/content/portfolio";

interface HomeHeroProps {
  profile: Profile;
}

export function HomeHero({ profile }: HomeHeroProps) {
  return (
    <section className="grid gap-10 pb-12 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.85fr)] lg:items-start lg:pt-16">
      <div className="space-y-8">
        <div className="space-y-5">
          <p className="eyebrow">{profile.contextLine}</p>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--ink-soft)]">
              {profile.name}
            </p>
            <h1 className="display-title max-w-[11ch]">{profile.headline}</h1>
          </div>
          <p className="lede max-w-[38rem]">{profile.positioning}</p>
          <p className="max-w-[42rem] text-[1rem] leading-8 text-[var(--ink-muted)]">
            {profile.introduction}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link className="action-button action-button--primary" href="/cv">
            <Download className="h-4 w-4" />
            View CV
          </Link>
          <Link className="action-button" href="#featured-case-studies">
            Read case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          {profile.proofSignals.map((signal) => (
            <div key={signal.label} className="note-block">
              <dt className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                {signal.label}
              </dt>
              <dd className="mt-2 text-sm leading-7 text-[var(--ink)]">
                {signal.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-4 lg:pt-6">
        <div className="surface-panel p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--paper-soft)]">
              <Image
                src={profile.portrait}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-[1.4rem] tracking-[-0.03em] text-[var(--ink)]">
                {profile.name}
              </h2>
              <p className="text-sm text-[var(--ink-muted)]">
                {profile.currentRole}
              </p>
              <p className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
            Quietly warm, technically literate, and built for readers who skim
            first and verify later.
          </p>
        </div>
      </div>
    </section>
  );
}
