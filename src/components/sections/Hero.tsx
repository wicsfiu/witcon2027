import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import witconLogo from '../../assets/stickers/witcon27.svg';
import landingBackground from '../../assets/Landing_Page_Background.webp';
import landingMobileBackground from '../../assets/Landing_Page_Mobile.png';

export default function Hero() {
  const heroStyles = {
    '--bg-mobile': `url(${landingMobileBackground})`,
    '--bg-desktop': `url(${landingBackground})`,
  } as CSSProperties;

  return (
    <section
      className="@container relative flex w-full aspect-9/16 md:aspect-1536/933 flex-col items-center justify-start overflow-hidden bg-cover bg-bottom bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)] px-6 pt-12 text-center md:px-14 md:pt-0 lg:px-24"
      style={heroStyles}
    >
      <div className="relative z-10 max-w-2xl font-arima text-xs tracking-wide text-white md:text-inherit md:absolute md:left-[8%] md:top-[18%] md:w-[27%] md:max-w-none md:text-center md:text-[clamp(0.7rem,1cqw,1.2rem)]">
        <p className="font-the-seasons font-bold leading-tight">
          Women in Computer Science at FIU
        </p>

        <img
          src={witconLogo}
          alt="WiTCON 2027"
          className="mx-auto my-2 w-58 md:my-[0.75cqw] md:w-[75%]"
        />

        <p className="leading-snug md:leading-tight font-arima font-bold">
          FIU's Graham Center
          <br />
          March 26th
          <br />
          9 AM - 9 PM
        </p>

        <div className="mt-6 md:mt-[1cqw] flex justify-center">
          <Link
            className="inline-block rounded-full bg-pink px-12 py-1 md:px-[3.5cqw] md:py-[0.4cqw] md:text-[clamp(0.7rem,1cqw,1.2rem)] font-arima text-sm tracking-wide text-white transition hover:bg-dark-pink"
            to="/login"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}