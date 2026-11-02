import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { certGroups } from "@/data/certifications";
import { Footer } from "@/components/footer";
import { PageHeader, SubHeading } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications and competition certificates of Subadevan C: CCEP, TryHackMe Jr Penetration Tester, Google, Cisco, NPTEL and more.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <>
      <main id="main">
        <PageHeader
          path="certifications"
          title={
            <>
              Certifications<span className="text-accent">.</span>
            </>
          }
          intro="The formal learning behind the hands-on work, newest first. Credential IDs are included where the issuer provides one."
        />
        <div className="container-x space-y-24 py-24">
          {certGroups.map((g, gi) => (
            <section key={g.id} aria-labelledby={`${g.id}-title`} className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SubHeading id={g.id} index={String(gi + 1).padStart(2, "0")} title={g.title} />
                  <p className="label mt-4">{g.items.length} entries</p>
                </div>
              </div>
              <Reveal className="lg:col-span-8">
                <ol className="border-t border-line">
                  {g.items.map((c) => (
                    <li key={c.name} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline sm:gap-6">
                      <span className="font-mono text-sm text-muted">{c.date}</span>
                      <span>
                        <span className="block text-lg">{c.name}</span>
                        <span className="text-sm text-muted">{c.issuer}</span>
                      </span>
                      <span className="font-mono text-xs text-muted sm:text-right">
                        {c.note && <span className="block text-accent">{c.note}</span>}
                        {c.credentialId && <span className="block">ID {c.credentialId}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          ))}
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd([{ name: "Certifications", path: "/certifications" }])) }}
      />
    </>
  );
}
