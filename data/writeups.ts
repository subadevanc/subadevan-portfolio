import { PHOTOS, type Photo } from "./photos";

/** Content blocks are plain data rendered as React elements — no HTML strings, nothing to sanitize. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; text: string; label?: string }
  | { type: "list"; items: string[] }
  | { type: "photo"; photo: Photo };

export type Writeup = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date for sorting and RSS. */
  date: string;
  tags: string[];
  cover?: Photo;
  source?: { label: string; href: string };
  blocks: Block[];
};

// Adapted from Subadevan's own public LinkedIn posts and GitHub write-up. Private report details stay out.
export const writeups: Writeup[] = [
  {
    slug: "who-hall-of-fame-env",
    title: "WHO Hall of Fame: when recon finds /env",
    summary:
      "Plain subdomain enumeration and directory brute-forcing led to an exposed configuration endpoint on a World Health Organization admin portal.",
    date: "2026-06-07",
    tags: ["Recon", "Information disclosure", "Responsible disclosure"],
    blocks: [
      { type: "p", text: "This one didn't need anything fancy. It started with basic recon and a hunch." },
      { type: "h2", text: "Recon" },
      { type: "code", label: "subdomain enumeration", text: "subfinder -d who.int" },
      {
        type: "p",
        text: "I went through the discovered subdomains one by one. One admin-portal host caught my attention. No clever reason, just instinct that it was worth digging into.",
      },
      { type: "h2", text: "Enumeration" },
      {
        type: "p",
        text: "Most of the visible features weren't interesting, so I started `gobuster` in the background and kept exploring by hand. It helped that no WAF or CDN was getting in the way of enumeration.",
      },
      { type: "code", label: "the result that stood out", text: "/env    (Status: 200)" },
      {
        type: "p",
        text: "Not `.env` — just `env`. Luckily my wordlist contained that entry. The endpoint exposed database configuration details that should never have been public.",
      },
      { type: "h2", text: "Disclosure" },
      {
        type: "p",
        text: "I reported it to the WHO security team. They fixed the issue and listed me in the WHO Vulnerability Hall of Fame.",
      },
      { type: "h2", text: "Takeaways" },
      {
        type: "list",
        items: [
          "Go wide before going deep: enumerate every subdomain, then follow the one that looks out of place.",
          "Wordlists decide what you find. `env` without the dot was the hit here.",
          "Note what sits in front of a target. No WAF meant enumeration ran cleanly.",
          "Report quickly and keep the details private until the fix is in.",
        ],
      },
    ],
    source: {
      label: "WHO Vulnerability Hall of Fame",
      href: "https://www.who.int/about/cybersecurity/vulnerability-hall-of-fame/ethical-hacker-list",
    },
  },
  {
    slug: "unesco-three-emails",
    title: "UNESCO: three emails to a Hall of Fame",
    summary:
      "A browser extension flagged an exposed configuration file on a UNESCO resource. Verified, reported on 7 June, listed in the Hall of Fame.",
    date: "2026-06-26",
    tags: ["Configuration exposure", "Responsible disclosure"],
    cover: PHOTOS.unescoHof,
    blocks: [
      {
        type: "p",
        text: "After the WHO finding, which came from subdomain enumeration and directory fuzzing, this one was almost the opposite: a browser extension I run while browsing flagged that it had found something.",
      },
      { type: "h2", text: "Verify first" },
      {
        type: "p",
        text: "An automated alert is a lead, not a finding. I confirmed by hand that the configuration file really was publicly reachable before writing anything up.",
      },
      { type: "h2", text: "The disclosure" },
      {
        type: "list",
        items: [
          "7 June 2026: sent the report to UNESCO.",
          "They replied asking for my name and email for the acknowledgement.",
          "Listed in UNESCO's Hall of Fame for reporting a configuration file exposure.",
        ],
      },
      { type: "p", text: "Three emails from start to finish. A responsive triage team makes responsible disclosure easy." },
      { type: "photo", photo: PHOTOS.unescoHof },
      { type: "h2", text: "Takeaways" },
      {
        type: "list",
        items: [
          "Passive tooling that runs while you browse is worth keeping on.",
          "Always verify an automated hit before you report it.",
          "A short, clear report gets a short, clear response.",
        ],
      },
    ],
    source: { label: "UNESCO vulnerability disclosure", href: "https://www.unesco.org/en/vulnerability-disclosure" },
  },
  {
    slug: "dcg-coimbatore-ctf-2026",
    title: "DCG Coimbatore CTF 2026: 12th of 230+, solo, no LLMs",
    summary:
      "Playing solo under a no-LLM rule at DEF CON Group 91422, what the hard challenges exposed, and the full write-up of 21 challenges.",
    date: "2026-04-18",
    tags: ["CTF", "Write-up", "DEF CON Group"],
    cover: PHOTOS.dcg,
    blocks: [
      {
        type: "p",
        text: "DCG91422's CTF at Kumaraguru College of Technology had a no-LLM policy, and I think that was the right call. I played solo under the Flaggers United name and finished 12th among 230+ teams.",
      },
      { type: "h2", text: "What the hard challenges taught me" },
      {
        type: "p",
        text: "The easy and medium challenges were fun. The hard ones exposed my gaps: pwn and crypto need much stronger programming fundamentals when there's no AI to lean on. More gaps found than wins — which is exactly what I needed.",
      },
      { type: "h2", text: "The write-up" },
      {
        type: "p",
        text: "I documented every challenge I solved, 21 across 8 categories:",
      },
      {
        type: "list",
        items: [
          "Beginner (4): Hidden, Caesars Emporium, H3h3, Agent of Chaos",
          "Crypto (2): Enjoy your meal, Artifact",
          "Reverse engineering (4): BASIC, Ghost, kitty_cat, BabyDenuvo",
          "Forensics (4): DNS Tunnel, BetweenTheFrames, Memory Shadows, Deleted Evidence",
          "Web (2): Magical Gallery, Hidden Schema",
          "Misc (2): Romeo and Juliet, Git Necromancy",
          "OSINT (2): Training Wheels, Absolute Cine",
          "Pwn (1): babypwn",
        ],
      },
      { type: "photo", photo: PHOTOS.dcg },
      { type: "h2", text: "Day 2: the conference" },
      {
        type: "p",
        text: "The standout talk was on building n-days with multiple AI agents, a pipeline that fetches CVEs from NVD, reads the code, extracts routes, builds an exploit and validates it, with a feedback loop between the steps. Very practical.",
      },
    ],
    source: { label: "Full write-up on GitHub", href: "https://github.com/subadevanc/DCG-Coimbatore-CTF-writeup" },
  },
];

export const sortedWriteups = [...writeups].sort((a, b) => b.date.localeCompare(a.date));

export function readMinutes(w: Writeup) {
  const words = w.blocks.reduce((n, b) => {
    if (b.type === "list") return n + b.items.join(" ").split(/\s+/).length;
    if (b.type === "photo") return n;
    return n + b.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
