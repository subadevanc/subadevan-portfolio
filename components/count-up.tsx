"use client";

import { useEffect, useState } from "react";

/** Rolls a stat like "08" or "10+" up from zero, keeping its padding and suffix. */
export function CountUp({ value, delay = 0, duration = 1200 }: { value: string; delay?: number; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[1]);
    const width = match[1].length;
    const suffix = match[2];
    let raf = 0;
    const start = performance.now() + delay;
    const frame = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(String(Math.round(target * eased)).padStart(width, "0") + suffix);
      if (p < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, duration]);

  return <span className="tabular-nums">{shown}</span>;
}
