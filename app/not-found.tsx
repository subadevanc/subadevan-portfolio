import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-dvh flex-col justify-center py-24">
      <p className="label">
        <span className="text-accent">HTTP 404</span> · resource not found
      </p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
        Nothing to see here<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">
        This path doesn&rsquo;t exist. Directory brute-forcing won&rsquo;t help either; there&rsquo;s only one page.
      </p>
      <p className="mt-8 font-mono text-sm text-term">~ $ cd /</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-12 w-fit items-center bg-accent px-6 font-mono text-sm font-semibold text-bg transition-colors hover:bg-fg"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
