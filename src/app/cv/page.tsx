"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Mail, MapPin, Printer } from "lucide-react";

const pdfHref = "/Dweight_Dewey_Fuentes_CV.pdf";

const skills = [
  ["QA Automation & Testing", "Playwright (E2E testing)"],
  ["Frontend", "React, Next.js, TypeScript, JavaScript, HTML, CSS"],
  ["Backend", "Node.js, tRPC, Express.js"],
  ["Databases", "Postgresql, MySQL"],
  [
    "Tools & Practices",
    "Git, UI/UX Design, Quality Assurance, Test Automation, Agile, TDD",
  ],
];

const experiences = [
  {
    role: "Front-End Developer / QA Automation",
    period: "2024 - Present",
    details: [
      "QA testing for 9+ enterprise applications including AI-driven ATS, POS, and e-commerce platforms.",
      "Executed comprehensive end-to-end validation across multiple platforms.",
      "Contributing to development projects through feature implementation, problem resolution, and technical collaboration with team members.",
    ],
  },
  {
    role: "Software Development Intern",
    organization: "SKANLOG ELEV Internship Program",
    period: "2024",
    details: [
      "Completed 540 hours of intensive development training focused on testing.",
      "Developed and tested Calendar, Central file system, and Visitor System applications.",
    ],
  },
  {
    role: "Alliance Jumpstart Program",
    organization: "Alliance Software Inc",
    period: "2023 - 2024",
    details: [
      "Provided operational system support with QA emphasis.",
      "Developed applications using ASP.NET, JavaScript, and SQL Server.",
    ],
  },
  {
    role: "Quality Assurance Intern",
    organization: "DepEd Regional Office VI",
    period: "2017 - 2020",
    details: [
      "Performed systematic QA across communication channels.",
      "Analyzed problems and developed solutions with teams.",
      "Organized files, spreadsheets, and reports systematically.",
    ],
  },
];

export default function CVPage() {
  const cvRef = useRef<HTMLElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);

    window.setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 80);
  };

  return (
    <main className="page-shell">
      <header className="site-header cv-toolbar">
        <div className="mx-auto flex w-full max-w-[68rem] flex-wrap items-center justify-between gap-4">
          <Link className="action-link" href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          <div className="flex flex-wrap gap-3">
            <button className="action-button" type="button" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              {isPrinting ? "Preparing..." : "Print"}
            </button>
            <a
              className="action-button action-button--primary"
              href={pdfHref}
              download
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[68rem] pt-8">
        <article
          ref={cvRef}
          className="resume-sheet surface-panel overflow-hidden p-6 sm:p-10"
        >
          <section className="grid gap-8 border-b border-[var(--line)] pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)]">
            <div className="space-y-5">
              <p className="eyebrow">Curriculum vitae</p>
              <h1 className="section-title !max-w-[13ch]">
                Dweight Dewey F. Fuentes
              </h1>
              <p className="font-display text-[1.45rem] tracking-[-0.03em] text-[var(--ink)]">
                Junior QA Developer
              </p>
              <p className="max-w-[68ch] text-sm leading-8 text-[var(--ink-muted)]">
                Junior QA Developer with hands-on experience in modern web
                applications. Skilled in React, Next.js, and TypeScript, with a
                strong foundation in automated testing using Playwright and
                performance testing. Experienced in ensuring quality for
                full-stack applications by driving testing automation,
                identifying issues early, and supporting robust application
                performance.
              </p>
            </div>

            <aside className="grid content-start gap-5 text-sm leading-7 text-[var(--ink-muted)]">
              <div>
                <p className="eyebrow">Location</p>
                <p className="mt-2 flex items-center gap-2 text-[var(--ink)]">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />
                  Upper Laguerta, Cebu City
                </p>
              </div>
              <div>
                <p className="eyebrow">Contact</p>
                <div className="mt-2 grid gap-2">
                  <a
                    className="action-link"
                    href="mailto:dfuentes@dxform.ph"
                  >
                    <Mail className="h-4 w-4" />
                    dfuentes@dxform.ph
                  </a>
                  <a
                    className="action-link"
                    href="https://dweight-dev.vercel.app/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    dweight-dev.vercel.app
                  </a>
                </div>
              </div>
            </aside>
          </section>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
            <div className="space-y-10">
              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Experience</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Professional Experience
                  </h2>
                </div>

                <ul className="grid gap-5">
                  {experiences.map((item) => (
                    <li
                      key={`${item.role}-${item.period}`}
                      className="border-t border-[var(--line)] pt-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1.25rem] tracking-[-0.03em] text-[var(--ink)]">
                          {item.role}
                          {item.organization ? (
                            <span className="text-[var(--ink-muted)]">
                              {" "}
                              | {item.organization}
                            </span>
                          ) : null}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                          {item.period}
                        </p>
                      </div>
                      <ul className="mt-3 grid gap-2 pl-5 text-sm leading-7 text-[var(--ink-muted)] [list-style:disc]">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
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
                    Technical Skills
                  </h2>
                </div>

                <dl className="grid gap-4">
                  {skills.map(([title, items]) => (
                    <div
                      key={title}
                      className="border-t border-[var(--line)] pt-4"
                    >
                      <dt className="font-display text-[1.15rem] tracking-[-0.03em] text-[var(--ink)]">
                        {title}
                      </dt>
                      <dd className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        {items}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Education</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    Education
                  </h2>
                </div>
                <div className="border-t border-[var(--line)] pt-4">
                  <h3 className="font-display text-[1.2rem] tracking-[-0.03em] text-[var(--ink)]">
                    Bachelor of Science in Information Technology
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                    University Of Cebu | 2020 - 2024
                  </p>
                </div>
              </section>

              <section className="space-y-5">
                <div className="section-intro !mb-0">
                  <p className="eyebrow">Additional Information</p>
                  <h2 className="section-title !max-w-none !text-[clamp(1.8rem,3vw,2.5rem)]">
                    More
                  </h2>
                </div>
                <div className="grid gap-4">
                  <div className="border-t border-[var(--line)] pt-4">
                    <h3 className="font-display text-[1.15rem] tracking-[-0.03em] text-[var(--ink)]">
                      Languages
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                      English, Tagalog, Cebuano
                    </p>
                  </div>
                  <div className="border-t border-[var(--line)] pt-4">
                    <h3 className="font-display text-[1.15rem] tracking-[-0.03em] text-[var(--ink)]">
                      Awards / Activities
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                      SKANLOG ELEV Internship Program, Alliance Jumpstart
                      Program, Web Security Threats Webinar (2020), 9th ICT
                      Congress 2022
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
