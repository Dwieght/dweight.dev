import React from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/content/portfolio";

interface SiteFooterProps {
  profile: Profile;
}

const footerIcons = {
  Email: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
};

export function SiteFooter({ profile }: SiteFooterProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-frame pb-10"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">
            If the work fits, the shorter version is easy to forward.
          </h2>
          <p className="lede">
            Start with the CV if you need the compact summary. Reach out if you
            want to talk through product delivery, technical decisions, or the
            case studies in more detail.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link className="action-button action-button--primary" href="/cv">
            View CV
            <ArrowRight className="h-4 w-4" />
          </Link>
          {profile.links.map((link) => {
            const Icon = footerIcons[link.label as keyof typeof footerIcons];
            return (
              <Link
                key={link.label}
                className="action-button"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="mt-8 border-t border-[var(--line)] pt-4 text-sm text-[var(--ink-soft)]">
        Built to be scanned quickly, then defended with real work.
      </footer>
    </section>
  );
}
