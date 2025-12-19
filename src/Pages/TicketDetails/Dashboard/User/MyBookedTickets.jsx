import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";

const MyBookedTickets = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState();
  const userEmail = user.email;
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", userEmail],
    queryFn: async () =>
      (await axiosInstance.get(`/bookings?email=${userEmail}`)).data,
  });

  useEffect(() => {
    if (!bookings.length) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const next = {};

      bookings.forEach((b) => {
        if (!b?.departureDateTime) return;

        const departureTime = new Date(b.departureDateTime).getTime();
        const difference = departureTime - now;

        if (difference <= 0) {
          next[b._id] = 0;
          return;
        }

        next[b._id] = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      });

      setTimeLeft(next);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  const handlePayNow = async (bookingId) => {
    await axiosInstance
      .post("/create-checkout-session", {
        bookingId,
      })
      .then((r) => (window.location.href = r.data.url))
      .catch((er) => console.log(er));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Failed to load booked tickets</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">My Booked Tickets</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">No bookings yet</h3>
            <p className="text-base-content/70">
              Go to a ticket details page and book a ticket.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div key={b?._id} className="card bg-base-100 shadow-xl">
              <figure className="h-44">
                <img
                  src={b?.imageURL || "https://i.ibb.co/placeholder/bus1.jpg"}
                  alt={b?.ticketTitle || "Ticket"}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title line-clamp-1">{b?.ticketTitle}</h3>

                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline">
                    {b?.from} → {b?.to}
                  </span>

                  <span className="badge badge-ghost capitalize">
                    {b?.status}
                  </span>
                </div>

                <div className="mt-2 text-sm space-y-1">
                  <p>
                    Booking Quantity:{" "}
                    <span className="font-semibold">{b?.bookingQuantity}</span>
                  </p>

                  <p>
                    Total Price:{" "}
                    <span className="font-semibold text-success">
                      ৳ {b?.unitPrice * b?.bookingQuantity}
                    </span>
                  </p>

                  <p>
                    Departure:{" "}
                    <span className="font-semibold">
                      {b?.departureDateTime}
                    </span>
                  </p>
                  {b?.status !== "rejected" && (
                    <p>
                      <span className="font-semibold">
                        Left for departure:{" "}
                      </span>
                      {b?.status !== "rejected" && timeLeft?.[b._id] && (
                        <p>
                          <span className="font-semibold">
                            {timeLeft[b._id].days}d {timeLeft[b._id].hours}h{" "}
                            {timeLeft[b._id].minutes}m {timeLeft[b._id].seconds}
                            s
                          </span>
                        </p>
                      )}
                    </p>
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                  {b?.status === "pending" ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePayNow(b._id)}
                    >
                      Pay Now
                    </button>
                  ) : b?.paymentStatus === "paid" ? (
                    <p className="text-primary font-bold">Paid</p>
                  ) : (
                    <p className="text-red-600 font-bold">Not Accepted</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;
