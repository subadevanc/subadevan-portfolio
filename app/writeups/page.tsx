import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import medium from "@/data/medium.json";
import { formatDate, readMinutes, sortedWriteups } from "@/data/writeups";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Write-ups: CTF and Bug Bounty",
  description: "CTF and responsible-disclosure write-ups by Subadevan C: recon stories, hall-of-fame findings, KPMG CTF solutions and bug bounty write-ups.",
  alternates: { canonical: "/writeups", types: { "application/rss+xml": "/writeups/rss.xml" } },
};

export default function WriteupsPage() {
  return (
    <>
      <main id="main">
        <PageHeader
          path="writeups"
          title={
            <>
              Write-ups<span className="text-accent">.</span>
            </>
          }
          intro="How the findings and the flags actually happened: recon, mistakes and what I learned. Private report details stay private."
        >
          <a href="/writeups/rss.xml" className="label mt-8 inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg">
            <Rss className="size-3.5" aria-hidden /> RSS feed
          </a>
        </PageHeader>

        <div className="container-x py-20 max-md:py-14">
          <ol className="border-t border-line">
            {sortedWriteups.map((w, i) => (
              <li key={w.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    href={`/writeups/${w.slug}`}
                    className="group grid gap-3 border-b border-line py-8 transition-colors hover:bg-surface/60 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8 md:px-4"
                  >
                    <time dateTime={w.date} className="font-mono text-sm text-muted">
                      {formatDate(w.date)}
                    </time>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">{w.title}</h2>
                      <p className="mt-2 max-w-2xl leading-relaxed text-muted">{w.summary}</p>
                      <p className="mt-3 flex flex-wrap gap-2">
                        {w.tags.map((t) => (
                          <span key={t} className="border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                            {t}
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className="label inline-flex items-center gap-2 group-hover:text-fg">
                      {readMinutes(w)} min read
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>

          {medium.articles.length > 0 && (
            <section aria-labelledby="medium-title" className="mt-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="medium-title" className="text-3xl font-semibold tracking-tight">
                  Also on Medium<span className="text-accent">.</span>
                </h2>
                <ExternalLink href={medium.source} className="label min-h-11 text-fg hover:text-accent">
                  medium.com/@subadevanc
                </ExternalLink>
              </div>
              <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
                {medium.articles.map((a) => (
                  <li key={a.url} className="bg-bg">
                    <ExternalLink
                      href={a.url}
                      arrow={false}
                      className="group flex h-full flex-col items-start p-6 transition-colors hover:bg-surface"
                    >
                      <span className="font-mono text-xs text-muted">
                        {formatDate(a.date)} · {a.minutes} min read
                      </span>
                      <span className="mt-3 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                        {a.title}
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-muted">{a.summary}</span>
                      <span className="label mt-auto pt-5 text-fg">Read on Medium ↗</span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd([{ name: "Write-ups", path: "/writeups" }])) }}
      />
    </>
  );
}
