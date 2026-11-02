import { rankedCompetitions, type Competition } from "@/data/competitions";
import { PhotoFigure } from "./photo";
import { Reveal } from "./reveal";
import { ExternalLink, SectionHeading } from "./ui";

function Result({ c, index }: { c: Competition; index: number }) {
  const meta = [c.host, c.kind, c.date].filter(Boolean).join(" · ");
  const hasPhotos = Boolean(c.photos?.length);

  return (
    <li className="border-b border-line">
      <Reveal>
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
    </li>
  );
}

export function Hall() {
  return (
    <section id="competition" aria-labelledby="competition-title" className="container-x py-28 md:py-40">
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

      <ol className="mt-16 border-t border-line" aria-label="Competition results">
        {rankedCompetitions.map((c, i) => (
          <Result key={c.event} c={c} index={i} />
        ))}
      </ol>
    </section>
  );
}
