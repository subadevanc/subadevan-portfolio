// NEXT_PUBLIC_SITE_URL wins (set it for a custom domain); on Vercel the production URL is detected automatically.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const SECTIONS = [
  { id: "about", label: "About", index: "01" },
  { id: "research", label: "Research", index: "02" },
  { id: "competition", label: "Competition", index: "03" },
  { id: "operations", label: "Operations Room", index: "04" },
  { id: "timeline", label: "Timeline", index: "05" },
  { id: "community", label: "Community", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function sectionIndex(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)!.index;
}
