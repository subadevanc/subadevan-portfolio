"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Command, Menu, SquareTerminal } from "lucide-react";
import { SECTIONS } from "@/lib/site";
import { useChrome } from "./chrome";

const noopSubscribe = () => () => {};

const LINKS = [
  { key: "research", href: "/#research", label: "Research", page: null },
  { key: "competition", href: "/#competition", label: "Competition", page: null },
  { key: "community", href: "/community", label: "Community", page: "/community" },
  { key: "contact", href: "/#contact", label: "Contact", page: null },
] as const;

export function Nav() {
  const { openPalette, openTerminal } = useChrome();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const activeLink =
    pathname === "/"
      ? (LINKS.find((l) => l.key === active)?.key ?? null)
      : (LINKS.find((l) => l.page === pathname)?.key ?? null);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 font-mono text-sm" aria-label="Subadevan C, home">
          <span className="inline-flex size-8 items-center justify-center border border-line text-xs transition-colors group-hover:border-accent">
            S<span className="text-accent">C</span>
          </span>
          <span className="hidden text-muted transition-colors group-hover:text-fg sm:inline">
            subadevan<span className="text-accent">.</span>c
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = activeLink === link.key;
            return (
              <li key={link.key}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label relative block px-3 py-2 transition-colors hover:text-fg ${isActive ? "text-fg" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openTerminal}
            aria-label="Open terminal"
            className="hidden size-10 place-items-center border border-line bg-bg/70 text-muted backdrop-blur transition-colors hover:border-fg hover:text-fg md:grid"
          >
            <SquareTerminal className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={openPalette}
            aria-haspopup="dialog"
            className="label inline-flex h-10 items-center gap-2 border border-line bg-bg/70 px-3 text-fg backdrop-blur transition-colors hover:border-fg"
          >
            <Menu className="size-4 md:hidden" aria-hidden />
            <span className="md:hidden">Menu</span>
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <Command className="size-3.5" aria-hidden />
              <span>Jump to</span>
              <kbd className="ml-1 border border-line px-1.5 py-0.5 text-[10px] text-muted">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
