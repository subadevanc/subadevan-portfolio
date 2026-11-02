import { PHOTOS, type Photo } from "./photos";

export const PIPELINE = ["Discovery", "Validation", "Reporting", "Triage", "Resolution"] as const;

export type Link = { label: string; href: string };

export type CaseStudy = {
  id: string;
  org: string;
  program?: string;
  title: string;
  category: string;
  /** Leave undefined when unverified; the UI shows an [ADD DATE] placeholder. */
  date?: string;
  recognition: string;
  status: string;
  /** Index into PIPELINE of the last stage that is publicly confirmed. */
  stage: number;
  overview: string;
  rootCause: string;
  implications: string;
  disclosure: string;
  resolution: string;
  evidence: Link[];
  photos?: Photo[];
  featured?: boolean;
};

// Never add PoCs, payloads, endpoints or private report contents here.
export const caseStudies: CaseStudy[] = [
  {
    id: "vercel",
    org: "Vercel",
    program: "Flags SDK · HackerOne (Vercel Open Source)",
    title: "State leaking across flag evaluations",
    category: "Stateful regular expression",
    date: "Sep 2026",
    recognition: "$400 bounty",
    status: "Resolved",
    stage: 4,
    featured: true,
    overview:
      "Feature flags decide what each request sees, so every evaluation has to be independent of the last. In Vercel's open-source Flags SDK I found a regular-expression flaw that leaked state from one evaluation into the next.",
    rootCause:
      "Bug class: a stateful regular expression. In JavaScript, a RegExp with the global (g) or sticky (y) flag remembers its lastIndex between calls, so reusing one instance can make the same input match on one call and fail on the next.",
    implications:
      "When a match depends on the previous call, identical inputs can evaluate differently between requests, and any flag decision built on that match becomes unpredictable.",
    disclosure: "Reported privately to Vercel together with a recommended fix.",
    resolution: "Report accepted and resolved. Awarded a $400 bounty.",
    evidence: [{ label: "Flags SDK repository", href: "https://github.com/vercel/flags" }],
  },
  {
    id: "instacart",
    org: "Instacart",
    program: "Bug bounty program",
    title: "API security vulnerability",
    category: "API security",
    date: "May – Jun 2026",
    recognition: "$250 bounty",
    status: "Resolved",
    stage: 4,
    overview: "Found while testing Instacart's API surface and reported through its HackerOne bug bounty program. My first paid bounty.",
    rootCause: "Withheld. The report is private under the program's disclosure policy.",
    implications: "Withheld. The report is private under the program's disclosure policy.",
    disclosure: "Submitted through Instacart's bug bounty program and triaged by the security team.",
    resolution: "Resolved by Instacart. Awarded a $250 bounty in June 2026.",
    evidence: [],
    photos: [PHOTOS.instacartBounty, PHOTOS.hackeroneThanks],
  },
  {
    id: "sony",
    org: "Sony",
    program: "Vulnerability disclosure program",
    title: "DOM-based XSS and broken access control",
    category: "Client-side injection · Access control",
    date: "May – Sep 2026",
    recognition: "2 findings · swag",
    status: "Remediated",
    stage: 4,
    overview:
      "Two separate vulnerabilities reported through Sony's vulnerability disclosure program on HackerOne. The DOM XSS was acknowledged in May 2026. The access-control flaw let one user pin someone else's comment on another person's post, which looks funny but is a real authorization failure.",
    rootCause:
      "Bug classes: DOM-based XSS, where untrusted input reaches a dangerous sink in client-side code, and broken access control, where a resource or action is reachable without the right authorization. Specifics withheld.",
    implications:
      "DOM-based XSS can run attacker-controlled script in a victim's session; broken access control can expose data or actions to the wrong user.",
    disclosure: "Reported through Sony's VDP.",
    resolution: "Both findings confirmed and remediated by Sony, with swag for each.",
    evidence: [],
    photos: [PHOTOS.hackeroneBadges],
  },
  {
    id: "zkteco",
    org: "ZKTeco",
    title: "Authentication bypass",
    category: "Authentication",
    recognition: "INR 18,000 reward · swag",
    status: "Rewarded",
    stage: 3,
    overview: "Reported an authentication bypass vulnerability to ZKTeco.",
    rootCause: "Withheld. The report is private.",
    implications: "An authentication bypass lets someone reach protected functionality without valid credentials.",
    disclosure: "Reported responsibly to ZKTeco.",
    resolution: "Recognized with a cash reward of INR 18,000, plus a keyboard and mouse as swag. Remediation status is not public.",
    evidence: [],
    photos: [PHOTOS.zktecoSwag],
  },
];

export type Disclosure = {
  org: string;
  finding: string;
  date?: string;
  outcome: string;
  note?: string;
  evidence?: Link;
  photos?: Photo[];
};

export const disclosures: Disclosure[] = [
  {
    org: "UNESCO",
    finding: "Configuration file exposure",
    date: "7 Jun 2026",
    outcome: "Hall of Fame",
    note: "Report sent on 7 June; listed in the Hall of Fame three emails later.",
    evidence: { label: "Disclosure page", href: "https://www.unesco.org/en/vulnerability-disclosure" },
    photos: [PHOTOS.unescoHof],
  },
  {
    org: "Porsche",
    finding: "Authentication bypass",
    date: "Jun 2026",
    outcome: "Fixed · thanked",
    note: "Porsche Information Security reviewed the report and resolved the issue.",
    photos: [PHOTOS.porscheThanks],
  },
  {
    org: "World Health Organization",
    finding: "Information disclosure (exposed .git data)",
    date: "19 Mar 2026",
    outcome: "Hall of Fame",
    note: "Found through plain recon: subdomain enumeration, then directory brute-forcing on an admin host.",
    evidence: {
      label: "Hall of fame",
      href: "https://www.who.int/about/cybersecurity/vulnerability-hall-of-fame/ethical-hacker-list",
    },
  },
  {
    org: "JPMorgan Chase",
    finding: "Exposed .git data",
    date: "Mar 2026",
    outcome: "Hall of Fame",
    note: "Found together with teammate Thiruselvam D and listed in JPMorganChase's Responsible Disclosure Hall of Fame.",
    evidence: {
      label: "Recognition page",
      href: "https://responsibledisclosure.jpmorganchase.com/hc/en-us/articles/360023828114-Recognition-for-Responsible-Disclosures",
    },
  },
];

export const experience = {
  role: "DevSecOps Intern",
  company: "TechForce Services",
  context: "Salesforce ecosystem",
  location: "Chennai, India",
  period: "Jun 2025 – Jul 2025",
  summary:
    "Security team member on a project migrating the open-source Kimai application to a containerized AWS and GCP deployment.",
  points: [
    "Designed 3 least-privilege IAM roles (Jenkins, App Server, Bastion), each scoped strictly to its service's requirements.",
    "Hardened the network: application and database in private subnets, bastion-only key-based SSH, inbound traffic limited to ports 22 and 80, and an encrypted RDS instance.",
    "Verified network exposure before deployment with Nmap port scans and AWS Security Hub audits.",
    "Automated the infrastructure with Terraform and CI/CD pipelines, with a first look at WAF-based shielding.",
  ],
  repo: "https://github.com/subadevanc/Kimai-TechForce",
  photo: PHOTOS.techforce,
};
