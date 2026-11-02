import { PHOTOS, type Photo } from "./photos";

export type Competition = {
  event: string;
  host?: string;
  result: string;
  /** Numeric placement used for ordering; top 3 counts as a win. */
  place: number;
  kind?: string;
  /** Display date, only when verified (résumé, certificate or LinkedIn post). */
  date?: string;
  /** "Solo" or "Team · Flaggers United" — only when confirmed. */
  entry?: string;
  prize?: string;
  story?: string;
  photos?: Photo[];
  link?: { label: string; href: string };
};

// Sources: résumé, LinkedIn certificates, and LinkedIn posts from Apr 2025 to Sep 2026.
// TODO: confirm whether "Boot2Root (VIT)" is the TechnoVIT Bug Bounty (1st, solo) mentioned on LinkedIn.
export const competitions: Competition[] = [
  {
    event: "ISACA Trivandrum Chapter CTF 2026",
    host: "ISACA Trivandrum Chapter · Secure AI Summit",
    result: "1st",
    place: 1,
    kind: "CTF",
    date: "Sep 2026",
    entry: "Team · Flaggers United",
    prize: "₹25,000 cash prize",
    story:
      "Travelled from Chennai to Trivandrum and took first prize. The award was presented by the Collector of Thiruvananthapuram at the Secure AI Summit.",
    photos: [PHOTOS.isacaStage, PHOTOS.isacaHandover, PHOTOS.isacaTrophy],
  },
  {
    event: "TEXUS'25 Bug Bounty Hunt",
    host: "SRM IST Chennai (SRM-RMP)",
    result: "1st",
    place: 1,
    kind: "Bug bounty",
    date: "Mar 2025",
  },
  { event: "Boot2Root", host: "VIT", result: "1st", place: 1, kind: "Boot2Root" },
  {
    event: "Hack With Jolu 2026",
    host: "Z3R0_L0G0N × Jalpaiguri Government Engineering College",
    result: "1st",
    place: 1,
    kind: "24-hour online CTF",
    date: "2026",
    entry: "Team · Flaggers United",
  },
  {
    event: "CyberHaunt CTF",
    host: "Sairam Institutions",
    result: "1st",
    place: 1,
    kind: "CTF",
    date: "Nov 2025",
    entry: "Team · Son of Thanjai (Flaggers United)",
    story: "Teams from our college swept the podium: 1st, 2nd and 3rd all went to JCE, with Flaggers United juniors in second.",
    photos: [PHOTOS.cyberhaunt, PHOTOS.cyberhauntAward, PHOTOS.cyberhauntBoard],
  },
  { event: "JCE CTF", host: "Jerusalem College of Engineering", result: "1st", place: 1, kind: "CTF" },

  {
    event: "CipherCase 24-hour CTF",
    host: "CYSCOM, VIT Chennai (TechnoVIT)",
    result: "2nd",
    place: 2,
    kind: "24-hour CTF",
    date: "2026",
    entry: "Team · Flaggers United",
    prize: "₹7,000 + $100 exam voucher",
    story: "Twenty-four hours in the MG Auditorium at VIT Chennai.",
    photos: [PHOTOS.ciphercase],
  },
  {
    event: "KingSlayers CTF",
    host: "OWASP Sairam Institutions Chapter",
    result: "2nd",
    place: 2,
    kind: "CTF",
    date: "16 Apr 2026",
    entry: "Team · Flaggers United",
    story: "A tight finish, decided by a last-minute push from the team in first.",
    photos: [PHOTOS.kingslayersPrize, PHOTOS.kingslayersCerts],
  },
  {
    event: "Network Security CTF",
    host: "DCSE, CEG Anna University × IIT Roorkee (ISEA)",
    result: "2nd",
    place: 2,
    kind: "CTF",
    date: "22 Dec 2025",
    prize: "₹5,000",
    story: "A hands-on network security CTF run under the national Information Security Education & Awareness project.",
    photos: [PHOTOS.netsecCert, PHOTOS.netsecCheque],
  },
  {
    event: "TEXUS'26 CTF",
    host: "SRM IST Chennai (SRM-RMP)",
    result: "2nd",
    place: 2,
    kind: "Red-team CTF",
    date: "Feb 2026",
    entry: "Team · Flaggers United",
    story:
      "No file tricks or steghide: pure red-teaming. Recon with Nmap, Gobuster and Subfinder, then SQL injection, XSS, file-upload bypass, command injection, IDOR, LFI and header manipulation against live targets.",
  },
  {
    event: "TEXUS'26 Bug Bounty",
    host: "SRM IST Chennai (SRM-RMP)",
    result: "2nd",
    place: 2,
    kind: "Bug bounty",
    date: "Feb 2026",
    entry: "Team · Flaggers United",
  },
  {
    event: "RAGNAROK QUEST CTF · ZYVERSE 2K25",
    host: "SRM Valliammai Engineering College (Whitehatians)",
    result: "2nd",
    place: 2,
    kind: "CTF",
    date: "13 Sep 2025",
    entry: "Team · Flaggers United",
    story: "Won partly on foot: teammates sprinted across the admin block to capture physical flags when it mattered.",
    photos: [PHOTOS.zyverse, PHOTOS.zyverseCert],
  },
  {
    event: "ARCADIA 4th State-Level CTF",
    host: "SRM Valliammai Engineering College (Whitehatians)",
    result: "2nd",
    place: 2,
    kind: "CTF",
    date: "8 Aug 2025",
    entry: "Team · Flaggers United",
    story: "Started in 1st, slid to 5th, then captured a key flag in the final minutes to climb back to 2nd.",
    photos: [PHOTOS.arcadiaStage, PHOTOS.arcadiaCert],
  },
  { event: "WTF 3.0 CTF", host: "SRM Valliammai Engineering College", result: "2nd", place: 2, kind: "CTF" },
  { event: "Bastion Boot2Root", host: "Chat-Club", result: "2nd", place: 2, kind: "Boot2Root" },

  { event: "Multiverse Breach CTF", host: "LICET", result: "3rd", place: 3, kind: "CTF" },
  {
    event: "CipherStrike 24-hour CTF",
    host: "CYSCOM, VIT Chennai",
    result: "3rd",
    place: 3,
    kind: "24-hour CTF",
    date: "Dec 2025",
    story: "32 challenges solved for 6,649 points.",
  },
  { event: "CIT CTF", host: "Chennai Institute of Technology", result: "3rd", place: 3, kind: "CTF", date: "Early 2025", entry: "Solo" },
  { event: "NPSB CTF", result: "3rd", place: 3, kind: "CTF", date: "Early 2025" },
  {
    event: "Loyola College CTF",
    host: "Loyola College, Chennai",
    result: "3rd",
    place: 3,
    kind: "CTF",
    date: "2026",
    entry: "Team · Flaggers United",
  },
  { event: "Cybershield Hackathon", host: "Amrita Vishwa Vidyapeetham", result: "Top 3", place: 3, kind: "Hackathon" },

  {
    event: "DEF CON Chennai CTF",
    host: "DEF CON Chennai × TamilCTF, at Zoho",
    result: "#12",
    place: 12,
    kind: "CTF",
    date: "Apr 2026",
    entry: "Team · Flaggers United",
    story: "Twelve challenges solved over the two-day DEF CON Chennai meet-up.",
    photos: [PHOTOS.defconChennai, PHOTOS.defconBoard],
  },
  {
    event: "DCG Coimbatore CTF 2026",
    host: "DEF CON Group 91422, Kumaraguru College of Technology",
    result: "12th",
    place: 12,
    kind: "CTF · no-LLM rules",
    date: "Apr 2026",
    entry: "Solo · as Flaggers United",
    story: "Played solo among 230+ teams under a no-LLM policy, then published a full write-up.",
    photos: [PHOTOS.dcg, PHOTOS.dcgBoard],
    link: { label: "Write-up", href: "https://github.com/subadevanc/DCG-Coimbatore-CTF-writeup" },
  },
  {
    event: "Kaalchakra 2026 CTF Finals",
    host: "National Forensic Sciences University, Goa",
    result: "Top 15",
    place: 15,
    kind: "National CTF · onsite finals",
    date: "Apr 2026",
    entry: "Team · Flaggers United",
    story: "Cleared the prelims on 28 March 2026 and travelled to Goa for the onsite national finals.",
    photos: [PHOTOS.kaalchakra],
  },
  {
    event: "HackathonX Semi-Finals",
    host: "NCSRC",
    result: "5th",
    place: 5,
    kind: "Hackathon · CTF + bug bounty",
    date: "Jul 2025",
    entry: "Team · Flaggers United",
    story: "Topped the qualifier CTF, then reported 13 bugs in the semi-final bug bounty with 9 approved, and finished 5th overall.",
    photos: [PHOTOS.hackathonx],
  },
  { event: "SRM CTF", host: "SRM", result: "5th", place: 5, kind: "CTF", date: "Early 2025" },
  { event: "Pathom CTF", host: "Saveetha Engineering College", result: "5th", place: 5, kind: "Hybrid CTF", date: "Nov 2025", entry: "Team · Son of Thanjai" },
  { event: "Stegbreakers CTF", result: "5th", place: 5, kind: "CTF", date: "Nov 2025" },
  { event: "Final Trace CTF", host: "VIT", result: "6th", place: 6, kind: "CTF", date: "Nov 2025", entry: "Team · Flaggers United" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateKey = (d?: string) => {
  if (!d) return 0;
  const year = Number(d.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.findIndex((m) => d.includes(m)) + 1;
  return year * 100 + month;
};

export const isWin = (c: Competition) => c.place <= 3;
export const wins = competitions.filter(isWin);

/** Best placement first; newest first within the same placement. */
export const rankedCompetitions = [...competitions].sort((a, b) => a.place - b.place || dateKey(b.date) - dateKey(a.date));
