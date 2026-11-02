import ctftime from "@/data/ctftime.json";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-4 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {profile.name} · Chennai, India
        </p>
        <p>
          CTFtime data snapshot {ctftime.fetchedAt.slice(0, 10)} ·{" "}
          <a href="/.well-known/security.txt" className="link-draw hover:text-fg">
            security.txt
          </a>
        </p>
        <p aria-hidden>
          <span className="text-term">~ $</span> ls -a
        </p>
      </div>
    </footer>
  );
}
