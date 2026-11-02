import { cyberNexus } from "@/data/community";
import { wins } from "@/data/competitions";
import { profile } from "@/data/profile";
import { caseStudies, disclosures } from "@/data/research";
import { jsonLdString, PERSON_ID, personJsonLd, WEBSITE_ID, websiteJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { About } from "@/components/about";
import { Community } from "@/components/community";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hall } from "@/components/hall";
import { Hero, type HeroStat } from "@/components/hero";
import { OperationsRoom } from "@/components/operations-room";
import { ResearchLab } from "@/components/research-lab";
import { Timeline } from "@/components/timeline";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const stats: HeroStat[] = [
    {
      value: pad(caseStudies.length + disclosures.length),
      label: "Organizations disclosed to",
      detail: "Vercel · Sony · Instacart · +5",
    },
    { value: "03", label: "Paid bounties", detail: "$400 · $250 · ₹18,000" },
    { value: pad(wins.length), label: "Competition wins", detail: "Top-3 finishes · CTF & bug bounty" },
    { value: cyberNexus.eventsCount, label: "Events organized", detail: "Cyber Nexus Club · Flaggers United" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: `${profile.name} — ${profile.title}`,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        dateCreated: "2026-11-02T00:00:00+05:30",
        dateModified: "2026-11-03T00:00:00+05:30",
        inLanguage: "en",
      },
      personJsonLd(),
    ],
  };

  return (
    <>
      <main id="main">
        <Hero stats={stats} />
        <About />
        <ResearchLab />
        <Hall />
        <OperationsRoom />
        <Timeline />
        <Community />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
    </>
  );
}
