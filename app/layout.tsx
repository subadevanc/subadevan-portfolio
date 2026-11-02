import { ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chrome } from "@/components/chrome";
import { wins } from "@/data/competitions";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

const description = `Subadevan C, offensive security researcher in Chennai. Web & API bugs disclosed to Vercel, Instacart, Sony, WHO and UNESCO; ${wins.length} CTF wins.`;
const TITLE = `${profile.name} — Offensive Security Researcher (Web & API)`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: ["Subadevan C", "Subadevan", "subadevanc", "security researcher Chennai", "offensive security", "web security", "API security", "bug bounty", "CTF", "Flaggers United", "VAPT"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  category: "technology",
  openGraph: {
    type: "profile",
    title: TITLE,
    description,
    url: "/",
    siteName: profile.name,
    locale: "en_IN",
    firstName: "Subadevan",
    lastName: "C",
    username: profile.handle,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description,
    creator: `@${profile.handle}`,
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/writeups/rss.xml", title: `${profile.name} — Write-ups` }] },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Chrome>
          <ViewTransition>{children}</ViewTransition>
        </Chrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
