import { ImageResponse } from "next/og";
import { formatDate, writeups } from "@/data/writeups";

export const alt = "Write-up by Subadevan C";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = writeups.find((x) => x.slug === slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B0D10",
          color: "#ECEEF1",
          backgroundImage:
            "linear-gradient(to right, #1a1e24 1px, transparent 1px), linear-gradient(to bottom, #1a1e24 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#3DDCC4" }}>~/writeups</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
          {w?.title ?? "Write-up"}
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 26, color: "#8A93A0" }}>
          <span style={{ color: "#ECEEF1" }}>Subadevan C</span>
          <span>{w ? formatDate(w.date) : ""}</span>
          <span style={{ color: "#FF4D2E" }}>subadevan.tech</span>
        </div>
      </div>
    ),
    size,
  );
}
