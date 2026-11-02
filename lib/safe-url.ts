/** Returns the URL only if it is https (or a same-page anchor / root-relative path); otherwise null. */
export function safeUrl(raw: string | undefined | null): string | null {
  if (!raw) return null;
  if (raw.startsWith("#") || (raw.startsWith("/") && !raw.startsWith("//"))) return raw;
  try {
    const url = new URL(raw);
    if (url.protocol === "https:") return url.toString();
    if (url.protocol === "mailto:") return url.toString();
  } catch {}
  return null;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
