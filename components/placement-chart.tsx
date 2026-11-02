"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ChartEvent = {
  id: number;
  title: string;
  date: string;
  year: number;
  place: number;
  totalTeams: number;
  points: number;
};

const M = { top: 20, right: 20, bottom: 34, left: 52 };
const H = 300;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const topPct = (e: ChartEvent) => (e.place / e.totalTeams) * 100;
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

export function PlacementChart({ events, year }: { events: ChartEvent[]; year: number | "all" }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { x, y, ticks, minT, maxT } = useMemo(() => {
    const times = events.map((e) => Date.parse(e.date));
    const pad = 20 * 864e5;
    const minT = Math.min(...times) - pad;
    const maxT = Math.max(...times) + pad;
    const innerW = width - M.left - M.right;
    const innerH = H - M.top - M.bottom;
    const x = (iso: string) => M.left + ((Date.parse(iso) - minT) / (maxT - minT)) * innerW;
    const y = (pct: number) => M.top + (pct / 100) * innerH;
    const ticks: { t: number; label: string }[] = [];
    const start = new Date(minT);
    const every = width < 520 ? 6 : 3;
    for (let d = new Date(Date.UTC(start.getUTCFullYear(), Math.ceil((start.getUTCMonth() + 1) / every) * every, 1)); d.getTime() <= maxT; d.setUTCMonth(d.getUTCMonth() + every)) {
      ticks.push({ t: d.getTime(), label: `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}` });
    }
    return { x, y, ticks, minT, maxT };
  }, [events, width]);

  const visible = events.filter((e) => year === "all" || e.year === year);
  const best = visible.reduce<ChartEvent | null>((b, e) => (!b || topPct(e) < topPct(b) ? e : b), null);
  const hovered = events.find((e) => e.id === hover) ?? null;
  const innerW = width - M.left - M.right;

  return (
    <div ref={wrapRef} className="relative w-full min-w-0 overflow-hidden">
      <svg
        width={width}
        height={H}
        role="img"
        aria-label={`Placement in ${visible.length} CTFtime events${year === "all" ? "" : ` in ${year}`}. Best finish: ${
          best ? `#${best.place} of ${best.totalTeams} at ${best.title}` : "none"
        }. Full data in the table below.`}
        className="block overflow-visible"
      >
        {[0, 25, 50, 75, 100].map((p) => (
          <g key={p}>
            <line x1={M.left} x2={width - M.right} y1={y(p)} y2={y(p)} stroke="#262B33" strokeDasharray={p === 0 ? undefined : "2 4"} />
            <text x={M.left - 10} y={y(p)} dy="0.32em" textAnchor="end" className="fill-muted font-mono text-[11px]">
              {p === 0 ? "top" : `${p}%`}
            </text>
          </g>
        ))}
        {ticks.map((t) => {
          const tx = M.left + ((t.t - minT) / (maxT - minT)) * innerW;
          return (
            <text key={t.t} x={tx} y={H - 10} textAnchor="middle" className="fill-muted font-mono text-[11px]">
              {t.label}
            </text>
          );
        })}

        {events.map((e) => {
          const active = year === "all" || e.year === year;
          const cx = x(e.date);
          const cy = y(topPct(e));
          return (
            <g key={e.id}>
              <circle
                cx={cx}
                cy={cy}
                r={hover === e.id ? 7 : 5}
                fill={active ? "#FF4D2E" : "#3A414C"}
                stroke="#0B0D10"
                strokeWidth={2}
                style={{ transition: "r 150ms, fill 300ms" }}
              />
              {active && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={13}
                  fill="transparent"
                  onPointerEnter={() => setHover(e.id)}
                  onPointerLeave={() => setHover(null)}
                  className="cursor-crosshair"
                />
              )}
            </g>
          );
        })}

        {best && hover === null && (
          <text
            x={Math.min(x(best.date) + 12, width - M.right)}
            y={y(topPct(best)) - 10}
            textAnchor={x(best.date) > width - 220 ? "end" : "start"}
            className="fill-fg font-mono text-[11px]"
          >
            best · #{best.place}/{best.totalTeams}
            {width >= 520 && ` · ${best.title}`}
          </text>
        )}
      </svg>

      {hovered && (
        <div
          role="presentation"
          className="pointer-events-none absolute z-10 w-60 border border-line bg-bg/95 p-3 font-mono text-xs shadow-xl backdrop-blur"
          style={{
            left: Math.min(Math.max(x(hovered.date) - 120, 0), width - 240),
            top: y(topPct(hovered)) > H / 2 ? y(topPct(hovered)) - 118 : y(topPct(hovered)) + 16,
          }}
        >
          <p className="font-sans text-sm font-medium text-fg">{hovered.title}</p>
          <p className="mt-1 text-muted">{fmtDate(hovered.date)}</p>
          <p className="mt-2 text-fg">
            #{hovered.place} <span className="text-muted">of {hovered.totalTeams}</span> · top {topPct(hovered).toFixed(0)}%
          </p>
          <p className="text-muted">{hovered.points.toLocaleString("en-US")} pts</p>
        </div>
      )}
    </div>
  );
}
