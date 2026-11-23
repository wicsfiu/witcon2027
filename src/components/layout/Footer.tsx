import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-peach/60 bg-cream/75 px-4 py-8 text-brown backdrop-blur-lg sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {/* Brand spans both columns on mobile, 2 of 4 columns on desktop */}
          <div className="col-span-2">
            <h2 className="font-the-seasons text-xl font-bold tracking-tight text-brown sm:text-2xl">
              WiTCON 2027
            </h2>

            <p className="mt-2 max-w-sm font-arima text-xs leading-relaxed text-light-brown">
              Women in Technology Conference hosted by Women in Computer Science at Florida
              International University.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-the-seasons text-sm font-bold text-dark-green sm:text-base">
              Explore
            </h3>

            <nav className="mt-2.5 flex flex-col gap-1.5 font-arima text-xs">
              <Link
                to="/"
                className="w-fit text-brown transition-colors hover:text-hot-pink"
              >
                Home
              </Link>

              {/* <Link
                to="/our-story"
                className="w-fit text-brown transition-colors hover:text-hot-pink"
              >
                About
              </Link> */}

              <Link
                to="/registration"
                className="w-fit text-brown transition-colors hover:text-hot-pink"
              >
                Registration
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-the-seasons text-sm font-bold text-dark-green sm:text-base">
              Connect
            </h3>

            <div className="mt-2.5 flex flex-col gap-1.5 font-arima text-xs">
              <a
                href="https://instagram.com/wicsfiu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-brown transition-colors hover:text-hot-pink"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/wicsatfiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-brown transition-colors hover:text-hot-pink"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-peach/60 pt-4 text-center font-arima text-[11px] text-light-brown sm:mt-8 sm:pt-5 sm:text-left">
          © 2027 WiTCON. All rights reserved.
        </div>
      </div>
    </footer>
  );
}