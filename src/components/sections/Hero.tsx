import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="relative z-10 max-w-3xl">
        <p className="font-[var(--font-body)] text-sm tracking-wide text-[color:var(--color-forest)]/70">
          Women in Computer Science at FIU
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-5xl font-semibold leading-tight text-[color:var(--color-forest)] sm:text-6xl lg:text-7xl">
          WiTCON 2027
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[color:var(--color-forest)]/80">
          FIU’s Graham Center
          <br />
          March 26th
          <br />
          9 AM - 9 PM
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/registration"
            className="rounded-full bg-[color:var(--color-blossom-deep)] px-6 py-3 font-medium text-color:var(--color-forest) transition hover:bg-[color:var(--color-blossom)]"
          >
            Register for WiTCON
          </Link>
          <a
            href="#about"
            className="rounded-full border border-[color:var(--color-forest)]/30 px-6 py-3 font-medium text-[color:var(--color-forest)] transition hover:bg-[color:var(--color-forest)]/5"
          >
            Learn more
          </a>
        </div>
      </div>

    </section>
  );
}