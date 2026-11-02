"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Plus } from "lucide-react";
import { milestones, TIMELINE_FILTERS, type TimelineCategory } from "@/data/timeline";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  research: "Research",
  competition: "Competition",
  project: "Project",
  leadership: "Leadership",
  education: "Education",
};

export function Timeline() {
  const [filter, setFilter] = useState<TimelineCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const items = [...milestones]
    .sort((a, b) => a.sort.localeCompare(b.sort))
    .filter((m) => filter === "all" || m.category === filter);

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="container-x py-28 max-md:py-20 md:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="timeline"
              kicker="Research & competition timeline"
              title={
                <>
                  The path
                  <br />
                  so far<span className="text-accent">.</span>
                </>
              }
              intro="Verified milestones only. Select one to read the story behind it."
            />
            <Reveal delay={0.1}>
              <div role="group" aria-label="Filter timeline" className="mt-10 flex flex-wrap gap-2">
                {TIMELINE_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={`label min-h-11 border px-3 transition-colors ${
                      filter === f.id ? "border-fg text-fg" : "border-line hover:text-fg"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
        <ol id="timeline-list" className="lg:pt-4">
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((m, idx) => {
              const key = `${m.sort}-${m.title}`;
              const isOpen = open === key;
              return (
                <motion.li
                  key={key}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-[1fr] sm:grid-cols-[8rem_1fr] ${!showAll && idx >= 10 ? "max-md:hidden" : ""}`}
                >
                  <p className="label pt-6 sm:pr-6 sm:text-right">{m.when}</p>
                  <div className="tl-step relative border-l border-line pb-1 pl-7">
                    <span
                      aria-hidden
                      className={`absolute -left-[5px] top-[1.9rem] size-[9px] rounded-full border transition-colors ${
                        isOpen ? "border-accent bg-accent" : "border-muted bg-bg"
                      }`}
                    />
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`ms-${key}`}
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span>
                          <span className="label block text-[10px]">{CATEGORY_LABEL[m.category]}</span>
                          <span className="mt-1.5 block text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                            {m.title}
                          </span>
                        </span>
                        <Plus
                          className={`mt-6 size-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`ms-${key}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 leading-relaxed text-muted">{m.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
        {items.length > 10 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="timeline-list"
            className="label mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line text-fg md:hidden"
          >
            {showAll ? "Show fewer" : `Show all ${items.length} milestones`}
            <ChevronDown className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden />
          </button>
        )}
        </div>
      </div>
    </section>
  );
}
