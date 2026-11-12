import { Link } from "react-router-dom";
import frameImg from "../../assets/stickers/frame.svg";

export default function WhatIsWitconHome() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
        
        {/* Mobile Title */}
        <h2 className="text-center font-emilys-candy text-3xl text-[color:var(--color-hot-pink)] md:hidden">
          What is WiTCON?
        </h2>

        {/* Left Column on Desktop / Middle on Mobile: Frame Image */}
        <div className="flex justify-center">
          <img
            src={frameImg}
            alt="Decorative vintage frame"
            className="w-64 sm:w-72 md:w-80 lg:w-96"
          />
        </div>

        {/* Right Column on Desktop / Bottom on Mobile: Text & CTA */}
        <div className="flex flex-col items-center md:items-start">
          {/* Desktop Title */}
          <h2 className="hidden font-emilys-candy text-4xl text-[color:var(--color-hot-pink)] md:block lg:text-5xl">
            What is WiTCON?
          </h2>

          {/* Body Copy */}
          <p className="mt-2 max-w-xs text-left font-arima text-sm leading-relaxed tracking-wide text-[color:var(--color-dark-green)] md:mt-4 md:max-w-md md:text-base">
            Women in Technology Conference (WiTCON) is FIU’s premier student-led
            conference celebrating women and underrepresented groups in tech.
            Join us for a full day of inspiring keynotes, hands-on workshops,
            networking, and career opportunities.
          </p>

          {/* Learn More Button (Desktop Only) */}
          <div className="mt-8 hidden self-center md:block">
            <Link
              className="inline-block rounded-full bg-[color:var(--color-pink)] px-12 py-2.5 font-arima text-sm tracking-wide text-white transition hover:bg-[color:var(--color-hot-pink)]"
              to="/about"
            >
              Learn more
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}