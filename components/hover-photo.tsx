"use client";

import { useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Photo } from "@/data/photos";

const W = 272; // preview width in px
const H = 230; // approx. height incl. caption

/**
 * With a mouse, hovering the row shows its photo beside the list (never on top of the row).
 * Rendered in a portal on <body> so transformed ancestors can't offset the fixed position.
 */
export function HoverPhoto({ photo, children }: { photo?: Photo; children: ReactNode }) {
  const [show, setShow] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const place = () => {
    const el = floatRef.current;
    const row = rowRef.current?.getBoundingClientRect();
    if (!el || !row) return;
    const gap = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x: number;
    let y = pointer.current.y - H / 2;
    if (row.left - W - gap >= 12) {
      x = row.left - W - gap; // empty space left of the list
    } else if (row.right + gap + W <= vw - 12) {
      x = row.right + gap; // or right of it
    } else {
      // Narrow window: sit above the row, centred on the cursor.
      x = Math.min(Math.max(12, pointer.current.x - W / 2), vw - W - 12);
      y = row.top - H - 16;
    }
    y = Math.min(Math.max(y, 72), vh - H - 12);
    el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  // Position synchronously as soon as the preview mounts, before the browser paints it.
  useLayoutEffect(() => {
    if (show) place();
  });

  if (!photo) return <>{children}</>;

  const track = (e: PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      ref={rowRef}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        track(e);
        setShow(true);
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        track(e);
        if (show) place();
        else setShow(true);
      }}
      onPointerLeave={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div ref={floatRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-50" style={{ width: W }}>
            <div className="border border-line bg-bg p-1.5 shadow-2xl shadow-black/70">
              <Image src={photo.src} alt="" width={photo.width} height={photo.height} sizes={`${W}px`} className="aspect-[4/3] w-full object-cover" />
              <p className="truncate px-1 pt-1.5 font-mono text-[10px] text-muted">{photo.alt}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
