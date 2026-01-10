import React from "react";
import Marquee from "react-fast-marquee";
import BimanBangla from "../../assets/Partners/biman-bangla.png";
import Greenline from "../../assets/Partners/greenline.png";
import Rail from "../../assets/Partners/bangladesh-railway.png";
import Pathao from "../../assets/Partners/pathao.png";
import Uber from "../../assets/Partners/uber.png";

const Partners = () => {
  const partnerLogos = [BimanBangla, Greenline, Rail, Pathao, Uber];

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Our Partners
        </h2>

        <Marquee
          pauseOnHover
          speed={50}
          gradient={false}
          className="flex items-center"
        >
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-12 sm:mx-16"
            >
              <img
                src={logo}
                alt={`partner-${index}`}
                className="h-16 sm:h-20 opacity-80 hover:opacity-100 transition-opacity duration-300 dark:brightness-90 dark:hover:brightness-110"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;