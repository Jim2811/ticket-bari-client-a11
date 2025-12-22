import React from "react";
import busJourney from "../../assets/busJourney.png";
import trainJourney from "../../assets/trainJourney.png";
import planeJourney from "../../assets/planeJourney.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const Banner = () => {
  const datas = [
    {
      pic: busJourney,
      title: "Comfortable Bus Rides, with TicketBari",
    },
    {
      pic: trainJourney,
      title: "Fast & Reliable Train Tickets with TicketBari",
    },
    {
      pic: planeJourney,
      title: "Fly Smart. Book Your Flight with TicketBari",
    },
  ];
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {datas.map((data, index) => (
          <SwiperSlide key={index}>
            <section className="relative w-full h-[75vh] md:h-[75vh] overflow-hidden">
              <img
                src={data.pic}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-white text-3xl md:text-5xl font-bold">
                  {data.title}
                </h1>
                <p className="mt-4 text-white text-sm md:text-lg lg:text-xl max-w-xl drop-shadow-md">
                  Discover buses, trains, and more — all in one place.
                </p>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
