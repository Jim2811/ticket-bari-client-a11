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
    <>
      <section className="py-10 bg-accent">
        <h2 className="md:text-4xl text-3xl font-bold text-center text-primary mb-8">
          Admins Choice
        </h2>
        {advertisedTickets.length == 0 ? (
          <h3 className="text-red-600 font-bold py-3.5 text-center text-2xl">
            We didn't find any advertised tickets!!!
          </h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {advertisedTickets.map((ticket) => (
              <AdvertisedTicketsCard
                key={ticket?._id}
                ticket={ticket}
              ></AdvertisedTicketsCard>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AdvertisedTickets;
