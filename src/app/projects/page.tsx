import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { allProjects } from "@/content/portfolio";

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto w-full max-w-[82rem] pt-8">
        <Link className="action-link inline-flex items-center gap-2" href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <section className="section-frame border-t-0 pt-8">
          <div className="section-intro">
            <p className="eyebrow">All work</p>
            <h1 className="display-title max-w-[10ch]">Projects and experiments</h1>
            <p className="lede">
              Featured case studies lead. Supporting work stays available for
              readers who want the broader picture.
            </p>
          </div>

          <ul className="mt-10 grid gap-5">
            {allProjects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-3 border-t border-[var(--line)] pt-5 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="font-display text-[1.7rem] tracking-[-0.04em] text-[var(--ink)]">
                    {project.title}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                    {project.eyebrow}
                  </p>
                  <p className="mt-3 max-w-[62ch] text-sm leading-7 text-[var(--ink-muted)]">
                    {project.summary}
                  </p>
                </div>
                <div>
                  <Link
                    className="action-button"
                    href={`/projects/${project.slug}`}
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
