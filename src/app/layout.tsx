// app/layout.tsx
<<<<<<< HEAD
import { Providers } from "./_trpc/Provider";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "MiPocket",
    description: "Your personal pocket app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
=======
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Dweight | Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-2">{children}</body>
    </html>
  );
>>>>>>> d42dac0 (initial portfolio)
}
