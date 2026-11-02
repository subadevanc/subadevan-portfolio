"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SquareTerminal, X } from "lucide-react";
import { profile } from "@/data/profile";
import { caseStudies, disclosures } from "@/data/research";
import { wins } from "@/data/competitions";
import ctftime from "@/data/ctftime.json";
import medium from "@/data/medium.json";
import { sortedWriteups } from "@/data/writeups";

type Kind = "cmd" | "out" | "err" | "ok" | "flag" | "sys";
type Line = { id: number; kind: Kind; text: string; prompt?: string };

const FLAG = "FLAG{SUBADEVAN_SECURITY_RESEARCHER}";

// Answers are stored as SHA-256 hashes so they aren't readable in the page source.
const CHALLENGES = [
  {
    prompt: [
      "challenge 1/3 · encoding",
      "decode this string and submit the plaintext:",
      "    ZGlzY2xvc2U=",
    ],
    hint: "it ends with '=' padding. a classic text-to-ascii encoding.",
    hashes: ["99d79cff2cb32aac84280b1c838c50286b076cd43f886513f05031d63290d051"],
  },
  {
    prompt: [
      "challenge 2/3 · http",
      "you are logged in, but GET /admin is refused because your account lacks permission.",
      "which status code should the server answer with?",
    ],
    hint: "not 401. the server knows exactly who you are.",
    hashes: ["d26eae87829adde551bf4b852f9da6b8c3c2db9b65b8b68870632a2db5f53e00"],
  },
  {
    prompt: [
      "challenge 3/3 · security logic",
      "GET /api/orders/1042 returns your order.",
      "GET /api/orders/1043 returns a stranger's order.",
      "name the vulnerability class (4 letters).",
    ],
    hint: "insecure direct object ...",
    hashes: [
      "0b5a52cdc4f5481343077f16476c5afde78732e28c9c5eafbf7f9a9a54a0540d",
      "8b88c35eb7ba86b91d8c4b69d468df3d24931071206c07cc61c3aaff03aaea88",
    ],
  },
];

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

const BANNER = [
  "┌─────────────────────────────────────┐",
  "│  ▓▓ subadevan@portfolio             │",
  "│  offensive security · web & api     │",
  "│  flaggers united · chennai, in      │",
  "└─────────────────────────────────────┘",
];

const HELP = [
  "available commands:",
  "  whoami         who is this",
  "  about          the short version",
  "  achievements   bounties and podiums",
  "  contact        how to reach me",
  "  bounties       paid bounties and disclosures",
  "  wins           competition wins",
  "  ctf            flaggers united on ctftime",
  "  writeups       write-ups and medium posts",
  "  ls             list files",
  "  clear          clear the screen",
  "  exit           close the terminal",
  "",
  "some files are hidden.",
];

const FILES = "about.txt  achievements.log  contact.txt";

