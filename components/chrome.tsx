"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Nav } from "./nav";
import { CommandPalette } from "./command-palette";
import { Terminal } from "./terminal";

type ChromeApi = { openPalette: () => void; openTerminal: () => void };

const ChromeContext = createContext<ChromeApi | null>(null);

export function useChrome() {
  const api = useContext(ChromeContext);
  if (!api) throw new Error("useChrome must be used inside <Chrome>");
  return api;
}

export function Chrome({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const openTerminal = useCallback(() => setTerminalOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    console.info(
      "%c>_ looking under the hood?%c Open the terminal (bottom right) and try: ls -a",
      "color:#3DDCC4;font-weight:bold",
      "color:inherit",
    );
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ChromeContext.Provider value={{ openPalette, openTerminal }}>
      <MotionConfig reducedMotion="user">
        <Nav />
        {children}
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onOpenTerminal={openTerminal}
        />
        <Terminal open={terminalOpen} onOpen={openTerminal} onClose={() => setTerminalOpen(false)} />
      </MotionConfig>
    </ChromeContext.Provider>
  );
}
