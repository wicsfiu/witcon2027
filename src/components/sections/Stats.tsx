// Replace with your final illustrated frame + colibri asset path once ready
// import statsFrame from "../../assets/stickers/statsFrame.svg";

export default function Stats() {
  const topStats = [
    { value: "500+", label: "Attendees" },
    { value: "700+", label: "Resumes submitted" },
    { value: "913", label: "Registrations" },
  ];

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-16 md:px-12 md:py-24">
      {/* Desktop Heading (Hidden on Mobile) */}
      <h2 className="mb-6 hidden text-center font-emilys-candy text-3xl text-[color:var(--color-hot-pink)] md:block lg:text-4xl">
        Statistics
      </h2>

      {/* Wrapper for your future Colibri + Frame Asset */}
      <div className="relative flex w-full max-w-2xl flex-col items-center">
        {/* Future Asset Layer */}
        {/* <img src={statsFrame} alt="" aria-hidden="true" className="w-full h-auto pointer-events-none select-none" /> */}

        {/* Main Inner Stats Container */}
        <div className="w-full px-6 py-8 sm:px-12 md:px-16 md:py-12">
          
          {/* Top Half: Stacked Stats */}
          <div className="flex flex-col items-center space-y-3 text-center sm:space-y-4 md:items-start md:text-left">
            {topStats.map((stat) => (
              <p
                key={stat.label}
                className="font-arima text-sm tracking-wide text-[color:var(--color-dark-green)] sm:text-base md:text-lg"
              >
                <span className="mr-2 font-semibold">{stat.value}</span>
                <span>{stat.label}</span>
              </p>
            ))}
          </div>

          {/* Bottom Half: 2-Column Stats */}
          <div className="mt-8 grid grid-cols-2 items-center gap-6 text-center sm:mt-10 md:mt-12 md:gap-10">
            
            {/* Bottom Left: 70% Women Attendees */}
            <div>
              <p className="font-arima text-sm leading-snug tracking-wide text-[color:var(--color-dark-green)] sm:text-base md:text-lg">
                <span className="block font-semibold">70%</span>
                Women
                <br />
                attendees
              </p>
            </div>

            {/* Bottom Right: 14 Florida Institutions */}
            <div>
              <p className="font-arima text-sm leading-snug tracking-wide text-[color:var(--color-dark-green)] sm:text-base md:text-lg">
                <span className="block font-semibold">14</span>
                Florida Institutions
                <br />
                represented
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}