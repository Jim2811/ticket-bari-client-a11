import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket-details", id],
    enabled: !!id,
    queryFn: async () => {
      const rest = await axiosInstance.get(`/tickets/${id}`);
      return rest.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-10">
          <div className="alert alert-error">
            <span>Ticket not found </span>
          </div>
          <div className="mt-4">
            <Link to="/all-tickets" className="btn btn-primary btn-sm">
              Back to All Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <Link to="/all-tickets" className="btn btn-ghost btn-sm mb-4">
          ← Back to All Tickets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <figure className="max-h-100">
                <img
                  src={ticket.imageURL}
                  alt={ticket.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {ticket.title}
                </h1>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline">
                    {ticket.from} → {ticket.to}
                  </span>
                  <span className="badge badge-ghost capitalize">
                    {ticket.transportType}
                  </span>
                </div>

                <div className="divider my-3"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="stats bg-base-200 shadow">
                    <div className="stat">
                      <div className="stat-title">Price</div>
                      <div className="stat-value text-success text-2xl">
                        ৳ {ticket.pricePerUnit}
                      </div>
                      <div className="stat-desc">per unit</div>
                    </div>
                  </div>

                  <div className="stats bg-base-200 shadow">
                    <div className="stat">
                      <div className="stat-title">Available Quantity</div>
                      <div className="stat-value text-2xl">
                        {ticket.quantity}
                      </div>
                      <div className="stat-desc">
                        {ticket.quantity == 0 ? "Sold out" : "In stock"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="font-semibold mb-2">Perks</h2>
                  <div className="flex flex-wrap gap-2">
                    {(ticket.perks || []).map((perk, idx) => (
                      <span key={idx} className="badge badge-outline">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm text-base-content/70">
                  <span className="font-semibold">Departure:</span>{" "}
                  {ticket.departureDateTime}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl lg:sticky lg:top-24">
              <div className="card-body">
                <h2 className="card-title">Book This Ticket</h2>

                <div className="p-4 rounded-lg bg-base-200">
                  <p className="text-xl font-bold">00:00:00</p>
                  <p className="text-sm text-base-content/70">
                    Left for departure
                  </p>
                </div>

                <div className="card-actions mt-5">
                  <button className="btn btn-primary w-full">Book Now</button>
                </div>

                <p className="text-xs text-base-content/60 mt-2"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
