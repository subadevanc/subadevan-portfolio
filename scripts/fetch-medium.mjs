// Snapshot Subadevan's Medium articles from the public RSS feed.
// Run: npm run data:medium  — writes data/medium.json
import { writeFile } from "node:fs/promises";

const FEED = "https://medium.com/feed/@subadevanc";
const res = await fetch(FEED, { headers: { "User-Agent": "subadevan-portfolio-snapshot (+https://subadevan.tech)" } });
if (!res.ok) throw new Error(`${FEED} -> HTTP ${res.status}`);
const xml = await res.text();

const strip = (s = "") => s.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ");
const tag = (item, name) => strip(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]);

const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const url = tag(item, "link").split("?")[0];
  if (!url.startsWith("https://medium.com/")) throw new Error(`Unexpected article URL: ${url}`);
  const text = decode(tag(item, "content:encoded").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  const words = text.split(" ");
  return {
    title: decode(tag(item, "title")),
    url,
    date: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
    tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(([, c]) => strip(c)).slice(0, 4),
    summary: words.slice(0, 32).join(" ") + (words.length > 32 ? "…" : ""),
    minutes: Math.max(1, Math.round(words.length / 200)),
  };
});

await writeFile(
  "data/medium.json",
  JSON.stringify({ source: "https://medium.com/@subadevanc", fetchedAt: new Date().toISOString(), articles }, null, 2) + "\n",
);
console.log(`Saved ${articles.length} Medium articles to data/medium.json`);
