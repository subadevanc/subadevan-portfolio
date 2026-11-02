"use client";

import { useEffect, useRef, type ReactNode } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&@*+=/<>";
const DURATION = 1100;

/**
 * Scrambles the text inside once it scrolls into view, then resolves it left to right —
 * like a terminal cracking a cipher. Server-rendered text stays readable without JS.
 */
export function Decrypt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: { node: Text; text: string }[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (node.data.trim()) nodes.push({ node, text: node.data });
      }
      const total = nodes.reduce((n, x) => n + x.text.length, 0);
      const begin = performance.now();
      let last = 0;
      const frame = (now: number) => {
        const p = Math.min(1, (now - begin) / DURATION);
        if (now - last > 45 || p === 1) {
          last = now;
          let offset = 0;
          for (const { node, text } of nodes) {
            let out = "";
            for (let i = 0; i < text.length; i++) {
              const ch = text[i];
              const settle = (offset + i) / total;
              out += ch === " " || p >= settle * 0.75 + 0.25 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            node.data = out;
            offset += text.length;
          }
        }
        if (p < 1) raf = requestAnimationFrame(frame);
        else for (const { node, text } of nodes) node.data = text;
      };
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
