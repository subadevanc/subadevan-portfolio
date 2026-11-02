import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ctftime from "@/data/ctftime.json";
import { wins } from "@/data/competitions";
import { caseStudies } from "@/data/research";
import { certGroups } from "@/data/certifications";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

type Tile = { label: string; value: ReactNode; detail: string; href?: string; wide?: boolean };

function GlanceGrid() {
  const latest = ctftime.rating.at(-1);
  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0];
  const tiles: Tile[] = [
    {
      label: "Now",
      value: (
        <span className="flex items-center gap-2">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
          Researching
        </span>
      ),
      detail: "Chennai, IN",
      wide: true,
    },
    { label: "Latest bounty", value: featured.recognition.split(" ")[0], detail: `${featured.org} · ${featured.date ?? ""}`, href: "#research" },
    { label: "Wins", value: String(wins.length), detail: "top-3 finishes", href: "#competition" },
    {
      label: "CTFtime",
      value: latest?.ratingPlace ? `#${latest.ratingPlace}` : "—",
      detail: `global · #${latest?.countryPlace ?? "—"} India`,
      href: "#operations",
    },
    { label: "Studies", value: "B.E. CSE", detail: "Cybersecurity · JCE · 2027" },
    { label: "Crews", value: "Flaggers United", detail: "Co-founder · Cyber Nexus Club", href: "#community", wide: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-px border border-line bg-line" aria-label="At a glance">
      {tiles.map((t) => {
        const body = (
          <>
            <span className="label text-[10px]">{t.label}</span>
            <span className="mt-2 block font-display text-2xl font-medium tracking-tight">{t.value}</span>
            <span className="mt-1 block font-mono text-[11px] text-muted">{t.detail}</span>
            {t.href && (
              <ArrowUpRight
                className="absolute right-3 top-3 size-3.5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden
              />
            )}
          </>
        );
        const cls = `group relative block bg-surface p-4 transition-colors ${t.wide ? "col-span-2" : ""} ${
          t.href ? "hover:bg-bg focus-visible:bg-bg" : ""
        }`;
        return t.href ? (
          <a key={t.label} href={t.href} className={cls}>
            {body}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        ) : (
          <div key={t.label} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-28 max-md:py-20 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="about" kicker="About" title={<>Beyond the terminal.</>} />

          <Reveal delay={0.1} className="mt-12 lg:sticky lg:top-28">
            <div className="corner-frame">
              <GlanceGrid />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-36">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.2] tracking-[-0.02em] max-md:text-xl max-md:leading-snug">
              I&rsquo;m a final-year Computer Science and Engineering (Cybersecurity) student in Chennai, and I spend most
              of my time on the offensive side of security: finding the assumptions an application makes, and{" "}
              <span className="text-accent">testing whether they hold.</span>
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 text-lg leading-relaxed text-muted max-md:mt-8 max-md:gap-5 max-md:text-base md:grid-cols-2">
            <Reveal delay={0.05}>
              <p>
                <span className="text-fg">It started with CTFs.</span> In 2024 I co-founded Flaggers United, a CTF team
                that now competes in international events on CTFtime. In 2025 I became president of the CyberNexus Club,
                where we&rsquo;ve run 10+ events, from inter-college CTFs to workshops.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                <span className="text-fg">Competition turned into real research.</span> I test web applications and
                APIs, and I&rsquo;ve responsibly disclosed vulnerabilities to Vercel, Instacart, Sony, ZKTeco, JPMorgan
                Chase, WHO, UNESCO and Porsche.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                <span className="text-fg">I&rsquo;ve worked the defensive side too.</span> As a DevSecOps intern I
                designed least-privilege IAM roles and hardened a multi-cloud deployment before it went live. Knowing how
                systems are built makes me better at breaking them.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                <span className="text-fg">What&rsquo;s next:</span> going deeper into web and API vulnerability research,
                and growing into a full-time offensive security role.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-muted">
              &ldquo;I don&rsquo;t just study security. I investigate real-world vulnerabilities, compete in security
              challenges, build technical solutions and contribute to the community.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 border-t border-line pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="label">Certifications</h3>
                <Link href="/certifications" className="label inline-flex min-h-11 items-center gap-2 text-fg hover:text-accent">
                  All certifications <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {certGroups[0].items.slice(0, 4).map((c) => (
                  <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                    <span>{c.name}</span>
                    <span className="font-mono text-xs text-muted">
                      {c.issuer} · {c.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
