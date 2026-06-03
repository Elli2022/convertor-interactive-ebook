import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Convertor — Interactive Brand E-Book",
  description:
    "Scroll-driven brand story microsite for Convertor AB: passion, prestige-free culture, and results-driven delivery. Built during a frontend internship (2024).",
  openGraph: {
    title: "Convertor — Interactive Brand E-Book",
    description:
      "Interactive single-page brand narrative for Convertor AB, Malmö.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
