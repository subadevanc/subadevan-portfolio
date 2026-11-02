import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { rankedCompetitions } from "@/data/competitions";
import { cyberNexus, events, flaggersUnited } from "@/data/community";
import { PhotoFigure } from "./photo";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

const isTeamWin = (entry?: string) => Boolean(entry && /Flaggers United|Son of Thanjai/.test(entry));

export function Community() {
  const teamWins = rankedCompetitions.filter((c) => c.place <= 3 && isTeamWin(c.entry));
  const conducted = events.filter((e) => e.role === "Organized" && e.org === "Cyber Nexus Club");
  const facts = [
    { value: flaggersUnited.since, label: "Founded" },
    { value: String(teamWins.length), label: "Team wins" },
  ];

  return (
    <section id="community" aria-labelledby="community-title" className="py-28 max-md:py-20 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="community"
          kicker="Community"
          title={
            <>
              Built with people<span className="text-accent">.</span>
            </>
          }
          intro="The CTF team I co-founded and the club I led: what we won together, and the events we ran."
        />

        {/* Flaggers United */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="max-md:min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <Image src="/ctftime/team-logo.png" alt="" width={64} height={64} className="size-16 border border-line" />
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">{flaggersUnited.name}</h3>
                  <p className="label mt-1">
                    {flaggersUnited.role} · since {flaggersUnited.since}
                  </p>
                </div>
              </div>
              <p className="mt-8 text-lg leading-relaxed text-muted max-md:mt-5 max-md:text-base">{flaggersUnited.summary}</p>
              <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 bg-bg p-4">
                    <dt className="label text-[10px]">{f.label}</dt>
                    <dd className="order-first font-display text-3xl font-medium tracking-tight">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="max-md:min-w-0 lg:col-span-7">
            <h3 className="label">Winning events as a team <span className="normal-case tracking-normal">(photos in the competition section above)</span></h3>
            <ol className="mt-4 border-t border-line">
              {teamWins.map((c) => (
                <li key={c.event}>
                  <Reveal>
                    <article className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-line py-5 max-md:grid-cols-[3.25rem_1fr] max-md:gap-3 max-md:py-3">
                      <p className={`font-display text-3xl font-semibold tracking-tight max-md:text-2xl ${c.place === 1 ? "text-accent" : ""}`}>{c.result}</p>
                      <div className="max-md:min-w-0">
                        <p className="text-lg font-medium leading-snug max-md:text-[15px]">{c.event}</p>
                        <p className="mt-1 text-sm text-muted max-md:truncate max-md:text-xs">{[c.host, c.date].filter(Boolean).join(" · ")}</p>
                        {c.prize && <p className="mt-1 font-mono text-xs text-accent">{c.prize}</p>}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Cyber Nexus Club */}
      <div className="mt-28 border-y border-line bg-surface">
        <div className="container-x py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{cyberNexus.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted">
                  {cyberNexus.roles.map((r) => (
                    <li key={r.title}>
                      <span className="text-fg">{r.title}</span> · {r.period}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h4 className="label mt-12">Events I conducted</h4>
          </Reveal>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {conducted.map((e, i) => (
              <li key={e.name}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <article className="flex h-full flex-col border border-line bg-bg">
                    {e.photos?.[0] ? (
                      <PhotoFigure
                        photo={e.photos[0]}
                        fit="cover"
                        className="aspect-[16/10] border-0 border-b"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="grid aspect-[16/10] place-items-center border-b border-line bg-surface" aria-hidden>
                        <span className="font-mono text-sm text-term">~/cybernexus</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="label text-[11px]">{e.date}</p>
                      <h5 className="mt-2 text-xl font-semibold tracking-tight">{e.name}</h5>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{e.detail}</p>
                      {e.facts && (
                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {e.facts.map((f) => (
                            <li key={f} className="border border-line px-2 py-1 font-mono text-[11px]">
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Link href="/community" className="label mt-10 inline-flex min-h-11 items-center gap-2 text-fg hover:text-accent">
            Everything on the community page <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
