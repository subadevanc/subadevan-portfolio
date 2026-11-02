"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowDown, FileDown } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { LocalClock } from "./local-clock";
import { ExternalLink } from "./ui";

export type HeroStat = { value: string; label: string; detail: string };

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const HERO_LINKS = ["GitHub", "LinkedIn", "X", "HackerOne"];

function Portrait() {
  return (
    <figure className="group corner-frame relative border border-line bg-surface p-3">
      <div className="flex items-center justify-between px-1 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>Subject · SC-2027</span>
        <span className="flex items-center gap-2 text-fg">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
          Online
        </span>
      </div>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          unoptimized
          className="object-cover grayscale-[20%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-xs">
          <span className="text-fg">{profile.name}</span>
          <span className="text-muted">@{profile.handle}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Hero({ stats }: { stats: HeroStat[] }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    ref.current.style.setProperty("--spot", "1");
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => ref.current?.style.setProperty("--spot", "0")}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg" />
        <div className="grid-spot" />
      </div>

      <div className="container-x grid flex-1 items-center gap-12 py-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="fade-up flex items-center gap-4" style={delay(100)}>
            <Image
              src={profile.photo}
              alt=""
              width={56}
              height={56}
              priority
              unoptimized
              className="size-14 border border-line object-cover lg:hidden"
            />
            <div className="label flex flex-wrap items-center gap-x-6 gap-y-1.5">
              <span className="flex items-center gap-2.5 text-fg">
                <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
                Status: researching
              </span>
              <span>Chennai, IN</span>
              <LocalClock timeZone={profile.timeZone} suffix="IST" />
            </div>
          </div>

          <h1
            id="hero-title"
            className="mt-8 font-display text-[clamp(3.4rem,10vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.055em] lg:whitespace-nowrap lg:text-[clamp(5rem,7.6vw,8.75rem)]"
          >
            <span className="block overflow-hidden pb-[0.08em] lg:mr-[0.22em] lg:inline-block">
              <span className="rise" style={delay(220)}>
                Subadevan
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] lg:inline-block">
              <span className="rise" style={delay(340)}>
                C<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <p className="fade-up mt-6 font-mono text-sm text-muted sm:text-base" style={delay(520)}>
            <span className="text-fg">{profile.title}</span>
            <span className="mx-3 text-accent" aria-hidden>
              /
            </span>
            <span className="sr-only">, </span>
            {profile.focus}
          </p>

          <p
            className="fade-up mt-8 max-w-3xl border-l-2 border-accent pl-5 font-display text-[clamp(1.5rem,2.8vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em]"
            style={delay(680)}
          >
            Breaking <span className="strike">assumptions</span>.
            <br />
            <span className="text-muted">Securing systems.</span>
          </p>

          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(820)}>
            {profile.intro}
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-x-8 gap-y-6" style={delay(940)}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#research"
                className="group inline-flex h-12 items-center gap-3 bg-accent px-6 font-mono text-sm font-semibold text-bg transition-colors hover:bg-fg active:scale-[0.98]"
              >
                Explore my work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a
                href={profile.resumePath}
                download
                className="group inline-flex h-12 items-center gap-3 border border-line px-6 font-mono text-sm transition-colors hover:border-fg active:scale-[0.98]"
              >
                Download résumé
                <FileDown className="size-4 text-muted transition-colors group-hover:text-fg" aria-hidden />
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Profiles">
              {socials
                .filter((s) => HERO_LINKS.includes(s.label))
                .map((s) => (
                  <li key={s.label}>
                    <ExternalLink href={s.href} className="label min-h-11 transition-colors hover:text-fg">
                      {s.label}
                    </ExternalLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="fade-up hidden lg:col-span-4 lg:block" style={delay(500)}>
          <Portrait />
        </div>
      </div>

      <div className="container-x pb-6">
        <dl className="fade-up grid grid-cols-2 border-t border-line md:grid-cols-4" style={delay(1100)}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 py-5 pr-4 ${i % 2 === 1 ? "border-l border-line pl-4 md:pl-6" : ""} ${
                i >= 1 ? "md:border-l md:border-line md:pl-6" : ""
              } ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
            >
              <dt className="label text-[11px]">{s.label}</dt>
              <dd className="order-first font-display text-4xl font-medium tracking-tight md:text-5xl">{s.value}</dd>
              <dd className="font-mono text-xs text-muted">{s.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
