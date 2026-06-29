import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CVPage from "./page";
import { ThemeProvider } from "@/components/theme-provider";

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

describe("CVPage", () => {
  it("presents the QA-focused CV with print and downloadable PDF actions", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <CVPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /dweight dewey f\. fuentes/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Junior QA Developer")
    ).toBeInTheDocument();
    expect(screen.getByText(/playwright \(e2e testing\)/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /professional experience/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/front-end developer \/ qa automation/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /download cv/i })
    ).toHaveAttribute("href", "/Dweight_Dewey_Fuentes_CV.pdf");
  });
});
