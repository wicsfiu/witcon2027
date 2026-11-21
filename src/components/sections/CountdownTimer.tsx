import { useState, useEffect } from "react";
import flowerGraphic from "../../assets/stickers/flower.svg";
import Header from "../text/Header";
import witcon2027 from "../../assets/witcon2027_background.webp";

const TARGET_DATE = new Date("March 26, 2027 09:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "days", value: timeLeft.days },
    { label: "hours", value: timeLeft.hours },
    { label: "minutes", value: timeLeft.minutes },
    { label: "seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center bg-transparent px-6 py-16 md:px-16 md:py-24"
      style={{
        backgroundImage: `url(${witcon2027})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
      
      <Header className="mb-10 text-center text-pink">
        Begins In
      </Header>
      {/* Header Text */}

      {/* Grid for the 4 time units */}
      <div className="grid w-full max-w-3xl grid-cols-2 justify-items-center gap-5 sm:gap-6 md:max-w-4xl md:grid-cols-4 md:gap-8">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44"
          >
            <img
              src={flowerGraphic}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
            />

            <div className="relative z-10 flex flex-col items-center px-2 text-center text-[color:var(--color-cream)]">
              <span className="font-emilys-candy text-2xl leading-none tracking-tight sm:text-3xl md:text-4xl">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-arima text-[11px] font-medium tracking-wide capitalize sm:text-xs md:text-sm">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}