function staticOutput(cmd: string): string[] | null {
  switch (cmd) {
    case "help":
      return HELP;
    case "whoami":
      return [`${profile.name.toLowerCase()} · ${profile.title.toLowerCase()} · ${profile.focus.toLowerCase()}`];
    case "about":
    case "cat about.txt":
      return [
        `final-year ${profile.education.degree}, ${profile.education.school}.`,
        "I test web apps and APIs, disclose what I find responsibly,",
        "compete in CTFs with Flaggers United and build security tools.",
      ];
    case "achievements":
    case "cat achievements.log":
      return [
        ...caseStudies.map((c) => `  [bounty] ${c.org.padEnd(10)} ${c.title} · ${c.recognition}`),
        `  [disclosure] ${disclosures.map((d) => d.org).join(", ")}`,
        `  [wins ×${wins.length}] ${wins.map((c) => `${c.event} (${c.result})`).join(", ")}`,
      ];
    case "bounties":
      return [
        ...caseStudies.map((c) => `  ${c.org.padEnd(10)} ${c.recognition.padEnd(22)} ${c.date ?? ""}`),
        ...disclosures.map((d) => `  ${d.org.slice(0, 10).padEnd(10)} ${d.outcome.padEnd(22)} ${d.date ?? ""}`),
      ];
    case "wins":
      return [`  ${wins.length} top-3 finishes:`, ...wins.map((c) => `  ${c.result.padEnd(4)} ${c.event}${c.date ? ` · ${c.date}` : ""}`)];
    case "ctf": {
      const r = ctftime.rating.at(-1);
      const best = [...ctftime.events].sort((a, b) => a.place / a.totalTeams - b.place / b.totalTeams)[0];
      return [
        `  ${ctftime.team.name} · ctftime.org/team/${ctftime.team.id}`,
        r ? `  ${r.year}: #${r.ratingPlace} global · #${r.countryPlace} india · ${r.points} pts` : "  no rated season yet",
        `  events played: ${ctftime.events.length} · best: #${best.place}/${best.totalTeams} ${best.title}`,
        "  latest:",
        ...ctftime.events.slice(0, 5).map((e) => `    ${e.date}  #${String(e.place).padEnd(4)} ${e.title}`),
        `  snapshot ${ctftime.fetchedAt.slice(0, 10)}`,
      ];
    }
    case "writeups":
      return [
        ...sortedWriteups.map((w) => `  ${w.date}  ${w.title}\n              → /writeups/${w.slug}`),
        ...medium.articles.map((a) => `  ${a.date}  ${a.title}\n              → medium`),
        "",
        "→ subadevan.tech/writeups",
      ];
    case "contact":
    case "cat contact.txt":
      return [`  email      ${profile.email}`, "  linkedin   linkedin.com/in/subadevan", "  github     github.com/subadevanc", "  x          x.com/subadevanc"];
    case "ls":
      return [FILES];
    case "ls -a":
    case "ls -la":
    case "ls -al":
      return [`.  ..  .flag_challenge  ${FILES}`];
    case "pwd":
      return ["/home/subadevan"];
    case "date":
      return [new Date().toString()];
    default:
      return null;
  }
}

