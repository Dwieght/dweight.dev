import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill: _fill,
    priority: _priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
  }) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

vi.mock("@/components/portfolio/hero-artifact", () => ({
  HeroArtifact: () => <div aria-label="Interactive 3D scene">3D scene</div>,
}));

describe("HomePage", () => {
  it("renders a proof-led hero with a CV CTA and three featured case studies", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /mid-level full-stack engineer/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: /view cv/i }).every((link) =>
        link.getAttribute("href") === "/cv"
      )
    ).toBe(true);

    const featuredCaseStudies = screen.getByRole("region", {
      name: /featured case studies/i,
    });

    expect(
      within(featuredCaseStudies).getAllByRole("link", {
        name: /read case study/i,
      })
    ).toHaveLength(3);
  });

  it("keeps gesture control off the homepage while still linking to the experiment", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /gesture lab/i })).toHaveAttribute(
      "href",
      "/projects/gesture-lab"
    );

    expect(
      screen.queryByRole("button", { name: /scroll mode off/i })
    ).not.toBeInTheDocument();
  });
});
