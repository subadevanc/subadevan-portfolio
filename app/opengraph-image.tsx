import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { wins } from "@/data/competitions";

export const alt = "Subadevan C — Offensive Security Researcher, Web & API Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = `data:image/jpeg;base64,${await readFile(join(process.cwd(), "public/profile/subadevan.jpg"), "base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 72,
          background: "#0B0D10",
          color: "#ECEEF1",
          backgroundImage:
            "linear-gradient(to right, #1a1e24 1px, transparent 1px), linear-gradient(to bottom, #1a1e24 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#8A93A0", letterSpacing: 4 }}>OFFENSIVE SECURITY RESEARCHER</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -4, marginTop: 24, whiteSpace: "nowrap" }}>
            <span>Subadevan C</span>
            <span style={{ color: "#FF4D2E" }}>.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 36, color: "#8A93A0", marginTop: 28, lineHeight: 1.2 }}>
            <span>Breaking assumptions.</span>
            <span>Securing systems.</span>
          </div>
          <div style={{ display: "flex", gap: 36, fontSize: 24, color: "#8A93A0", marginTop: 48 }}>
            <span style={{ color: "#FF4D2E" }}>{wins.length} competition wins</span>
            <span>Flaggers United</span>
            <span>@subadevanc</span>
          </div>
        </div>
        <img src={photo} width={300} height={300} style={{ border: "2px solid #262B33", objectFit: "cover" }} alt="" />
      </div>
    ),
    size,
  );
}
