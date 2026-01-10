import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import AdvertisedTicketsCard from "./AdvertisedTicketsCard";

const AdvertisedTickets = () => {
  const axiosInstance = useAxios();

  const { data: advertisedTickets = [] } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tickets/advertised");
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-center md:text-4xl text-3xl font-bold text-primary mb-12">
          Admin’s Choice
        </h2>

        {advertisedTickets.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-error font-bold text-2xl">
              No advertised tickets available right now!
            </h3>
            <p className="text-base-content/70 mt-2">
              Check back later for newly approved tickets.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advertisedTickets.map((ticket) => (
              <AdvertisedTicketsCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertisedTickets;