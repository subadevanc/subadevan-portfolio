import { profile } from "@/data/profile";
import { sortedWriteups } from "@/data/writeups";
import { SITE_URL } from "@/lib/site";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const items = sortedWriteups
    .map(
      (w) => `    <item>
      <title>${escape(w.title)}</title>
      <link>${SITE_URL}/writeups/${w.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writeups/${w.slug}</guid>
      <pubDate>${new Date(`${w.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(w.summary)}</description>
${w.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)} — Write-ups</title>
    <link>${SITE_URL}/writeups</link>
    <atom:link href="${SITE_URL}/writeups/rss.xml" rel="self" type="application/rss+xml" />
    <description>CTF and responsible-disclosure write-ups by ${escape(profile.name)}.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
