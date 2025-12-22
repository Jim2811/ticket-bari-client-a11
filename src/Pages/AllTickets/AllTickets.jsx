import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const axiosInstance = useAxios();

  // ✅ local UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default"); // "low" / "high"
  const ticketsPerPage = 6;

  const { data: allTickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tickets");
      return res.data;
    },
  });

  const filteredTickets = useMemo(() => {
  return allTickets
    .filter((t) => t.verificationStatus === "approved")
    .filter((t) =>
      searchFrom.trim()
        ? t.from?.toLowerCase().includes(searchFrom.toLowerCase())
        : true
    )
    .filter((t) =>
      searchTo.trim()
        ? t.to?.toLowerCase().includes(searchTo.toLowerCase())
        : true
    )
    .filter((t) =>
      transportFilter === "all"
        ? true
        : t.transportType?.toLowerCase() === transportFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.pricePerUnit - b.pricePerUnit;
      if (sortOrder === "high") return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });
}, [allTickets, searchFrom, searchTo, transportFilter, sortOrder]);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-base-100 border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">All Tickets</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="From..."
            className="input input-bordered input-sm w-36 md:w-48"
            value={searchFrom}
            onChange={(e) => {
              setSearchFrom(e.target.value);
              resetToFirstPage();
            }}
          />
          <input
            type="text"
            placeholder="To..."
            className="input input-bordered input-sm w-36 md:w-48"
            value={searchTo}
            onChange={(e) => {
              setSearchTo(e.target.value);
              resetToFirstPage();
            }}
          />

          <select
            className="select select-bordered select-sm w-36 md:w-40"
            value={transportFilter}
            onChange={(e) => {
              setTransportFilter(e.target.value);
              resetToFirstPage();
            }}
          >
            <option value="all">All Types</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Launch">Launch</option>
            <option value="Plane">Plane</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-sm">Sort by:</label>
          <select
            className="select select-bordered select-sm w-40"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              resetToFirstPage();
            }}
          >
            <option value="default">Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {currentTickets.length === 0 ? (
          <p className="text-center text-gray-500 py-12 font-medium">
            No tickets found!
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