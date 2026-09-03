import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-witcon-deep-forest px-4 py-10 text-witcon-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold">
              WiTCON 2027
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-witcon-cream/80">
              Women in Technology Conference hosted by Women in Computer
              Science at Florida International University.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold">Explore</h3>

            <nav className="mt-3 flex flex-col gap-2 text-sm">
              <Link
                to="/"
                className="transition-colors hover:text-witcon-soft-pink"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="transition-colors hover:text-witcon-soft-pink"
              >
                About
              </Link>

              <Link
                to="/registration"
                className="transition-colors hover:text-witcon-soft-pink"
              >
                Registration
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold">Connect</h3>

            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href="#"
                className="transition-colors hover:text-witcon-soft-pink"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition-colors hover:text-witcon-soft-pink"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-witcon-cream/20 pt-6 text-sm text-witcon-cream/70">
          © 2027 WiTCON. All rights reserved.
        </div>
      </div>
    </footer>
  );
}