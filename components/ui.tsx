import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { isExternal, safeUrl } from "@/lib/safe-url";
import { sectionIndex, type SectionId } from "@/lib/site";
import { Reveal } from "./reveal";

export function SectionHeading({
  id,
  kicker,
  title,
  intro,
}: {
  id: SectionId;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <Reveal>
      <p className="label flex items-center gap-3">
        <span className="text-accent">§{sectionIndex(id)}</span>
        <span className="h-px w-10 bg-line" aria-hidden />
        {kicker}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-5 text-[clamp(2.5rem,6.4vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
      >
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const safe = safeUrl(href);
  if (!safe) return <span className={className}>{children}</span>;
  const external = isExternal(safe);
  return (
    <a
      href={safe}
      className={`group inline-flex items-center gap-1 ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {arrow && external && (
        <ArrowUpRight
          className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Visible marker for content Subadevan still needs to supply. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-dashed border-muted/50 px-1.5 py-0.5 font-mono text-xs leading-5 text-muted">
      [ADD: {children}]
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="label text-[11px]">{label}</h4>
      <div className="mt-2 leading-relaxed text-fg/90">{children}</div>
    </div>
  );
}
