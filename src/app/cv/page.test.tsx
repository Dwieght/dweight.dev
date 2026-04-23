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
  it("presents the shorter CV view without losing print and PDF actions", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <CVPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /curriculum vitae/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/mid-level full-stack engineer/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download pdf/i })
    ).toBeInTheDocument();
  });
});
