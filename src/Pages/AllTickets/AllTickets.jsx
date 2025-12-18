import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const axiosInstance = useAxios();
  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tickets/latest-tickets");
      return res.data;
    },
  });
  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-base-100 border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">All Tickets</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets
            ?.filter((ticket) => ticket.verificationStatus === "approved")
            .map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
