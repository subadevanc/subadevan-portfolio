import { PHOTOS, type Photo } from "./photos";

export const flaggersUnited = {
  name: "Flaggers United",
  role: "Co-Founder",
  since: "Apr 2024",
  ctftime: "https://ctftime.org/team/356365",
  summary:
    "A CTF team and learning community from Jerusalem College of Engineering, Chennai. I co-founded it to give students a place to learn security by competing: we design challenges, play international CTFs together and help beginners get started.",
  contributions: [
    "Teach CTF and security concepts through workshops, videos and posts",
    "Design and host CTF challenges and events",
    "Guide beginners with roadmaps, mentorship and Q&A",
    "Partner with colleges to grow participation",
  ],
};

export type Role = { title: string; org: string; period: string; detail?: string };

export const cyberNexus = {
  name: "CyberNexus Club",
  org: "Jerusalem College of Engineering",
  roles: [
    { title: "President", org: "CyberNexus Club", period: "Aug 2025 – Aug 2026" },
    { title: "Club Builder", org: "CyberNexus Club", period: "Oct 2024 – Aug 2025" },
  ] satisfies Role[],
  summary:
    "The goal was more than a club: a launchpad where members learn real skills, get mentored by alumni and seniors, and run professional-level CTFs. It grew from Linux and networking basics to internal CTFs to inter-college events.",
  eventsCount: "10+",
};

export type CommunityEvent = {
  name: string;
  date?: string;
  role: "Organized" | "Attended";
  /** Who ran it, for organized events. */
  org?: "Cyber Nexus Club" | "Flaggers United" | "Personal";
  where?: string;
  detail: string;
  facts?: string[];
  photos?: Photo[];
};

export const events: CommunityEvent[] = [
  {
    name: "DOOMS CTF 2026",
    org: "Cyber Nexus Club",
    date: "12 Aug 2026",
    role: "Organized",
    where: "Jerusalem College of Engineering, Chennai",
    detail:
      "My last inter-college CTF as President. The juniors ran the execution on limited infrastructure, and Flaggers United helped it reach students across Tamil Nadu.",
    facts: ["75+ participants", "10 colleges", "Teams of 3", "₹10,000 prize pool", "Sponsored by IEI"],
    photos: [PHOTOS.doomsOrganisers, PHOTOS.doomsParticipants, PHOTOS.doomsGuests],
  },
  {
    name: "SPYIREX CTF 2026",
    org: "Cyber Nexus Club",
    date: "24 Jan 2026",
    role: "Organized",
    where: "JCE Auditorium, Chennai",
    detail:
      "An inter-college CTF by the Cyber Nexus Club with the Department of Cyber Security and IE(I), across cryptography, web security, reverse engineering, pwn and forensics. Challenges were built by Flaggers United juniors.",
    facts: ["Teams of 1–3", "₹10,000 prize pool", "4-hour CTF"],
    photos: [PHOTOS.spyirex, PHOTOS.spyirexHall],
  },
  {
    name: "Escape Room 2.0",
    org: "Cyber Nexus Club",
    date: "Oct 2025",
    role: "Organized",
    where: "Jerusalem College of Engineering",
    detail:
      "A technical quiz filtered the field to the top 40 teams, who then worked through forensics, steganography, cryptography and web challenges. This time I stepped back and handed the website and challenges to the juniors.",
    facts: ["110+ participants", "Top 40 teams", "Juniors ran the build"],
    photos: [PHOTOS.escapeRoom],
  },
  {
    name: "Spark: The Origin",
    org: "Cyber Nexus Club",
    date: "24 Sep 2025",
    role: "Organized",
    where: "Cyber Nexus Club, JCE",
    detail:
      "Phase one of the Cyber Nexus programme. I gave the talk “How to find your cybersecurity role from your CTF role”, mapping CTF domains to real jobs: reversing to malware analysis, web to pentesting, forensics and OSINT to specialist tracks.",
    photos: [PHOTOS.sparkTalk, PHOTOS.sparkPoster],
  },
  {
    name: "Playful HnH & Red HnH",
    org: "Cyber Nexus Club",
    date: "Sep 2025",
    role: "Organized",
    where: "Jerusalem College of Engineering",
    detail:
      "Cyber Nexus Club's first event of the year: a phone-based flag hunt in the auditorium, then a real Hack-n-Hunt across web, forensics and steganography the next day.",
  },
  {
    name: "Flaggers United Showcase",
    org: "Flaggers United",
    date: "Jun 2025",
    role: "Organized",
    where: "Jerusalem College of Engineering",
    detail:
      "A Saturday showcase where students present the tools and projects they build, to break the gap between seniors and juniors and show that building things isn't rocket science.",
  },
  {
    name: "Cybersecurity workshop for school leavers",
    org: "Personal",
    date: "May 2025",
    role: "Organized",
    detail: "A 4-hour hands-on workshop for students who had just finished 12th grade: Linux basics, cryptography and password cracking.",
    photos: [PHOTOS.workshop],
  },
  {
    name: "Secure AI Summit · ISACA Trivandrum Chapter",
    date: "Sep 2026",
    role: "Attended",
    where: "Thiruvananthapuram",
    detail: "Attended alongside the ISACA CTF, where Flaggers United took first prize.",
  },
  {
    name: "CSA Tamil Nadu Chapter workshop",
    date: "26 Sep 2026",
    role: "Attended",
    where: "Chennai",
    detail: "Sessions on AI in cybersecurity, agentic AI SOCs and AI-driven SIEM.",
  },
  {
    name: "DEF CON Chennai",
    date: "Apr 2026",
    role: "Attended",
    where: "Zoho, Chennai",
    detail: "Two days of talks and conversations, then the CTF by TamilCTF, where Flaggers United placed #12.",
    photos: [PHOTOS.defconChennai],
  },
  {
    name: "DEF CON Chennai meet-up",
    date: "Jul 2025",
    role: "Attended",
    where: "Zoho, Chennai",
    detail: "Talks on V8 internals, sandboxing and 0-days, plus a blue-team session on process injection and threat hunting.",
  },
  {
    name: "CSEC 2025 · Cybersecurity Expo and Conference",
    date: "May 2025",
    role: "Attended",
    where: "Chennai",
    detail: "Panels on AI in cybersecurity and compliance-as-a-service, and meeting people from the Chennai security scene.",
  },
  {
    name: "null Chennai × OWASP Chennai meet-up",
    date: "May 2025",
    role: "Attended",
    where: "YuniQ, Chennai",
    detail: "Talks on blockchain security, then a CTF where Flaggers United finished in the top three.",
  },
];

export const otherRoles: Role[] = [
  { title: "Campus Ambassador", org: "Rootecstak", period: "Nov 2023 – present", detail: "Community development and outreach." },
  { title: "Co-Founder", org: "MTS Community", period: "Oct 2019 – present", detail: "A computer science community started in school." },
];
