import { useState, useEffect } from "react";

import flowerGraphic from "../../assets/stickers/flower.svg";

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

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
    <section className="flex flex-col items-center justify-center w-full lg:mt-0 lg:mb-60 font-sans bg-transparent">
      
      {/* 1. Header Text */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-widest uppercase mb-10 text-center">
        BEGINS IN
      </h2>

      {/* 2. Grid for the 4 time units */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full max-w-6xl justify-items-center">
        {timeUnits.map((unit) => (
          <div 
            key={unit.label} 
            className="relative flex items-center justify-center w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] md:w-[220px] md:h-[220px]"
          >
            {/* 3. Flower Graphic Background */}
            <img 
              src={flowerGraphic} 
              alt="Flower graphic background" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />

            {/* 4. Overlay Text (Numbers + Units) */}
            <div className="relative z-10 flex flex-col items-center text-center text-white px-2">
              <span className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="font-normal text-base sm:text-lg md:text-xl capitalize mt-1">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}