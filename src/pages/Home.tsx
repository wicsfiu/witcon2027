import Hero from "../components/sections/Hero";
import CountdownTimer from "../components/sections/CountdownTimer";
import WhatIsWitconHome from "../components/sections/WhatIsWitconHome";
import Stats from "../components/sections/Stats";
import Sponsors from "../components/sections/Sponsors";
import Faq from "../components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <CountdownTimer />
      <WhatIsWitconHome />
      <Stats />
      <Sponsors />
      <Faq />
    </>
  );
}