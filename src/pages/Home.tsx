import Hero from "../components/sections/Hero";
import CountdownTimer from "../components/sections/CountdownTimer";
import Carousel from "../components/sections/Carousel";
import WhatIsWitconHome from "../components/sections/WhatIsWitconHome";
import Sponsors from "../components/sections/Sponsors";
import Faq from "../components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <CountdownTimer />
      <Carousel />
      <WhatIsWitconHome />
      <Sponsors />
      <Faq />
    </>
  );
}