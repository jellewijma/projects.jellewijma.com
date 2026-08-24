import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projects.jellewijma.com"),
  title: "Projects — Jelle Wijma",
  description:
    "An overview of public projects by Jelle Wijma, from web products and creative tools to audio software and hardware experiments.",
  openGraph: {
    title: "Projects — Jelle Wijma",
    description:
      "Things I build, test, and explore — a concise index of public GitHub projects.",
    url: "https://projects.jellewijma.com",
    siteName: "Jelle Wijma — Projects",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1750,
        height: 875,
        alt: "Projects — Jelle Wijma. Things I build, test, and explore.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Jelle Wijma",
    description:
      "Things I build, test, and explore — a concise index of public GitHub projects.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
