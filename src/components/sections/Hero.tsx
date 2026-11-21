import { Link } from 'react-router-dom';
import witconLogo from '../../assets/stickers/witcon27.svg';
import landingBackground from '../../assets/Landing_Page_Background.webp';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-6 pt-28 text-center md:items-start md:justify-center md:px-16 md:pt-16 md:text-left lg:px-24"
      style={{
        backgroundImage: `url(${landingBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <div className="relative z-10 max-w-3xl font-arima text-sm tracking-wide">

        <p className="font-the-seasons font-bold">
          Women in Computer Science at FIU
        </p>

        <img
          src={witconLogo}
          alt="WiTCON 2027"
          className="mx-auto my-2 w-66 md:mx-0 md:my-4"
        />

        <p className="leading-snug md:leading-relaxed font-arima font-bold">
          FIU's Graham Center
          <br />
          March 26th
          <br />
          9 AM - 9 PM
        </p>

        <div className="mt-6 self-center md:block">
          <Link
            className="inline-block rounded-full bg-pink px-12 py-1 font-arima text-sm tracking-wide text-white transition hover:bg-[color:var(--color-hot-pink)]"
            to="/login"
          >
            Register Now
          </Link>
        </div>

      </div>
    </section>
  );
}