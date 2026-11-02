"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { sectionIndex } from "@/lib/site";
import { Decrypt } from "./decrypt";
import { Reveal } from "./reveal";
import { ExternalLink } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2400);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg opacity-70" />
      </div>
      <div className="container-x py-28 max-md:py-20 md:py-40">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="text-accent">§{sectionIndex("contact")}</span>
            <span className="h-px w-10 bg-line" aria-hidden />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 max-w-6xl text-[clamp(2.75rem,8.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
          >
            <Decrypt>
              Have something interesting to secure<span className="text-accent">?</span>
            </Decrypt>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I&rsquo;m open to security research collaborations, VAPT work and conversations about offensive security roles.
            Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="link-draw break-all font-display text-[clamp(1.5rem,4.5vw,3.5rem)] font-medium tracking-[-0.03em] hover:text-accent"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
            >
              {copied === "ok" ? <Check className="size-4 text-accent" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              {copied === "ok" ? "Copied" : "Copy"}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied === "ok" ? "Email address copied" : copied === "fail" ? "Copy failed" : ""}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {[...socials, { label: "Résumé", handle: "PDF · 1 page", href: profile.resumePath }].map((s) => (
              <li key={s.label} className="border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                {s.label === "Résumé" ? (
                  <a href={s.href} download className="group flex min-h-20 items-center justify-between gap-4 px-1 py-5 transition-colors hover:bg-surface sm:px-5">
                    <span>
                      <span className="block text-lg">{s.label}</span>
                      <span className="font-mono text-xs text-muted">{s.handle}</span>
                    </span>
                    <span className="label group-hover:text-accent">Download</span>
                  </a>
                ) : (
                  <ExternalLink
                    href={s.href}
                    className="flex min-h-20 w-full justify-between gap-4 px-1 py-5 transition-colors hover:bg-surface hover:text-accent sm:px-5"
                  >
                    <span className="mr-auto">
                      <span className="block text-lg text-fg">{s.label}</span>
                      <span className="font-mono text-xs text-muted">{s.handle}</span>
                    </span>
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
