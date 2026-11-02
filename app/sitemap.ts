import type { MetadataRoute } from "next";
import ctftime from "@/data/ctftime.json";
import medium from "@/data/medium.json";
import { sortedWriteups } from "@/data/writeups";
import { SITE_URL } from "@/lib/site";

// Bump this when the page content is edited by hand.
const CONTENT_UPDATED = "2026-11-03";

const latest = (...dates: string[]) => dates.filter(Boolean).sort().at(-1)!;

export default function sitemap(): MetadataRoute.Sitemap {
  const writeupsUpdated = latest(sortedWriteups[0]?.date ?? "", medium.articles[0]?.date ?? "", CONTENT_UPDATED);
  return [
    { url: SITE_URL, lastModified: latest(CONTENT_UPDATED, ctftime.fetchedAt.slice(0, 10)), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/writeups`, lastModified: writeupsUpdated, changeFrequency: "weekly", priority: 0.9 },
    ...sortedWriteups.map((w) => ({
      url: `${SITE_URL}/writeups/${w.slug}`,
      lastModified: w.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/community`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/certifications`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.5 },
  ];
}
