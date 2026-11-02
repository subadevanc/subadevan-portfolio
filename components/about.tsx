import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certGroups } from "@/data/certifications";
import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

function Barcode({ seed }: { seed: string }) {
  const bars = Array.from(seed + seed, (ch, i) => ({ x: i * 7, w: (ch.charCodeAt(0) % 3) + 1 }));
  return (
    <svg viewBox={`0 0 ${bars.length * 7} 28`} className="h-7 w-full" aria-hidden preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w * 1.6} height={28} fill="currentColor" />
      ))}
    </svg>
  );
}

const FILE: [string, string][] = [
  ["Subject", profile.name],
  ["Focus", "Web & API security · VAPT"],
  ["Base", profile.location],
  ["Studies", "B.E. CSE (Cybersecurity), JCE · 2027"],
  ["Crews", "Flaggers United · CyberNexus Club"],
  ["Speaks", profile.languages.join(", ")],
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-28 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="about" kicker="About" title={<>Beyond the terminal.</>} />

          <Reveal delay={0.1} className="mt-12 lg:sticky lg:top-28">
            <figure className="corner-frame border border-line bg-surface p-6 font-mono text-sm" aria-label="Profile card">
              <span className="label text-[11px]">At a glance</span>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {FILE.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[6rem_1fr] gap-4 py-2.5">
                  <dt className="text-muted">Clearance</dt>
                  <dd>
                    <span className="border border-accent px-1.5 py-0.5 text-[11px] uppercase tracking-widest text-accent">
                      Public
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 text-muted">
                <Barcode seed="SUBADEVAN-C" />
              </div>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-36">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.2] tracking-[-0.02em]">
              I&rsquo;m a final-year Computer Science and Engineering (Cybersecurity) student in Chennai, and I spend most
              of my time on the offensive side of security: finding the assumptions an application makes, and{" "}
              <span className="text-accent">testing whether they hold.</span>
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 text-lg leading-relaxed text-muted md:grid-cols-2">
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
