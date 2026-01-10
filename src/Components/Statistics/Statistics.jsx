import React from "react";
import CountUp from "react-countup";
import { FaTicketAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import StatisticCard from "./StatisticCard";

const Statistics = () => {
  const stats = [
    { icon: FaTicketAlt, value: 50000, label: "Tickets Sold" },
    { icon: HiUserGroup, value: 1200, label: "Active Users" },
    { icon: BsBuilding, value: 200, label: "Verified Vendors" },
    { icon: MdAttachMoney, value: 420000, label: "Revenue (BDT)" },
  ];

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
          Our Growth in Numbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-items-center">
          {stats.map((item, index) => (
            <StatisticCard
              key={index}
              icon={item.icon}
              value={<CountUp end={item.value} duration={2.5} separator="," />}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;