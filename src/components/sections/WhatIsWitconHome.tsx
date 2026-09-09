import { Link } from "react-router-dom";

export default function WhatIsWitconHome() {
  return (
    <section className="bg-witcon-cream px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:gap-16">
        
        {/* Decorative frame */}
        <div className="order-1 flex justify-center md:justify-start">
          <div className="relative flex h-64 w-52 items-center justify-center sm:h-72 sm:w-60">
            
            {/* Image / visual */}
        <div className="order-2">
          <div className="relative overflow-hidden rounded-3xl border border-witcon-deep-forest/10 bg-witcon-sage/20 p-3 shadow-sm">
            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-witcon-sage/30 sm:min-h-80">
              <p className="font-display text-2xl font-semibold text-witcon-deep-forest/60">
                WiTCON
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-2 text-center md:text-left">
          <h2 className="font-display text-3xl font-semibold text-witcon-deep-forest sm:text-4xl">
            What is WiTCON?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-witcon-deep-forest/75 sm:text-base md:mx-0">
            WiTCON is the signature Women in Technology Conference at
            Florida International University. Join us for a day of learning,
            networking, and connecting with students and professionals in
            technology.
          </p>

          <Link
            to="/about"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-witcon-pink px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-witcon-pink focus:ring-offset-2"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}