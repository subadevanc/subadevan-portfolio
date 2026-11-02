// Snapshot Flaggers United data from the official CTFtime API (https://ctftime.org/api/).
// Run: npm run data:ctftime  — writes data/ctftime.json and public/ctftime/team-logo.png
import { writeFile, mkdir } from "node:fs/promises";

const TEAM_ID = 356365;
const FIRST_YEAR = 2024; // team founded April 2024
const API = "https://ctftime.org/api/v1";
const HEADERS = { "User-Agent": "subadevan-portfolio-snapshot (+https://github.com/subadevanc)" };

async function getJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

const team = await getJson(`${API}/teams/${TEAM_ID}/`);

// Only years with rating points are real rated seasons; CTFtime returns placeholder country places for other years.
const rating = Object.entries(team.rating ?? {})
  .filter(([, r]) => typeof r.rating_points === "number")
  .map(([year, r]) => ({
    year: Number(year),
    ratingPlace: r.rating_place ?? null,
    countryPlace: r.country_place ?? null,
    points: Math.round(r.rating_points * 100) / 100,
  }))
  .sort((a, b) => a.year - b.year);

const events = [];
const thisYear = new Date().getUTCFullYear();
for (let year = FIRST_YEAR; year <= thisYear; year++) {
  const results = await getJson(`${API}/results/${year}/`);
  for (const [eventId, ev] of Object.entries(results)) {
    const scores = ev.scores ?? [];
    const mine = scores.find((s) => s.team_id === TEAM_ID);
    if (!mine) continue;
    events.push({
      id: Number(eventId),
      title: String(ev.title),
      year,
      date: new Date(Number(ev.time) * 1000).toISOString().slice(0, 10),
      place: Number(mine.place),
      totalTeams: scores.length,
      points: Number(mine.points),
      url: `https://ctftime.org/event/${Number(eventId)}`,
    });
  }
}
events.sort((a, b) => b.date.localeCompare(a.date));

if (team.logo) {
  const res = await fetch(team.logo.replace("//media", "/media"), { headers: HEADERS });
  if (res.ok) {
    await mkdir("public/ctftime", { recursive: true });
    await writeFile("public/ctftime/team-logo.png", Buffer.from(await res.arrayBuffer()));
  }
}

const snapshot = {
  source: `https://ctftime.org/team/${TEAM_ID}`,
  fetchedAt: new Date().toISOString(),
  team: {
    id: TEAM_ID,
    name: team.name,
    country: team.country,
    university: team.university,
    academic: Boolean(team.academic),
    aliases: team.aliases ?? [],
  },
  rating,
  events,
};

await writeFile("data/ctftime.json", JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Saved ${events.length} events, ${rating.length} rated season(s) to data/ctftime.json`);
