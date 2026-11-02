"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { rankedCompetitions, type Competition } from "@/data/competitions";
import { PhotoFigure } from "./photo";
import { Reveal } from "./reveal";
import { ExternalLink, SectionHeading } from "./ui";

const PHONE_LIMIT = 10;

/** Phone: one compact row per result with a small thumbnail. */
function PhoneRow({ c }: { c: Competition }) {
  const photo = c.photos?.[0];
  return (
    <article className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-3 py-4 md:hidden">
      <p className={`font-display text-2xl font-semibold leading-none tracking-tight ${c.place === 1 ? "text-accent" : ""}`}>{c.result}</p>
      <div className="min-w-0">
        <h3 className="text-[15px] font-medium leading-snug">{c.event}</h3>
        <p className="mt-0.5 truncate text-xs text-muted">{[c.host, c.date].filter(Boolean).join(" · ")}</p>
        {(c.entry || c.prize) && (
          <p className="mt-1 truncate font-mono text-[11px]">
            {c.prize ? <span className="text-accent">{c.prize}</span> : <span className="text-muted">{c.entry}</span>}
          </p>
        )}
      </div>
      {photo ? (
        <Image src={photo.src} alt={photo.alt} width={72} height={72} sizes="72px" className="size-[4.5rem] border border-line object-cover" />
      ) : (
        <span className="size-0" aria-hidden />
      )}
    </article>
  );
}

/** Tablet and laptop: the full editorial layout. */
function WideRow({ c, index }: { c: Competition; index: number }) {
  const meta = [c.host, c.kind, c.date].filter(Boolean).join(" · ");
  const hasPhotos = Boolean(c.photos?.length);

  return (
    <Reveal className="max-md:hidden">
      <article className={`grid gap-6 py-8 ${hasPhotos ? "lg:grid-cols-12 lg:gap-10 lg:py-12" : "sm:grid-cols-[8rem_1fr]"}`}>
        <div className={hasPhotos ? "lg:col-span-7" : "contents"}>
          <div className={hasPhotos ? "" : "sm:pt-1"}>
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <p
              className={`font-display font-semibold leading-none tracking-[-0.04em] ${c.place === 1 ? "text-accent" : ""} ${
                hasPhotos ? "mt-3 text-[clamp(3.5rem,7vw,5.5rem)]" : "mt-1 text-4xl"
              }`}
            >
              {c.result}
            </p>
          </div>
          <div className={hasPhotos ? "mt-6" : ""}>
            <h3 className={hasPhotos ? "text-3xl font-semibold tracking-tight" : "text-xl font-medium"}>{c.event}</h3>
            {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
            {c.story && <p className="mt-4 max-w-xl leading-relaxed text-fg/90">{c.story}</p>}
            {(c.entry || c.prize || c.link) && (
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
                {c.entry && <span className="text-muted">{c.entry}</span>}
                {c.prize && <span className="text-accent">{c.prize}</span>}
                {c.link && (
                  <ExternalLink href={c.link.href} className="text-fg hover:text-accent">
                    {c.link.label}
                  </ExternalLink>
                )}
              </p>
            )}
          </div>
        </div>
        {hasPhotos && (
          <div className="lg:col-span-5">
            <PhotoFigure photo={c.photos![0]} fit="cover" className="aspect-[16/10]" sizes="(min-width: 1024px) 36vw, 100vw" />
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Hall() {
  const [showAll, setShowAll] = useState(false);
  const hidden = rankedCompetitions.length - PHONE_LIMIT;

  return (
    <section id="competition" aria-labelledby="competition-title" className="container-x py-28 max-md:py-20 md:py-40">
      <SectionHeading
        id="competition"
        kicker="Competitive security"
        title={
          <>
            Built through
            <br />
            competition<span className="text-accent">.</span>
          </>
        }
        intro={`All ${rankedCompetitions.length} results, best placement first, with a photo from the day where I have one. Flaggers United's online CTFtime results are in the Operations Room below.`}
      />

      <ol id="competition-list" className="mt-16 border-t border-line max-md:mt-10" aria-label="Competition results">
        {rankedCompetitions.map((c, i) => (
          <li key={c.event} className={`border-b border-line ${!showAll && i >= PHONE_LIMIT ? "max-md:hidden" : ""}`}>
            <PhoneRow c={c} />
            <WideRow c={c} index={i} />
          </li>
        ))}
      </ol>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          aria-controls="competition-list"
          className="label mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line text-fg md:hidden"
        >
          {showAll ? "Show fewer" : `Show all ${rankedCompetitions.length} results`}
          <ChevronDown className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
    </section>
  );
}
