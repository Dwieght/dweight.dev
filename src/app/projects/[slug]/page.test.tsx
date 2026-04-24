import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectCaseStudyPage, { generateStaticParams } from "./page";

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

describe("ProjectCaseStudyPage", () => {
  it("renders a case study page for a featured project", async () => {
    const page = await ProjectCaseStudyPage({
      params: { slug: "aicquire" },
    });

    render(page);

    expect(
      screen.getByRole("heading", { level: 1, name: /aicquire/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/outcome/i)).toBeInTheDocument();
    expect(screen.getByText(/technical contribution/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stack" })
    ).toBeInTheDocument();
  });

  it("does not generate the removed gesture lab route", () => {
    expect(generateStaticParams()).not.toContainEqual({ slug: "gesture-lab" });
  });
});
