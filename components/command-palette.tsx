"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { SECTIONS } from "@/lib/site";
import { profile, socials } from "@/data/profile";

type Action =
  | { type: "section"; id: string }
  | { type: "terminal" }
  | { type: "resume" }
  | { type: "copy-email" }
  | { type: "open"; href: string }
  | { type: "page"; href: string };

type Item = { key: string; label: string; hint: string; group: "Navigate" | "Pages" | "Actions"; action: Action };

const href = (label: string) => socials.find((s) => s.label === label)!.href;

const ITEMS: Item[] = [
  ...SECTIONS.map((s) => ({
    key: s.id,
    label: s.label,
    hint: `§${s.index}`,
    group: "Navigate" as const,
    action: { type: "section" as const, id: s.id },
  })),
  { key: "page-community", label: "Community page", hint: "/community", group: "Pages", action: { type: "page", href: "/community" } },
  { key: "page-certifications", label: "Certifications page", hint: "/certifications", group: "Pages", action: { type: "page", href: "/certifications" } },
  { key: "terminal", label: "Open terminal", hint: ">_", group: "Actions", action: { type: "terminal" } },
  { key: "resume", label: "Download résumé", hint: "PDF", group: "Actions", action: { type: "resume" } },
  { key: "copy-email", label: "Copy email address", hint: profile.email, group: "Actions", action: { type: "copy-email" } },
  { key: "github", label: "Open GitHub", hint: "↗", group: "Actions", action: { type: "open", href: href("GitHub") } },
  { key: "linkedin", label: "Open LinkedIn", hint: "↗", group: "Actions", action: { type: "open", href: href("LinkedIn") } },
];

function scrollToSection(id: string, go: (href: string) => void) {
  const el = document.getElementById(id);
  if (!el || window.location.pathname !== "/") {
    go(`/#${id}`);
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}

export function CommandPalette({
  open,
  onClose,
  onOpenTerminal,
}: {
  open: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      setNotice("");
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const run = async (action: Action) => {
    if (action.type === "copy-email") {
      try {
        await navigator.clipboard.writeText(profile.email);
        setNotice("Email copied to clipboard");
      } catch {
        setNotice(`Copy failed. Email: ${profile.email}`);
      }
      return;
    }
    dialogRef.current?.close();
    if (action.type === "section") scrollToSection(action.id, router.push);
    else if (action.type === "terminal") onOpenTerminal();
    else if (action.type === "open") window.open(action.href, "_blank", "noopener,noreferrer");
    else if (action.type === "page") router.push(action.href);
    else if (action.type === "resume") {
      const a = document.createElement("a");
      a.href = profile.resumePath;
      a.download = "";
      a.click();
    }
  };

  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  const q = query.trim().toLowerCase();
  const filtered = q ? ITEMS.filter((i) => `${i.label} ${i.group} ${i.hint}`.toLowerCase().includes(q)) : ITEMS;
  const current = Math.min(active, Math.max(filtered.length - 1, 0));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((current + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((current - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[current]) void run(filtered[current].action);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onBackdropClick}
      aria-label="Command palette"
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] border border-line bg-surface p-0 text-fg shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 shrink-0 text-muted" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[current] ? `palette-${filtered[current].key}` : undefined}
          aria-autocomplete="list"
          aria-label="Search sections and actions"
          placeholder="Jump to a section or run an action…"
          className="h-14 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
        />
        <kbd className="label shrink-0 border border-line px-1.5 py-0.5 text-[10px]">Esc</kbd>
      </div>

      <ul id="palette-list" role="listbox" aria-label="Results" className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-muted">No matches.</li>}
        {filtered.map((item, i) => {
          const showGroup = i === 0 || filtered[i - 1].group !== item.group;
          const selected = i === current;
          return (
            <li key={item.key} role="presentation">
              {showGroup && <p className="label px-3 pb-1 pt-3 text-[10px]" aria-hidden>{item.group}</p>}
              <div
                id={`palette-${item.key}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setActive(i)}
                onClick={() => void run(item.action)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-4 px-3 text-sm transition-colors ${
                  selected ? "bg-bg text-fg" : "text-muted"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ArrowRight className={`size-3.5 transition ${selected ? "text-accent" : "opacity-0"}`} aria-hidden />
                  {item.label}
                </span>
                <span className="font-mono text-xs text-muted">{item.hint}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-3">
          <span>↑↓ move</span>
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="size-3" aria-hidden /> select
          </span>
        </span>
        <span role="status" aria-live="polite" className="text-fg">
          {notice}
        </span>
      </div>
    </dialog>
  );
}
