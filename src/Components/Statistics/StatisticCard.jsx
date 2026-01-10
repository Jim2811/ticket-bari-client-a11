import React from "react";

const StatisticCard = ({ icon: Icon, value, label }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-base-100
                 border border-base-300 dark:border-gray-700 rounded-xl 
                 shadow-md hover:shadow-lg hover:-translate-y-[2px]
                 w-60 sm:w-64 md:w-72 h-48 sm:h-52 p-6
                 transition-all duration-300"
    >
      <div className="text-primary mb-2 text-4xl">
        <Icon />
      </div>
      <p className="text-3xl font-extrabold text-base-content">{value}</p>
      <p className="text-base-content/70 mt-1 text-sm sm:text-base font-medium uppercase tracking-wide text-center">
        {label}
      </p>
    </div>
  );
};

export default StatisticCard;