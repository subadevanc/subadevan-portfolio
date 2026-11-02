"use client";

import { useEffect, useRef } from "react";

const STAGES = ["Discovery", "Validation", "Reporting", "Triage", "Resolution"];

/** Thin page-progress bar split into the five disclosure stages. */
export function ScrollPipeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ref.current?.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 grid h-1 grid-cols-5 gap-1">
      {STAGES.map((stage, i) => (
        <span key={stage} className="relative overflow-hidden bg-line" title={stage}>
          <span
            className="absolute inset-0 origin-left bg-accent shadow-[0_0_10px_rgba(255,77,46,0.8)]"
            style={{ transform: `scaleX(clamp(0, calc(var(--p, 0) * 5 - ${i}), 1))` }}
          />
        </span>
      ))}
    </div>
  );
}
