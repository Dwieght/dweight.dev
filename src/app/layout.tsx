import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Dweight Fuentes | Portfolio",
  description:
    "Mid-level full-stack engineer shipping production systems across hiring, commerce, and operational software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
