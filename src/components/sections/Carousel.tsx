import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow, Autoplay } from "swiper/modules";

// Relative path to your image files in src/assets/
import pic2 from "../../assets/carousel/pic2.svg";

// Creates an array of 7 items using pic2
const slides = Array.from({ length: 7 }, () => pic2);

export default function Carousel() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-12 lg:my-16">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slideToClickedSlide={true}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2000,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 40,
          depth: 200,
          scale: 0.85,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-full h-[30vh] lg:h-[80%]"
        breakpoints={{
          0: { slidesPerView: 1.1 },
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index} className="overflow-hidden comic-imager">
            <img 
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}