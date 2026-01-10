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
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-center md:text-4xl text-3xl font-bold text-primary mb-12">
          Latest Tickets
        </h2>

        {latestTickets.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-error font-bold text-2xl">
              No tickets available right now!
            </h3>
            <p className="text-base-content/70 mt-2">
              New packages are coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestTickets.map((ticket) => (
              <LatestTicketsCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;