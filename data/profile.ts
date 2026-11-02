export const profile = {
  name: "Subadevan C",
  title: "Offensive Security Researcher",
  focus: "Web & API Security",
  intro:
    "I explore application security, investigate vulnerabilities, build security tools and compete in cybersecurity challenges.",
  location: "Chennai, India",
  timeZone: "Asia/Kolkata",
  email: "subadevanc@gmail.com",
  handle: "subadevanc",
  photo: "/profile/subadevan.jpg",
  resumePath: "/Subadevan_C_Resume.pdf",
  education: {
    school: "Jerusalem College of Engineering, Chennai",
    degree: "B.E. Computer Science and Engineering (Cybersecurity)",
    period: "Nov 2023 – May 2027",
  },
  languages: ["Tamil", "English"],
};

export type Social = { label: string; handle: string; href: string };

export const socials: Social[] = [
  { label: "GitHub", handle: "subadevanc", href: "https://github.com/subadevanc" },
  { label: "LinkedIn", handle: "in/subadevan", href: "https://www.linkedin.com/in/subadevan/" },
  { label: "X", handle: "@subadevanc", href: "https://x.com/subadevanc" },
  { label: "HackerOne", handle: "subadevan", href: "https://hackerone.com/subadevan" },
  { label: "Medium", handle: "@subadevanc", href: "https://medium.com/@subadevanc" },
  { label: "TryHackMe", handle: "subadevan", href: "https://tryhackme.com/p/subadevan" },
  { label: "CTFtime", handle: "Flaggers United", href: "https://ctftime.org/team/356365" },
];
