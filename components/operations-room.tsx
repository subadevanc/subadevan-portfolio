"use client";

import { useState } from "react";
import Image from "next/image";
import ctftime from "@/data/ctftime.json";
import roster from "@/data/roster.json";
import { safeUrl } from "@/lib/safe-url";
import { sectionIndex } from "@/lib/site";
import { PlacementChart, type ChartEvent } from "./placement-chart";
import { Reveal } from "./reveal";
import { ExternalLink } from "./ui";

const fmtSnapshot = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

const events: ChartEvent[] = ctftime.events;
const years = Array.from(new Set(events.map((e) => e.year))).sort((a, b) => b - a);
const latestRating = ctftime.rating.at(-1);
const best = events.reduce((b, e) => (e.place / e.totalTeams < b.place / b.totalTeams ? e : b));
const firstEvent = events.reduce((a, e) => (e.date < a.date ? e : a));

function Panel({ title, meta, children, className = "" }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`corner-frame min-w-0 border border-line bg-bg p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="label text-fg">{title}</h3>
        {meta && <p className="font-mono text-[11px] text-muted">{meta}</p>}
      </div>
      {children}
    </div>
  );
}

export function OperationsRoom() {
  const [year, setYear] = useState<number | "all">("all");
  const [sort, setSort] = useState<"latest" | "best">("latest");

  const filtered = events.filter((e) => year === "all" || e.year === year);
  const rows = [...filtered].sort((a, b) =>
    sort === "latest" ? b.date.localeCompare(a.date) : a.place / a.totalTeams - b.place / b.totalTeams,
  );
  const perYear = [...years].reverse().map((y) => ({ year: y, count: events.filter((e) => e.year === y).length }));
  const maxCount = Math.max(...perYear.map((p) => p.count));
  const snapshot = fmtSnapshot(ctftime.fetchedAt);

  const stats = [
    { label: `Global rank · ${latestRating?.year}`, value: latestRating?.ratingPlace ? `#${latestRating.ratingPlace}` : "—", sub: "CTFtime rating" },
    { label: `India rank · ${latestRating?.year}`, value: latestRating?.countryPlace ? `#${latestRating.countryPlace}` : "—", sub: "country placing" },
    { label: `Rating points · ${latestRating?.year}`, value: latestRating ? latestRating.points.toFixed(2) : "—", sub: "season to date" },
    { label: "Events played", value: String(events.length), sub: `since ${fmtSnapshot(firstEvent.date + "T00:00:00Z").split(" ").slice(1).join(" ")}` },
    { label: "Best finish", value: `#${best.place}`, sub: `of ${best.totalTeams} · ${best.title}` },
  ];

  return (
    <section id="operations" aria-labelledby="operations-title" className="relative border-y border-line bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#262B33_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="container-x relative py-24 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="label flex items-center gap-3">
                <span className="text-accent">§{sectionIndex("operations")}</span>
                <span className="h-px w-10 bg-line" aria-hidden />
                Competitive intelligence · {ctftime.team.name}
              </p>
              <h2 id="operations-title" className="mt-5 text-[clamp(2.5rem,6.4vw,6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em]">
                The Operations
                <br />
                Room<span className="text-accent">.</span>
              </h2>
            </div>
            <div className="font-mono text-xs leading-relaxed text-muted sm:text-right">
              <p>
                Snapshot <time dateTime={ctftime.fetchedAt} className="text-fg">{snapshot}</time> · official CTFtime API
              </p>
              <p>Team results. Rankings change; check the live profile.</p>
              <ExternalLink href={ctftime.source} className="mt-2 text-fg hover:text-accent">
                Live CTFtime profile
              </ExternalLink>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex flex-wrap items-center gap-5 border-y border-line py-5">
            <Image src="/ctftime/team-logo.png" alt="Flaggers United logo" width={56} height={56} className="size-14 border border-line" />
            <div className="min-w-0">
              <p className="font-display text-2xl font-semibold tracking-tight">{ctftime.team.name}</p>
              <p className="text-sm text-muted">
                {ctftime.team.academic ? "Academic team" : "Team"} · {ctftime.team.university} · {ctftime.team.country === "IN" ? "India" : ctftime.team.country}
              </p>
            </div>
            <p className="font-mono text-xs text-muted md:ml-auto">a.k.a. {ctftime.team.aliases.join(" · ")}</p>
          </div>

          <dl className="mt-px grid grid-cols-2 gap-px bg-line md:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-bg p-5 last:col-span-2 md:last:col-span-1">
                <dt className="label text-[10px]">{s.label}</dt>
                <dd className="order-first font-display text-3xl font-medium tracking-tight md:text-4xl">{s.value}</dd>
                <dd className="truncate font-mono text-[11px] text-muted" title={s.sub}>
                  {s.sub}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-10">
          <div role="group" aria-label="Filter by year" className="flex flex-wrap items-center gap-2">
            <span className="label mr-2">Year</span>
            {(["all", ...years] as const).map((y) => (
              <button
                key={y}
                type="button"
                aria-pressed={year === y}
                onClick={() => setYear(y)}
                className={`min-h-11 border px-4 font-mono text-xs transition-colors ${
                  year === y ? "border-accent text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                {y === "all" ? "All years" : y}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <Panel title="Placement history" meta="each dot is one event · higher is better" className="lg:col-span-8">
              <PlacementChart events={events} year={year} />
            </Panel>

            <Panel title="Participation" meta="events per year" className="lg:col-span-4">
              <ul className="space-y-4">
                {perYear.map((p) => (
                  <li key={p.year} className="grid grid-cols-[3rem_1fr_2rem] items-center gap-3 font-mono text-sm">
                    <span className={year === p.year ? "text-fg" : "text-muted"}>{p.year}</span>
                    <span className="h-3 bg-line">
                      <span
                        className={`block h-full transition-colors ${year === "all" || year === p.year ? "bg-accent" : "bg-muted/40"}`}
                        style={{ width: `${(p.count / maxCount) * 100}%` }}
                      />
                    </span>
                    <span className="text-right text-fg">{p.count}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                CTFtime only lists rating points for the {ctftime.rating.map((r) => r.year).join(", ")} season, so there&rsquo;s
                no ranking-over-time chart. Placement per event is shown instead.
              </p>
            </Panel>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <Panel title="Competition history" meta={`${rows.length} events${year === "all" ? "" : ` in ${year}`}`}>
            <div className="mb-4 flex gap-2" role="group" aria-label="Sort events">
              {(["latest", "best"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={sort === s}
                  onClick={() => setSort(s)}
                  className={`min-h-11 border px-3 font-mono text-xs transition-colors ${
                    sort === s ? "border-fg text-fg" : "border-line text-muted hover:text-fg"
                  }`}
                >
                  {s === "latest" ? "Latest first" : "Best placement"}
                </button>
              ))}
            </div>
            <div className="max-h-[28rem] overflow-auto border-t border-line">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">Flaggers United CTFtime results</caption>
                <thead className="sticky top-0 bg-bg font-mono text-[11px] uppercase tracking-wider text-muted">
                  <tr>
                    <th scope="col" className="py-3 pr-4 font-normal">Event</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Date</th>
                    <th scope="col" className="py-3 pr-4 text-right font-normal">Place</th>
                    <th scope="col" className="py-3 pr-4 text-right font-normal">Top %</th>
                    <th scope="col" className="py-3 text-right font-normal">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-mono text-xs">
                  {rows.map((e) => {
                    const href = safeUrl(ctftime.events.find((x) => x.id === e.id)?.url);
                    return (
                      <tr key={e.id} className="transition-colors hover:bg-surface">
                        <th scope="row" className="py-3 pr-4 font-sans text-sm font-normal">
                          {href ? (
                            <ExternalLink href={href} className="hover:text-accent" arrow={false}>
                              {e.title}
                            </ExternalLink>
                          ) : (
                            e.title
                          )}
                        </th>
                        <td className="whitespace-nowrap py-3 pr-4 text-muted">{e.date}</td>
                        <td className="py-3 pr-4 text-right">
                          #{e.place}
                          <span className="text-muted">/{e.totalTeams}</span>
                        </td>
                        <td className="py-3 pr-4 text-right">{((e.place / e.totalTeams) * 100).toFixed(0)}%</td>
                        <td className="py-3 text-right text-muted">{e.points.toLocaleString("en-US")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        </Reveal>

        <Reveal className="mt-6">
          <Panel title="Team roster" meta={`public CTFtime members · snapshot ${fmtSnapshot(roster.snapshotDate + "T00:00:00Z")}`}>
            <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
              {roster.members.map((m) => (
                <li key={m.url} className="bg-bg">
                  <ExternalLink
                    href={m.url}
                    className="flex min-h-12 w-full justify-between px-3 py-3 font-mono text-xs text-muted transition-colors hover:bg-surface hover:text-fg"
                  >
                    <span className="truncate">
                      {m.handle === "subadevanc" ? <span className="text-accent">{m.handle}</span> : m.handle}
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Individual contributions aren&rsquo;t listed here; each player&rsquo;s CTFtime profile has their own record.</p>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
