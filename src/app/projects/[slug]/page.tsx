import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProjects, getProjectBySlug } from "@/content/portfolio";

interface ProjectCaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell">
      <div className="mx-auto w-full max-w-[82rem] pt-8">
        <Link className="action-link inline-flex items-center gap-2" href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <article className="section-frame border-t-0 pt-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.36fr)] xl:items-start">
            <div className="space-y-5">
              <p className="eyebrow">{project.eyebrow}</p>
              <h1 className="display-title max-w-[11ch]">{project.title}</h1>
              <p className="lede max-w-[42rem]">{project.summary}</p>

              <div className="flex flex-wrap gap-3">
                <Link className="action-button action-button--primary" href="/cv">
                  View CV
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

            <aside className="surface-panel p-6">
              <dl className="grid gap-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-[var(--ink)]">
                    {project.role}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    Period
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-[var(--ink)]">
                    {project.period}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    Context
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-[var(--ink)]">
                    {project.location}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          {project.image ? (
            <div className="relative mt-10 min-h-[18rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper-soft)] sm:min-h-[22rem]">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1280px) 70vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.04em] text-[var(--ink)]">
                  Context
                </h2>
                <p className="max-w-[65ch] text-sm leading-8 text-[var(--ink-muted)]">
                  {project.context}
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.04em] text-[var(--ink)]">
                  Outcome
                </h2>
                <p className="max-w-[65ch] text-sm leading-8 text-[var(--ink-muted)]">
                  {project.outcome}
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.04em] text-[var(--ink)]">
                  Technical contribution
                </h2>
                <p className="max-w-[65ch] text-sm leading-8 text-[var(--ink-muted)]">
                  {project.technicalContribution}
                </p>
              </section>
            </div>

            <aside className="surface-panel h-fit p-6">
              <h2 className="font-display text-[1.6rem] tracking-[-0.04em] text-[var(--ink)]">
                Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="quiet-tag">
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-6 grid gap-3">
                {project.supportingNotes.map((note) => (
                  <li
                    key={note}
                    className="border-t border-[var(--line)] pt-3 text-sm leading-7 text-[var(--ink)]"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
