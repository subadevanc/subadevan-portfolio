"use client";

import { motion } from "motion/react";
import { PIPELINE } from "@/data/research";

export function Pipeline({ stage }: { stage: number }) {
  return (
    <div>
      <p className="label text-[11px] sm:hidden">
        Stage {stage + 1}/{PIPELINE.length} · <span className="text-fg">{PIPELINE[stage]}</span>
      </p>
      <ol
        className="mt-2 grid grid-cols-5 gap-1.5 sm:mt-0"
        aria-label={`Disclosure progress: ${PIPELINE.slice(0, stage + 1).join(", ")} confirmed`}
      >
        {PIPELINE.map((step, i) => {
          const done = i <= stage;
          return (
            <li key={step} className="min-w-0">
              <div className="relative h-1 overflow-hidden bg-line">
                {done && (
                  <motion.span
                    className="absolute inset-0 origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
              <p
                className={`mt-2 hidden truncate font-mono text-[11px] uppercase tracking-wider sm:block ${
                  done ? "text-fg" : "text-muted"
                }`}
              >
                <span className={done ? "text-accent" : ""}>{String(i + 1).padStart(2, "0")}</span> {step}
              </p>
              {!done && <p className="mt-0.5 hidden font-mono text-[10px] text-muted sm:block">not public</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
