import React from "react";
import { FaBus, FaGlobe, FaLightbulb, FaLock } from "react-icons/fa6";
import { IoPhonePortrait } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";

const WhyChooseUs = () => {
  const items = [
    {
      icon: FaBus,
      title: "Multiple Transport Options",
      text: "Book buses, trains, flights, and ferries — all from one platform.",
    },
    {
      icon: MdElectricBolt,
      title: "Fast & Easy Booking",
      text: "Simple interface with quick search and instant confirmation.",
    },
    {
      icon: FaLock,
      title: "Secure Payment",
      text: "Safe transactions with trusted gateways and encrypted data.",
    },
    {
      icon: FaLightbulb,
      title: "Smart Recommendations",
      text: "Get personalized suggestions based on your travel history.",
    },
    {
      icon: IoPhonePortrait,
      title: "Mobile Friendly",
      text: "Fully responsive design for booking on the go.",
    },
    {
      icon: FaGlobe,
      title: "Wide Coverage",
      text: "Access routes and services across Bangladesh and beyond.",
    },
  ];

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Why Choose TicketBari?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, text }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-base-100 dark:bg-gray-800 
                         border border-base-300 dark:border-gray-700 rounded-xl shadow-md 
                         hover:shadow-xl hover:-translate-y-[2px]
                         transition-all duration-300 p-6"
            >
              <div className="text-primary text-4xl mb-4">
                <Icon />
              </div>
              <h3 className="text-base-content text-xl font-semibold mb-2">
                {title}
              </h3>
              <p className="text-base-content/70 text-sm leading-relaxed max-w-xs">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;