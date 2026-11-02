import { wins } from "@/data/competitions";
import { cyberNexus, flaggersUnited } from "@/data/community";
import { profile, socials } from "@/data/profile";
import { caseStudies } from "@/data/research";
import { SITE_URL } from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** One consistent description reused in meta tags, Open Graph and structured data. */
export const PERSON_DESCRIPTION = `${profile.name} is an offensive security researcher from Chennai, India, focused on web and API security. He has responsibly disclosed vulnerabilities to Vercel, Instacart, Sony, ZKTeco, JPMorgan Chase, WHO, UNESCO and Porsche, has ${wins.length} top-3 competition finishes, and co-founded the CTF team Flaggers United.`;

// Profiles that belong to the person himself (the CTFtime team page belongs to the team, so his user page is used).
const SAME_AS = [
  ...socials.filter((s) => s.label !== "CTFtime").map((s) => s.href),
  "https://ctftime.org/user/186248",
];

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: ["Subadevan", profile.handle],
    url: SITE_URL,
    image: `${SITE_URL}${profile.photo}`,
    jobTitle: profile.title,
    description: PERSON_DESCRIPTION,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
    nationality: { "@type": "Country", name: "India" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    memberOf: [
      { "@type": "Organization", name: flaggersUnited.name, url: flaggersUnited.ctftime },
      { "@type": "Organization", name: cyberNexus.name },
    ],
    knowsAbout: [
      "Offensive security",
      "Web application security",
      "API security",
      "Penetration testing",
      "Bug bounty",
      "Responsible disclosure",
      "Capture the Flag (CTF)",
      "DevSecOps",
      "Cloud security",
    ],
    award: [
      ...caseStudies.map((c) => `${c.org}: ${c.recognition}`),
      ...wins.slice(0, 8).map((c) => `${c.result} — ${c.event}`),
    ],
    sameAs: SAME_AS,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: profile.name,
    description: PERSON_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

/** Safe JSON-LD serialization for <script type="application/ld+json">. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
