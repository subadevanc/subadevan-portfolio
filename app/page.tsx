import { cyberNexus } from "@/data/community";
import { wins } from "@/data/competitions";
import { profile, socials } from "@/data/profile";
import { caseStudies, disclosures } from "@/data/research";
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
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    memberOf: { "@type": "Organization", name: "Flaggers United", url: "https://ctftime.org/team/356365" },
    sameAs: socials.map((s) => s.href),
    knowsAbout: ["Web application security", "API security", "Penetration testing", "Capture the Flag"],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
