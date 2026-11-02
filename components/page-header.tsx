import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";

export function PageHeader({ path, title, intro, children }: { path: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg opacity-80" />
      </div>
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <Link href="/" className="label inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg">
            <ArrowLeft className="size-3.5" aria-hidden /> Back to home
          </Link>
          <p className="mt-8 font-mono text-sm text-term">~/{path}</p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
          {children}
        </Reveal>
      </div>
    </header>
  );
}

export function SubHeading({ id, index, title, intro }: { id: string; index: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal>
      <p className="label flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" aria-hidden />
      </p>
      <h2 id={`${id}-title`} className="mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
