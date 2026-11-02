import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import Image from "next/image";
import ctftime from "@/data/ctftime.json";
import roster from "@/data/roster.json";
import { competitions } from "@/data/competitions";
import { cyberNexus, events, flaggersUnited, otherRoles } from "@/data/community";
import { Footer } from "@/components/footer";
import { PageHeader, SubHeading } from "@/components/page-header";
import { PhotoFigure } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community: Flaggers United & Cyber Nexus Club",
  description:
    "Subadevan C's community work: co-founder of Flaggers United, President of the CyberNexus Club, organizer of DOOMS CTF 2026, and the events he attends.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  const teamWins = competitions.filter((c) => c.entry?.startsWith("Team") && c.date);
  const organized = events.filter((e) => e.role === "Organized");
  const attended = events.filter((e) => e.role === "Attended");

  return (
    <>
      <main id="main">
        <PageHeader
          path="community"
          title={
            <>
              Built with people<span className="text-accent">.</span>
            </>
          }
          intro="Security is a team sport. The teams I co-founded, the club I led, the events I organized and the rooms I learn in."
        />

        <section aria-labelledby="flaggers-title" className="container-x py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SubHeading id="flaggers" index="01" title="Flaggers United" />
              <Reveal>
                <div className="mt-8 flex items-center gap-4">
                  <Image src="/ctftime/team-logo.png" alt="" width={64} height={64} className="size-16 border border-line" />
                  <p className="label">
                    {flaggersUnited.role} · since {flaggersUnited.since}
                  </p>
                </div>
                <p className="mt-8 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug tracking-[-0.02em]">{flaggersUnited.summary}</p>
                <ul className="mt-8 space-y-3">
                  {flaggersUnited.contributions.map((c) => (
                    <li key={c} className="grid grid-cols-[1rem_1fr]">
                      <span className="mt-2.5 size-1 bg-accent" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <ExternalLink href={flaggersUnited.ctftime} className="label mt-8 min-h-11 text-fg hover:text-accent">
                  Team profile on CTFtime
                </ExternalLink>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-px border border-line bg-line">
                {[
                  [flaggersUnited.since, "Founded"],
                  [String(roster.members.length), "Public members"],
                  [String(ctftime.events.length), "CTFtime events"],
                  [ctftime.rating.at(-1) ? `#${ctftime.rating.at(-1)!.countryPlace}` : "—", "India rank (2026)"],
                ].map(([v, l]) => (
                  <div key={l} className="flex flex-col gap-1 bg-bg p-5">
                    <dt className="label text-[10px]">{l}</dt>
                    <dd className="order-first font-display text-3xl font-medium tracking-tight">{v}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="label mt-10">Recent team results</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {teamWins.map((c) => (
                  <li key={c.event} className="flex items-baseline justify-between gap-4 py-3">
                    <span>
                      <span className="block">{c.event}</span>
                      <span className="font-mono text-xs text-muted">{c.date}</span>
                    </span>
                    <span className="font-display text-xl font-semibold text-accent">{c.result}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="cybernexus-title" className="border-y border-line bg-surface">
          <div className="container-x py-24">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SubHeading id="cybernexus" index="02" title={cyberNexus.name} intro={cyberNexus.summary} />
                <Reveal>
                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {cyberNexus.roles.map((r) => (
                      <li key={r.title} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                        <span className="text-lg">{r.title}</span>
                        <span className="font-mono text-xs text-muted">{r.period}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-10 font-display text-8xl font-semibold leading-none tracking-[-0.06em] text-accent">{cyberNexus.eventsCount}</p>
                  <p className="label mt-2">events organized</p>
                </Reveal>
              </div>

              <div className="space-y-10 lg:col-span-7">
                {organized.map((e) => (
                  <Reveal key={e.name}>
                    <article className="corner-frame border border-line bg-bg p-6 sm:p-8">
                      <p className="label flex flex-wrap gap-x-4">
                        <span className="text-accent">Organized</span>
                        {e.date && <span>{e.date}</span>}
                        {e.where && <span>{e.where}</span>}
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight">{e.name}</h3>
                      <p className="mt-4 leading-relaxed text-muted">{e.detail}</p>
                      {e.facts && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {e.facts.map((f) => (
                            <li key={f} className="border border-line px-3 py-1.5 font-mono text-xs">
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      {e.photos && (
                        <div className="mt-6 grid gap-2 sm:grid-cols-3">
                          {e.photos.map((p) => (
                            <PhotoFigure key={p.src} photo={p} fit="cover" className="aspect-[16/10]" sizes="(min-width: 640px) 20vw, 100vw" />
                          ))}
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="events-title" className="container-x py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SubHeading id="events" index="03" title="Rooms I learn in" intro="Conferences, meet-ups and workshops I've attended." />
              <ol className="mt-10 border-t border-line">
                {attended.map((e) => (
                  <li key={e.name}>
                    <Reveal>
                      <article className="grid gap-4 border-b border-line py-6 sm:grid-cols-[9rem_1fr]">
                        <p className="font-mono text-sm text-muted">{e.date}</p>
                        <div>
                          <h3 className="text-xl font-medium">{e.name}</h3>
                          {e.where && <p className="label mt-1 text-[11px]">{e.where}</p>}
                          <p className="mt-3 leading-relaxed text-muted">{e.detail}</p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pt-28">
              <h3 className="label">Other communities</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {otherRoles.map((r) => (
                  <li key={r.org} className="py-5">
                    <p className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-lg">
                        {r.title}, {r.org}
                      </span>
                      <span className="font-mono text-xs text-muted">{r.period}</span>
                    </p>
                    {r.detail && <p className="mt-2 text-sm text-muted">{r.detail}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd([{ name: "Community", path: "/community" }])) }}
      />
    </>
  );
}
