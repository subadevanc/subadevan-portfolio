export type TimelineCategory = "research" | "competition" | "project" | "leadership" | "education";

export const TIMELINE_FILTERS: { id: TimelineCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "competition", label: "Competitions" },
  { id: "project", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
];

export type Milestone = {
  /** Sortable, e.g. "2025-06-12". Use only verified dates. */
  sort: string;
  when: string;
  category: TimelineCategory;
  title: string;
  detail: string;
};

// Sources: résumé and LinkedIn (experience, certificates, post dates).
// TODO: still undated — ZKTeco and JPMorgan Chase disclosures, Hack With Jolu, ARES, RAQMAS, Ransom Shield.
export const milestones: Milestone[] = [
  {
    sort: "2019-10",
    when: "Oct 2019",
    category: "leadership",
    title: "Co-founded MTS Community",
    detail: "Started a computer science community back in school.",
  },
  {
    sort: "2023-11",
    when: "Nov 2023",
    category: "education",
    title: "Started B.E. Computer Science (Cybersecurity)",
    detail: "Began the cybersecurity specialization at Jerusalem College of Engineering, Chennai. Also became a campus ambassador for Rootecstak.",
  },
  {
    sort: "2024-04",
    when: "Apr 2024",
    category: "leadership",
    title: "Co-founded Flaggers United",
    detail: "Started a CTF team to design challenges, compete together and onboard new players.",
  },
  {
    sort: "2024-10",
    when: "Oct 2024",
    category: "leadership",
    title: "Club Builder, CyberNexus Club",
    detail: "Helped build the college cybersecurity club from Linux and networking basics up to internal CTFs.",
  },
  {
    sort: "2024-12",
    when: "Dec 2024",
    category: "education",
    title: "Google Foundations of Cybersecurity",
    detail: "Followed by TryHackMe Pre Security (Jan 2025) and Jr Penetration Tester (Feb 2025).",
  },
  {
    sort: "2025-03",
    when: "Mar 2025",
    category: "competition",
    title: "1st place, TEXUS'25 Bug Bounty Hunt",
    detail: "Won the bug bounty hunt at SRM IST Chennai.",
  },
  {
    sort: "2025-06",
    when: "Jun – Jul 2025",
    category: "project",
    title: "DevSecOps internship, TechForce Services",
    detail:
      "Security team member on the Kimai migration to AWS and GCP: least-privilege IAM roles, private subnets, bastion-only SSH, encrypted RDS, and exposure checks with Nmap and AWS Security Hub.",
  },
  {
    sort: "2025-08",
    when: "Aug 2025",
    category: "leadership",
    title: "President, CyberNexus Club",
    detail: "Led the club for a year, running 10+ events including inter-college CTFs, workshops and technical sessions.",
  },
  {
    sort: "2025-12",
    when: "Dec 2025",
    category: "education",
    title: "Certified Cybersecurity Educator Professional (CCEP)",
    detail: "Certification from Red Team Leaders.",
  },
  {
    sort: "2026-03-19",
    when: "19 Mar 2026",
    category: "research",
    title: "WHO: information disclosure, Hall of Fame",
    detail: "Found through subdomain enumeration and directory brute-forcing on an admin host.",
  },
  {
    sort: "2026-04-05",
    when: "Apr 2026",
    category: "competition",
    title: "#12 at the DEF CON Chennai CTF",
    detail: "Played the TamilCTF-run CTF at Zoho Chennai with Flaggers United and solved 12 challenges.",
  },
  {
    sort: "2026-04-10",
    when: "Apr 2026",
    category: "competition",
    title: "Top 15, Kaalchakra 2026 finals in Goa",
    detail: "Cleared the prelims on 28 March and played the onsite national finals at NFSU Goa.",
  },
  {
    sort: "2026-04-16",
    when: "16 Apr 2026",
    category: "competition",
    title: "2nd place, KingSlayers CTF",
    detail: "Runner-up with Flaggers United at the OWASP Sairam Institutions Chapter CTF.",
  },
  {
    sort: "2026-04-17",
    when: "Apr 2026",
    category: "competition",
    title: "12th of 230+ teams, solo, at DCG Coimbatore",
    detail: "Played alone under a no-LLM policy and published a full write-up.",
  },
  {
    sort: "2026-05-28",
    when: "May 2026",
    category: "research",
    title: "Sony: DOM-based XSS acknowledged",
    detail: "First thanks from Sony on HackerOne. A broken access control finding followed and was resolved in September.",
  },
  {
    sort: "2026-06-07",
    when: "7 Jun 2026",
    category: "research",
    title: "UNESCO Hall of Fame",
    detail: "Reported a configuration file exposure; listed in the Hall of Fame three emails later.",
  },
  {
    sort: "2026-06-12",
    when: "Jun 2026",
    category: "research",
    title: "First bounty: $250 from Instacart",
    detail: "An API security vulnerability, triaged and resolved through Instacart's HackerOne program.",
  },
  {
    sort: "2026-06-20",
    when: "Jun 2026",
    category: "research",
    title: "Porsche fixed an authentication bypass",
    detail: "Porsche Information Security reviewed the report, resolved the issue and sent a thank-you.",
  },
  {
    sort: "2026-08-12",
    when: "12 Aug 2026",
    category: "leadership",
    title: "Organized DOOMS CTF 2026",
    detail: "75+ participants from 10 colleges across Tamil Nadu: my last inter-college CTF as CyberNexus President.",
  },
  {
    sort: "2026-09-15",
    when: "Sep 2026",
    category: "competition",
    title: "1st place, ISACA Trivandrum Chapter CTF",
    detail: "Flaggers United won ₹25,000 and received the award at the Secure AI Summit.",
  },
  {
    sort: "2026-09-30",
    when: "Sep 2026",
    category: "research",
    title: "Second bounty: $400 from Vercel",
    detail: "A stateful regular-expression flaw in the open-source Flags SDK.",
  },
  {
    sort: "2025-01",
    when: "Early 2025",
    category: "competition",
    title: "3rd at CIT CTF (solo) and NPSB CTF",
    detail: "A strong start to the year, alongside reaching the top 7% on TryHackMe.",
  },
  {
    sort: "2025-05-17",
    when: "May 2025",
    category: "leadership",
    title: "First workshop as a mentor",
    detail: "A 4-hour hands-on session for students fresh out of 12th grade: Linux, cryptography and password cracking.",
  },
  {
    sort: "2025-06-21",
    when: "Jun 2025",
    category: "leadership",
    title: "Launched the Flaggers United Showcase",
    detail: "A Saturday showcase for students to present the tools and projects they build.",
  },
  {
    sort: "2025-07-25",
    when: "Jul 2025",
    category: "competition",
    title: "HackathonX: 1st in the qualifier CTF, 5th overall",
    detail: "Reported 13 bugs in the semi-final bug bounty, 9 approved.",
  },
  {
    sort: "2025-08-08",
    when: "8 Aug 2025",
    category: "competition",
    title: "2nd at ARCADIA State-Level CTF",
    detail: "Dropped from 1st to 5th, then a last-minute flag brought Flaggers United back to 2nd.",
  },
  {
    sort: "2025-09-13",
    when: "13 Sep 2025",
    category: "competition",
    title: "2nd at RAGNAROK QUEST, ZYVERSE 2K25",
    detail: "Runner-up at SRM Valliammai Engineering College.",
  },
  {
    sort: "2025-09-24",
    when: "24 Sep 2025",
    category: "leadership",
    title: "Talk: find your security role from your CTF role",
    detail: "Delivered at Spark: The Origin, the first phase of the Cyber Nexus programme.",
  },
  {
    sort: "2025-10-10",
    when: "Oct 2025",
    category: "leadership",
    title: "Escape Room 2.0 with 110+ participants",
    detail: "Handed the website and challenges to the juniors and led from behind.",
  },
  {
    sort: "2025-11-05",
    when: "Nov 2025",
    category: "competition",
    title: "1st at CyberHaunt CTF",
    detail: "JCE teams swept 1st, 2nd and 3rd at Sairam.",
  },
  {
    sort: "2025-12-22",
    when: "Dec 2025",
    category: "competition",
    title: "2nd at the CEG Network Security CTF, 3rd at CipherStrike",
    detail: "₹5,000 second prize under the ISEA project, and 32 challenges solved in CYSCOM's 24-hour CipherStrike.",
  },
  {
    sort: "2026-01-24",
    when: "24 Jan 2026",
    category: "leadership",
    title: "Organized SPYIREX CTF",
    detail: "An inter-college CTF at the JCE auditorium with a ₹10,000 prize pool.",
  },
  {
    sort: "2026-02-20",
    when: "Feb 2026",
    category: "competition",
    title: "2nd in both the CTF and Bug Bounty at TEXUS'26",
    detail: "A pure red-team CTF: recon, SQL injection, XSS, file-upload bypass, command injection, IDOR and LFI.",
  },
  {
    sort: "2026-03-15",
    when: "Mar 2026",
    category: "research",
    title: "JPMorganChase Responsible Disclosure Hall of Fame",
    detail: "Found together with teammate Thiruselvam D.",
  },
  {
    sort: "2026-11",
    when: "Now",
    category: "education",
    title: "Final year, graduating May 2027",
    detail: "Focused on web and API security research, competing with Flaggers United and building security tools.",
  },
];
