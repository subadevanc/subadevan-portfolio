import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, readMinutes, sortedWriteups, writeups } from "@/data/writeups";
import { profile } from "@/data/profile";
import { breadcrumbJsonLd, jsonLdString, PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { Footer } from "@/components/footer";
import { ExternalLink } from "@/components/ui";
import { WriteupBody } from "@/components/writeup-body";

export function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writeups/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = writeups.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.title,
    description: w.summary,
    alternates: { canonical: `/writeups/${w.slug}` },
    keywords: [...w.tags, "Subadevan C", "write-up"],
    authors: [{ name: profile.name, url: SITE_URL }],
    openGraph: { type: "article", title: w.title, description: w.summary, publishedTime: w.date, authors: [profile.name], tags: w.tags },
  };
}

export default async function WriteupPage({ params }: PageProps<"/writeups/[slug]">) {
  const { slug } = await params;
  const w = writeups.find((x) => x.slug === slug);
  if (!w) notFound();

  const index = sortedWriteups.findIndex((x) => x.slug === w.slug);
  const next = sortedWriteups[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/writeups/${w.slug}#article`,
    mainEntityOfPage: `${SITE_URL}/writeups/${w.slug}`,
    image: `${SITE_URL}/writeups/${w.slug}/opengraph-image`,
    dateModified: w.date,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    headline: w.title,
    description: w.summary,
    datePublished: w.date,
    author: { "@type": "Person", "@id": PERSON_ID, name: profile.name, url: SITE_URL },
    publisher: { "@id": PERSON_ID },
    url: `${SITE_URL}/writeups/${w.slug}`,
    keywords: w.tags.join(", "),
  };

  return (
    <>
      <main id="main" className="pt-16">
        <article className="container-x max-w-4xl py-16 max-md:py-10">
          <Link href="/writeups" className="label inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg">
            <ArrowLeft className="size-3.5" aria-hidden /> All write-ups
          </Link>
          <header className="mt-8 border-b border-line pb-10">
            <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
              <time dateTime={w.date}>{formatDate(w.date)}</time>
              <span>{readMinutes(w)} min read</span>
              <span>{w.tags.join(" · ")}</span>
            </p>
            <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em]">{w.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{w.summary}</p>
          </header>

          <div className="mt-10">
            <WriteupBody blocks={w.blocks} />
          </div>

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            {w.source ? (
              <ExternalLink href={w.source.href} className="label min-h-11 text-fg hover:text-accent">
                {w.source.label}
              </ExternalLink>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/writeups/${next.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-right">
                <span>
                  <span className="label block text-[10px]">Next write-up</span>
                  <span className="text-fg group-hover:text-accent">{next.title}</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            )}
          </footer>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: "Write-ups", path: "/writeups" },
              { name: w.title, path: `/writeups/${w.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
