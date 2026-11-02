"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Covers its text with redaction bars that sweep away when it scrolls into view.
 * Bars are only added once JS is running, so the text is never hidden without it.
 */
export function RedactReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "revealed">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // Let the card finish fading in first, so the sweep is actually visible.
          timer = window.setTimeout(() => setState("revealed"), 700 + Math.random() * 350);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const raf = requestAnimationFrame(() => {
      setState("armed");
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={state === "idle" ? undefined : `redact-reveal ${state === "revealed" ? "is-revealed" : ""}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
