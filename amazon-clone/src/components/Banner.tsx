"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <section className="mt-2">
      <div className="main-container">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          speed={500}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="h-full w-full"
        >
          <SwiperSlide>
            <img
              className="h-full w-full"
              src="https://i.ibb.co/wYjsN6n/banner2.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="h-full w-full"
              src="https://i.ibb.co/nbK8ChP/banner5.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
