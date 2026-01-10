import React from "react";
import {
  FaPlaneDeparture,
  FaLuggageCart,
  FaMapMarkedAlt,
  FaClock,
} from "react-icons/fa";

const TravelTips = () => {
  const tips = [
    {
      icon: FaPlaneDeparture,
      title: "Arrive Early",
      text: "Reach your departure point at least 30 minutes early to avoid last‑minute stress or delays.",
    },
    {
      icon: FaLuggageCart,
      title: "Pack Smart",
      text: "Keep essentials like ID, charger, and water bottle handy. Travel light for a smoother journey.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Know Your Route",
      text: "Familiarize yourself with your travel route—check stops, timings, and nearby facilities ahead of time.",
    },
    {
      icon: FaClock,
      title: "Plan Breaks",
      text: "For longer trips, schedule short breaks to stretch, refresh, and stay energized throughout your journey.",
    },
  ];

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Helpful Travel Tips ✈️
        </h2>
        <p className="text-base-content/70 mb-12 max-w-xl mx-auto">
          A few smart habits can make every trip safer and more enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {tips.map(({ icon: Icon, title, text }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-base-100 
                         border border-base-300 dark:border-gray-700 rounded-xl p-8 
                         shadow-md hover:shadow-xl hover:-translate-y-1 
                         transition-all duration-300 w-full sm:w-64 md:w-72"
            >
              <Icon className="text-primary text-4xl mb-4" />
              <h3 className="text-lg font-semibold text-base-content mb-2">
                {title}
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTips;