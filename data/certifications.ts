export type Certification = { name: string; issuer: string; date: string; credentialId?: string; note?: string };
export type CertGroup = { id: string; title: string; items: Certification[] };

// Source: LinkedIn "Licenses & certifications".
export const certGroups: CertGroup[] = [
  {
    id: "security",
    title: "Security certifications",
    items: [
      { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", date: "Dec 2025", credentialId: "57541192028172b" },
      { name: "Jr Penetration Tester", issuer: "TryHackMe", date: "Feb 2025", credentialId: "THM-WDRYOWY02T" },
      { name: "Pre Security", issuer: "TryHackMe", date: "Jan 2025", credentialId: "THM-XYWDPPLSWB" },
      { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Apr 2025" },
      { name: "Systems and Usable Security", issuer: "NPTEL", date: "Apr 2025" },
      { name: "Networking Basics", issuer: "Cisco Networking Academy", date: "Feb 2025" },
      { name: "Foundations of Cybersecurity", issuer: "Google", date: "Dec 2024", credentialId: "W8OU0BIYPGYQ" },
      { name: "Cybersecurity", issuer: "SKOLAR", date: "May 2024", credentialId: "CC24-5624" },
    ],
  },
  {
    id: "competitions",
    title: "Competition certificates",
    items: [
      { name: "Amazon AppSec CTF", issuer: "Amazon", date: "Sep 2025" },
      { name: "N3XT_L3V3L CTF 2025", issuer: "N3XT_L3V3L", date: "Aug 2025", note: "Participation" },
      { name: "Arcadia 4th State Level CTF", issuer: "SRM Valliammai Engineering College", date: "Aug 2025" },
      { name: "NULL CORE CTF", issuer: "Velammal Engineering College", date: "Aug 2025" },
      { name: "Bug Bounty", issuer: "SRM IST Chennai", date: "Mar 2025", note: "1st place" },
    ],
  },
  {
    id: "foundations",
    title: "Programming & foundations",
    items: [
      { name: "Artificial Intelligence Fundamentals", issuer: "IBM", date: "Jan 2025" },
      { name: "Python (Basic)", issuer: "HackerRank", date: "Dec 2024", credentialId: "e958208fd6ed" },
      { name: "Learn to Code in Python 3", issuer: "Udemy", date: "Dec 2023" },
    ],
  },
];
