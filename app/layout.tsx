import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { wins } from "@/data/competitions";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

const description =
  `Subadevan C — offensive security researcher focused on web and API security. Responsible disclosures to Vercel, Instacart, Sony and more; ${wins.length} competition wins; co-founder of Flaggers United.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  keywords: ["Subadevan C", "security researcher", "web security", "API security", "bug bounty", "CTF", "Flaggers United", "VAPT"],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description,
    url: "/",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
    creator: `@${profile.handle}`,
  },
  alternates: { canonical: "/" },
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
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
