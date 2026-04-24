import React from "react";
import Link from "next/link";
import {
  FeaturedProjects,
} from "@/components/portfolio/featured-projects";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { HomeHero } from "@/components/portfolio/home-hero";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SkillsProfile } from "@/components/portfolio/skills-profile";
import {
  archiveProjects,
  credentialHighlights,
  experienceItems,
  featuredProjects,
  profile,
  skillGroups,
} from "@/content/portfolio";

const navigationItems = [
  { label: "Work", href: "#featured-case-studies" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4">
          <div>
            <p className="eyebrow !mb-1">Dweight Fuentes</p>
            <p className="text-sm text-[var(--ink-muted)]">
              Portfolio calibrated for hiring managers
            </p>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[var(--ink-muted)] md:flex">
            {navigationItems.map((item) => (
              <Link key={item.href} className="action-link" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link className="action-button action-button--primary" href="/cv">
            View CV
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[90rem]">
        <HomeHero profile={profile} />
        <FeaturedProjects
          featuredProjects={featuredProjects}
          archiveProjects={archiveProjects}
        />
        <ExperienceTimeline items={experienceItems} />
        <SkillsProfile
          groups={skillGroups}
          credentials={credentialHighlights}
        />
        <SiteFooter profile={profile} />
      </div>
    </main>
  );
}
