import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaFilter, FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaSearchLocation, FaSortAmountDownAlt } from "react-icons/fa";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const axiosInstance = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

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
        searchFrom
          ? t.from?.toLowerCase().includes(searchFrom.toLowerCase())
          : true
      )
      .filter((t) =>
        searchTo
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
    <main className="min-h-screen bg-base-200 dark:bg-gray-900 text-base-content transition-colors duration-500">
      <header className="bg-base-100 border-b border-base-300">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            All Tickets
          </h1>
          <p className="text-base-content/70 text-sm mt-1 flex items-center gap-2">
            <FaArrowRightArrowLeft className="text-primary" />
            Search & filter tickets by origin, destination and price.
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        {/* Mobile */}
        <div className="block lg:hidden mb-6">
          <details className="dropdown w-full">
            <summary className="btn btn-outline w-full flex items-center justify-center gap-2">
              <FaFilter /> Filter Tickets
            </summary>
            <div className="dropdown-content mt-3 bg-base-100 rounded-xl shadow-lg p-4 w-full space-y-4">
              <div className="flex items-center gap-2">
                <FaSearchLocation className="text-primary" />
                <input
                  type="text"
                  placeholder="From"
                  className="input input-bordered w-full"
                  value={searchFrom}
                  onChange={(e) => {
                    setSearchFrom(e.target.value);
                    resetToFirstPage();
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <FaSearchLocation className="text-primary" />
                <input
                  type="text"
                  placeholder="To"
                  className="input input-bordered w-full"
                  value={searchTo}
                  onChange={(e) => {
                    setSearchTo(e.target.value);
                    resetToFirstPage();
                  }}
                />
              </div>

              <select
                className="select select-bordered w-full"
                value={transportFilter}
                onChange={(e) => {
                  setTransportFilter(e.target.value);
                  resetToFirstPage();
                }}
              >
                <option value="all">All Transport</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>

              <div className="flex items-center gap-2">
                <FaSortAmountDownAlt className="text-primary" />
                <select
                  className="select select-bordered w-full"
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    resetToFirstPage();
                  }}
                >
                  <option value="default">Default Sort</option>
                  <option value="low">Price: Low → High</option>
                  <option value="high">Price: High → Low</option>
                </select>
              </div>
            </div>
          </details>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block bg-base-100 border border-base-300 rounded-xl shadow-sm p-5 mb-8">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaSearchLocation className="text-primary" />
              <input
                type="text"
                placeholder="From"
                className="input input-bordered w-full"
                value={searchFrom}
                onChange={(e) => {
                  setSearchFrom(e.target.value);
                  resetToFirstPage();
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <FaSearchLocation className="text-primary" />
              <input
                type="text"
                placeholder="To"
                className="input input-bordered w-full"
                value={searchTo}
                onChange={(e) => {
                  setSearchTo(e.target.value);
                  resetToFirstPage();
                }}
              />
            </div>

            <select
              className="select select-bordered w-full"
              value={transportFilter}
              onChange={(e) => {
                setTransportFilter(e.target.value);
                resetToFirstPage();
              }}
            >
              <option value="all">All Transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>

            <div className="flex items-center gap-2">
              <FaSortAmountDownAlt className="text-primary" />
              <select
                className="select select-bordered w-full"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  resetToFirstPage();
                }}
              >
                <option value="default">Default Sort</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Grid + Pagination */}
      <section className="container mx-auto px-4 pb-16">
        {currentTickets.length === 0 ? (
          <p className="text-center text-base-content/70 py-20 text-lg font-medium">
            No tickets found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <input
                    key={page}
                    className={`join-item btn btn-sm md:btn-md ${
                      currentPage === page
                        ? "btn-primary text-white"
                        : "hover:btn-outline"
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
      </section>
    </main>
  );
};

export default AllTickets;