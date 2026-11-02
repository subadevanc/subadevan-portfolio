import type { Block } from "@/data/writeups";
import { PhotoFigure } from "./photo";

/** Renders `inline code` spans inside plain text without any HTML parsing. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-term">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function WriteupBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-fg/90 max-md:text-base">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="pt-6 text-3xl font-semibold tracking-tight text-fg max-md:text-2xl">
                {b.text}
              </h2>
            );
          case "code":
            return (
              <figure key={i} className="overflow-hidden border border-line bg-[#090b0e]">
                {b.label && (
                  <figcaption className="border-b border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {b.label}
                  </figcaption>
                )}
                <pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-term">
                  <code>
                    <span className="select-none text-muted">$ </span>
                    {b.text}
                  </code>
                </pre>
              </figure>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {b.items.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr]">
                    <span className="mt-3 size-1.5 bg-accent" aria-hidden />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "photo":
            return <PhotoFigure key={i} photo={b.photo} caption sizes="(min-width: 768px) 46rem, 100vw" />;
        }
      })}
    </div>
  );
}
