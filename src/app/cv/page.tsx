"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Mail,
  Printer,
} from "lucide-react";
import {
  credentialHighlights,
  experienceItems,
  featuredProjects,
  profile,
  skillGroups,
} from "@/content/portfolio";

export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);

    window.setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 80);
  };

  const generatePdf = async () => {
    if (!cvRef.current) {
      return;
    }

    setIsGeneratingPdf(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: [10, 10, 12, 10],
          filename: "dweight-fuentes-cv.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(cvRef.current)
        .save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="page-shell">
      <header className="site-header cv-toolbar">
        <div className="mx-auto flex w-full max-w-[68rem] items-center justify-between gap-4">
          <Link className="action-link" href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          <div className="flex flex-wrap gap-3">
            <button className="action-button" type="button" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              {isPrinting ? "Preparing..." : "Print"}
            </button>
            <button
              className="action-button action-button--primary"
              type="button"
              onClick={generatePdf}
              disabled={isGeneratingPdf}
            >
              <Download className="h-4 w-4" />
              {isGeneratingPdf ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[68rem] pt-8">
        <article
          ref={cvRef}
          className="resume-sheet surface-panel overflow-hidden p-8 sm:p-10"
        >
          <section className="grid gap-8 border-b border-[var(--line)] pb-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="space-y-4">
              <p className="eyebrow">Curriculum vitae</p>
              <h1 className="section-title !max-w-none">Curriculum vitae</h1>
              <p className="font-display text-[1.45rem] tracking-[-0.03em] text-[var(--ink)]">
                {profile.headline}
              </p>
              <p className="max-w-[62ch] text-sm leading-8 text-[var(--ink-muted)]">
                {profile.positioning}
              </p>
              <p className="max-w-[62ch] text-sm leading-8 text-[var(--ink-muted)]">
                {profile.introduction}
              </p>
            </div>

            <div className="grid gap-4 text-sm leading-7 text-[var(--ink-muted)]">
              <div>
                <p className="eyebrow">Current role</p>
                <p className="mt-2 text-[var(--ink)]">{profile.currentRole}</p>
              </div>
              <div>
                <p className="eyebrow">Location</p>
                <p className="mt-2 text-[var(--ink)]">{profile.location}</p>
              </div>
              <div>
                <p className="eyebrow">Links</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {profile.links.map((link) => (
                    <Link
                      key={link.label}
                      className="action-link"
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label === "Email" ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
            <div className="space-y-10">
              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Experience</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Professional history
                  </h2>
                </div>
                <ul className="grid gap-4">
                  {experienceItems.map((item) => (
                    <li
                      key={`${item.organization}-${item.role}`}
                      className="border-t border-[var(--line)] pt-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1.25rem] tracking-[-0.03em] text-[var(--ink)]">
                          {item.role}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                          {item.period}
                        </p>
                      </div>
                      <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                        {item.organization} / {item.location}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
                        {item.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Selected work</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Case studies on the main site
                  </h2>
                </div>
                <ul className="grid gap-4">
                  {featuredProjects.map((project) => (
                    <li
                      key={project.slug}
                      className="border-t border-[var(--line)] pt-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-display text-[1.25rem] tracking-[-0.03em] text-[var(--ink)]">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                            {project.eyebrow} / {project.period}
                          </p>
                        </div>
                        <Link className="action-link" href={`/projects/${project.slug}`}>
                          Open case study
                        </Link>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
                        {project.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-10">
              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Capabilities</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Working strengths
                  </h2>
                </div>
                <ul className="grid gap-4">
                  {skillGroups.map((group) => (
                    <li
                      key={group.title}
                      className="border-t border-[var(--line)] pt-4"
                    >
                      <p className="font-display text-[1.2rem] tracking-[-0.03em] text-[var(--ink)]">
                        {group.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        {group.note}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="quiet-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Credentials</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Supporting signals
                  </h2>
                </div>
                <ul className="grid gap-4">
                  {credentialHighlights.map((credential) => (
                    <li
                      key={credential.title}
                      className="border-t border-[var(--line)] pt-4"
                    >
                      <p className="font-display text-[1.2rem] tracking-[-0.03em] text-[var(--ink)]">
                        {credential.title}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                        {credential.issuer}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        {credential.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