export function Terminal({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [challenge, setChallenge] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const push = (kind: Kind, text: string, prompt?: string) =>
    setLines((prev) => [...prev, { id: nextId.current++, kind, text, prompt }]);

  const print = (kind: Kind, texts: string[]) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    texts.forEach((text, i) => {
      if (reduce) push(kind, text);
      else timers.current.push(window.setTimeout(() => push(kind, text), i * 28));
    });
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      if (lines.length === 0) {
        print("out", BANNER);
        timers.current.push(window.setTimeout(() => push("sys", 'type "help" to begin.'), BANNER.length * 28 + 40));
      }
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (returnFocus.current) {
      (returnFocus.current.isConnected ? returnFocus.current : launcherRef.current)?.focus();
      returnFocus.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const startChallenge = (n: number) => {
    setChallenge(n);
    print("out", [...CHALLENGES[n].prompt, "", "usage: submit <answer>  ·  hint  ·  quit"]);
  };

  const submit = async (raw: string) => {
    if (challenge === null) return print("err", ["no challenge running. there might be a hidden file somewhere…"]);
    if (!window.crypto?.subtle) return print("err", ["the challenge needs a secure (https) context."]);
    const answer = raw.trim().toLowerCase().replace(/^["']|["']$/g, "");
    if (!answer) return print("err", ["usage: submit <answer>"]);
    const hash = await sha256(answer);
    if (!CHALLENGES[challenge].hashes.includes(hash)) return print("err", ["[-] not quite. try again, or type hint."]);
    if (challenge < CHALLENGES.length - 1) {
      print("ok", ["[+] correct.", ""]);
      startChallenge(challenge + 1);
      return;
    }
    setChallenge(null);
    setSolved(true);
    print("ok", ["[+] correct. all three solved.", ""]);
    timers.current.push(
      window.setTimeout(() => {
        push("flag", FLAG);
        print("out", ["", `nice work. you'd fit right in at Flaggers United. say hi: ${profile.email}`]);
      }, 300),
    );
  };

  const run = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    push("cmd", cmd, challenge !== null ? "ctf" : "~");
    if (!cmd) return;
    history.current.unshift(cmd);
    historyIndex.current = -1;
    const lower = cmd.toLowerCase();

    if (lower === "clear") return setLines([]);
    if (lower === "exit") return onClose();
    if (["cat .flag_challenge", "./.flag_challenge", "challenge", "start"].includes(lower)) {
      if (!solved) return startChallenge(0);
      print("ok", ["already solved. here's your flag again:"]);
      timers.current.push(window.setTimeout(() => push("flag", FLAG), 60));
      return;
    }
    if (lower.startsWith("submit")) return void submit(cmd.slice(6));
    if (lower === "hint") {
      return challenge === null ? print("out", ["try: ls -a"]) : print("out", [`hint: ${CHALLENGES[challenge].hint}`]);
    }
    if (lower === "quit") {
      if (challenge === null) return print("out", ["nothing to quit. type exit to close the terminal."]);
      setChallenge(null);
      return print("out", ["challenge abandoned. run it again any time."]);
    }
    if (lower.startsWith("sudo")) return print("err", ["subadevan is not in the sudoers file. this incident will be reported."]);
    if (lower.startsWith("rm ")) return print("err", ["nice try."]);
    if (lower.startsWith("echo ")) return print("out", [cmd.slice(5)]);
    if (lower.startsWith("cd")) return print("out", ["sections aren't directories here. try: achievements"]);

    const output = staticOutput(lower);
    if (output) return print("out", output);
    print("err", [`command not found: ${cmd}. type help.`]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const max = history.current.length - 1;
      historyIndex.current = Math.max(-1, Math.min(max, historyIndex.current + (e.key === "ArrowUp" ? 1 : -1)));
      setInput(historyIndex.current === -1 ? "" : history.current[historyIndex.current]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const color: Record<Kind, string> = {
    cmd: "text-fg",
    out: "text-term",
    ok: "text-term",
    err: "text-accent",
    flag: "text-term",
    sys: "text-muted",
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.6 } }}
            exit={{ opacity: 0, y: 12 }}
            aria-label="Open terminal"
            className="fixed bottom-4 right-4 z-40 inline-flex h-11 items-center gap-2 border border-line bg-surface/90 px-4 font-mono text-xs text-muted backdrop-blur transition-colors hover:border-term hover:text-term max-md:bottom-3 max-md:right-3 max-md:w-11 max-md:justify-center max-md:px-0"
          >
            <SquareTerminal className="size-4" aria-hidden />
            <span className="max-md:hidden">terminal</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Interactive terminal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-2 bottom-2 z-50 flex h-[min(30rem,72vh)] flex-col border border-line bg-[#090b0e] font-mono text-[13px] shadow-2xl shadow-black/70 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[min(42rem,calc(100vw-2rem))]"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="flex items-center gap-2 text-xs text-muted">
                <span className="size-2 rounded-full bg-term" aria-hidden />
                subadevan@portfolio: ~
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close terminal"
                className="grid size-9 place-items-center text-muted transition-colors hover:text-fg"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed"
            >
              {lines.map((line) =>
                line.kind === "flag" ? (
                  <p key={line.id} className="flag-glow my-2 border border-term/40 bg-term/5 px-3 py-2 text-base font-semibold text-term">
                    {line.text}
                  </p>
                ) : (
                  <p key={line.id} className={`whitespace-pre-wrap break-words ${color[line.kind]}`}>
                    {line.kind === "cmd" && <span className="text-muted">{line.prompt} $ </span>}
                    {line.text || " "}
                  </p>
                ),
              )}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-3">
              <label htmlFor="terminal-input" className="shrink-0 text-muted">
                {challenge !== null ? "ctf" : "~"} $
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent text-fg caret-term outline-none"
                aria-label="Terminal command"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
