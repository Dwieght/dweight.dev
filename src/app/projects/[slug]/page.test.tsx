import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectCaseStudyPage from "./page";

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

vi.mock("@/components/GestureScrollController", () => ({
  GestureScrollController: () => <div>Gesture controller demo</div>,
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

  it("renders a dedicated gesture lab experiment page", async () => {
    const page = await ProjectCaseStudyPage({
      params: { slug: "gesture-lab" },
    });

    render(page);

    expect(
      screen.getByRole("heading", { level: 1, name: /gesture lab/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/experimental case study/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /^Camera access stays opt-in until you activate the live demo below\.$/
      )
    ).toBeInTheDocument();
  });
});
