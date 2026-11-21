import { Link } from 'react-router-dom';
import witconLogo from '../../assets/stickers/witcon27.svg';
import landingBackground from '../../assets/Landing_Page_Background.webp';

export default function Hero() {
  return (
    <section
      className="@container relative flex min-h-screen flex-col md:min-h-0 md:aspect-1536/933 items-center justify-start overflow-hidden px-6 pt-12 text-center md:items-start md:justify-center md:px-16 md:pt-0 md:text-left lg:px-24"
      style={{
        backgroundImage: `url(${landingBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center-bottom',
      }}
    >
      <div className="relative z-10 max-w-3xl font-arima text-sm tracking-wide md:absolute md:left-[8%] md:top-[18%] md:w-[27%] md:max-w-none md:text-[clamp(0.75rem,1.15cqw,1.4rem)]">

        <p className="font-the-seasons font-bold">
          Women in Computer Science at FIU
        </p>

        <img
          src={witconLogo}
          alt="WiTCON 2027"
          className="mx-auto my-2 w-66 md:mx-0 md:my-[1cqw] md:w-full"
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
            className="inline-block rounded-full bg-pink px-12 py-1 md:px-[3.5cqw] md:py-[0.4cqw] md:text-[clamp(0.75rem,1.15cqw,1.4rem)]  font-arima text-sm tracking-wide text-white transition hover:bg-dark-pink"
            to="/login"
          >
            Register Now
          </Link>
        </div>

      </div>
    </section>
  );
}