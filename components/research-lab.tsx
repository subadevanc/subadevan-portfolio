"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Plus } from "lucide-react";
import { caseStudies, disclosures, experience, type CaseStudy } from "@/data/research";
import { PhotoFigure } from "./photo";
import { useHashOpen } from "@/lib/use-hash-open";
import { Pipeline } from "./pipeline";
import { Reveal } from "./reveal";
import { ExternalLink, Field, Placeholder, SectionHeading } from "./ui";

function RedactedPoc() {
  return (
    <p className="flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-5 font-mono text-xs text-muted">
      <span className="text-fg">Proof of concept</span>
      <span
        className="redact w-40 sm:w-64"
        role="img"
        aria-label="Redacted"
        title="Withheld on purpose. That's what responsible disclosure means."
      />
      <span>withheld · responsible disclosure</span>
    </p>
  );
}

function CaseFields({ c, phoneCollapsed = false }: { c: CaseStudy; phoneCollapsed?: boolean }) {
  const more = phoneCollapsed ? "max-md:hidden" : "";
  return (
    <div className="space-y-8">
      <Pipeline stage={c.stage} />
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <Field label="Technical overview">{c.overview}</Field>
        <div className={more}>
          <Field label="Root cause">{c.rootCause}</Field>
        </div>
        <div className={more}>
          <Field label="Security implications">{c.implications}</Field>
        </div>
        <div className={more}>
          <Field label="Disclosure process">{c.disclosure}</Field>
        </div>
        <div className={more}>
          <Field label="Resolution">{c.resolution}</Field>
        </div>
        <div className={more}>
        <Field label="Evidence">
          {c.evidence.length > 0 ? (
            <ul className="space-y-1">
              {c.evidence.map((e) => (
                <li key={e.href}>
                  <ExternalLink href={e.href} className="link-draw text-fg">
                    {e.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-muted">{c.photos?.length ? "Screenshots below." : "Private report. No public evidence link."}</span>
          )}
        </Field>
        </div>
      </div>
      {c.photos && (
        <div className={`grid gap-2 sm:grid-cols-2 ${more}`}>
          {c.photos.map((ph) => (
            <PhotoFigure key={ph.src} photo={ph} caption sizes="(min-width: 640px) 30vw, 100vw" />
          ))}
        </div>
      )}
      <div className={more}>
        <RedactedPoc />
      </div>
    </div>
  );
}

function Meta({ c }: { c: CaseStudy }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-sm">
      <div>
        <dt className="label text-[11px]">Category</dt>
        <dd className="mt-1">{c.category}</dd>
      </div>
      <div>
        <dt className="label text-[11px]">Recognition</dt>
        <dd className="mt-1 text-accent">{c.recognition}</dd>
      </div>
      <div>
        <dt className="label text-[11px]">Status</dt>
        <dd className="mt-1">{c.status}</dd>
      </div>
      <div>
        <dt className="label text-[11px]">Date</dt>
        <dd className="mt-1">{c.date ?? <Placeholder>date</Placeholder>}</dd>
      </div>
    </dl>
  );
}

export function ResearchLab() {
  const featured = caseStudies.find((c) => c.featured)!;
  const rest = caseStudies.filter((c) => !c.featured);
  const [open, setOpen] = useState<string | null>(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  useHashOpen("case-", rest.map((c) => c.id), setOpen);

  return (
    <section id="research" aria-labelledby="research-title" className="container-x py-28 max-md:py-20 md:py-40">
      <SectionHeading
        id="research"
        kicker="Security research"
        title={
          <>
            Research. Discover.
            <br />
            Disclose<span className="text-accent">.</span>
          </>
        }
        intro="Case files from real programs. Proofs of concept stay private, because that's the point of responsible disclosure."
      />

      <Reveal className="mt-20">
        <article id="case-vercel" className="corner-frame grid border border-line bg-surface lg:grid-cols-12" aria-labelledby="case-vercel-title">
          <div className="flex flex-col gap-8 border-b border-line p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="label flex items-center gap-2">
              <span className="size-1.5 bg-accent" aria-hidden /> Featured case · 01
            </p>
            <div>
              <p className="font-display text-6xl font-semibold tracking-[-0.04em]">{featured.org}</p>
              <p className="mt-2 font-mono text-sm text-muted">{featured.program}</p>
            </div>
            <Meta c={featured} />
          </div>
          <div className="p-6 sm:p-8 lg:col-span-8">
            <h3 id="case-vercel-title" className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">
              {featured.title}
            </h3>
            <CaseFields c={featured} phoneCollapsed={!featuredOpen} />
            <button
              type="button"
              onClick={() => setFeaturedOpen((v) => !v)}
              aria-expanded={featuredOpen}
              className="label mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line text-fg md:hidden"
            >
              {featuredOpen ? "Show less" : "Read full case file"}
              <ChevronDown className={`size-4 transition-transform ${featuredOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>
        </article>
      </Reveal>

      <Reveal className="mt-20">
        <h3 className="label">More case files</h3>
        <ul className="mt-4 border-t border-line">
          {rest.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <li key={c.id} id={`case-${c.id}`} className="border-b border-line">
                <h4>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`case-${c.id}-body`}
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 py-7 text-left md:grid-cols-[3rem_13rem_1fr_auto_auto]"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 2).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                      {c.org}
                    </span>
                    <Plus
                      className={`size-5 self-center text-muted transition-transform duration-300 md:order-last ${isOpen ? "rotate-45 text-accent" : ""}`}
                      aria-hidden
                    />
                    <span className="col-span-3 col-start-2 md:col-span-1 md:col-start-auto">
                      <span className="block text-fg">{c.title}</span>
                      <span className="label mt-1 block text-[11px]">{c.category}</span>
                    </span>
                    <span className="col-span-3 col-start-2 font-mono text-sm text-accent md:col-span-1 md:col-start-auto">
                      {c.recognition}
                    </span>
                  </button>
                </h4>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`case-${c.id}-body`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 pb-10 md:pl-[3rem] lg:grid-cols-12">
                        <div className="lg:col-span-4">
                          <p className="mb-6 font-mono text-sm text-muted">{c.program ?? "Responsible disclosure"}</p>
                          <Meta c={c} />
                        </div>
                        <div className="lg:col-span-8">
                          <CaseFields c={c} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mt-24 grid gap-16 lg:grid-cols-12">
        <Reveal className="min-w-0 lg:col-span-7">
          <div id="disclosures">
            <h3 className="label">Disclosure ledger</h3>
            <p className="mt-3 max-w-lg text-muted">More responsible disclosures, with public acknowledgements and screenshots where they exist. The stories behind some of them are in the <Link href="/writeups" className="link-draw text-fg">write-ups</Link>.</p>
            <ol className="mt-6 border-t border-line">
              {disclosures.map((d) => (
                <li key={d.org} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-mono text-xs text-muted">{d.date ?? "Date not public"}</p>
                    <p className="mt-2 text-xl font-medium">{d.org}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {d.finding} · <span className="text-accent">{d.outcome}</span>
                    </p>
                    {d.note && <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{d.note}</p>}
                    {d.evidence && (
                      <ExternalLink href={d.evidence.href} className="label mt-3 min-h-11 text-fg hover:text-accent">
                        {d.evidence.label}
                      </ExternalLink>
                    )}
                  </div>
                  {d.photos?.map((ph) => (
                    <PhotoFigure key={ph.src} photo={ph} className="w-full sm:w-64" sizes="16rem" />
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-5">
          <article id="experience" aria-labelledby="experience-title" className="h-full border border-line p-6 sm:p-8">
            <p className="label">Experience · defense informs offense</p>
            <h3 id="experience-title" className="mt-5 text-3xl font-semibold tracking-tight">
              {experience.role}
            </h3>
            <p className="mt-1 text-muted">
              {experience.company} ({experience.context}) · {experience.location}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{experience.period}</p>
            <p className="mt-6 leading-relaxed">{experience.summary}</p>
            {experience.photo && (
              <PhotoFigure photo={experience.photo} fit="cover" className="mt-6 aspect-[16/7]" sizes="(min-width: 1024px) 30vw, 100vw" />
            )}
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
              {experience.points.map((p) => (
                <li key={p} className="grid grid-cols-[1rem_1fr]">
                  <span className="mt-2 size-1 bg-accent" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <ExternalLink href={experience.repo} className="label mt-8 text-fg hover:text-accent">
              Infrastructure repo
            </ExternalLink>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
