import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LatestTicketsCard from "./LatestTicketsCard";
const LatestTickets = () => {
  const axiosInstance = useAxios();
  const { data: latestTickets = [] } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tickets/latest-tickets");
      return res.data;
    },
  });
  return (
    <div>
      <section className="py-10">
        <h2 className="md:text-4xl text-3xl font-bold text-center text-[#16A34A] mb-8">
          Latest Tickets
        </h2>
        {latestTickets.length == 0 ? (
          <h3 className="text-red-600 font-bold py-3.5 text-center text-2xl">
            We didn't find any tickets!!!
          </h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {latestTickets.map((ticket) => (
              <LatestTicketsCard
                key={ticket?._id}
                ticket={ticket}
              ></LatestTicketsCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default LatestTickets;
