import Link from "next/link";
import ctftime from "@/data/ctftime.json";
import { profile } from "@/data/profile";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/community", label: "Community" },
  { href: "/certifications", label: "Certifications" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-5 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {profile.name} · Offensive Security Researcher · Chennai, India
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-draw hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/writeups/rss.xml" className="link-draw hover:text-fg">
                RSS
              </a>
            </li>
            <li>
              <a href="/.well-known/security.txt" className="link-draw hover:text-fg">
                security.txt
              </a>
            </li>
          </ul>
        </nav>
        <p>CTFtime snapshot {ctftime.fetchedAt.slice(0, 10)}</p>
      </div>
    </footer>
  );
}
