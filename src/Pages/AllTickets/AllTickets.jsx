import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const axiosInstance = useAxios();

  const { data: allTickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tickets");
      return res.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  const approvedTickets = allTickets.filter(
    (ticket) => ticket.verificationStatus === "approved"
  );
  const totalPages = Math.ceil(approvedTickets.length / ticketsPerPage);

  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = startIndex + ticketsPerPage;
  const currentTickets = approvedTickets.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-base-100 border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">All Tickets</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {currentTickets.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No approved tickets found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="join">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <input
                    key={page}
                    className={`join-item btn btn-square ${
                      currentPage === page ? "btn-active" : ""
                    }`}
                    type="radio"
                    name="pages"
                    aria-label={page.toString()}
                    checked={currentPage === page}
                    onChange={() => handlePageChange(page)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;