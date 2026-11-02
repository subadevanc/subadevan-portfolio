"use client";

import { useEffect } from "react";

/** Opens the accordion item whose `${prefix}${id}` matches the URL hash (e.g. links from the skills section). */
export function useHashOpen(prefix: string, ids: string[], open: (id: string) => void) {
  useEffect(() => {
    const check = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash.startsWith(prefix)) return;
      const id = hash.slice(prefix.length);
      if (ids.includes(id)) open(id);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
