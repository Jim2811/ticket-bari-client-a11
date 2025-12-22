import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const [timeLeft, setTimeLeft] = useState();
  const { user } = useAuth();
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

  useEffect(() => {
    if (!ticket || !ticket.departureDateTime) return;
    const departureTime = new Date(ticket?.departureDateTime).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = departureTime - now;
      if (difference <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
  }, [ticket?.departureDateTime]);

  const handleBookNow = async () => {
    const { value: quantity } = await Swal.fire({
      title: "Book Ticket",
      input: "number",
      inputLabel: "Enter ticket quantity",
      inputAttributes: {
        min: 1,
        max: ticket.quantity,
      },
      inputValue: 1,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return "Quantity must be at least 1";
        }
        if (value > ticket.quantity) {
          return "Quantity exceeds available tickets";
        }
      },
    });

    if (!quantity) return;

    try {
      await axiosInstance
        .post("/bookings", {
          ticketId: ticket._id,
          userEmail: user.email,
          paymentStatus: "unpaid",
          status: "pending",
          bookingQuantity: Number(quantity),
          createdAt: new Date(),
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Booking Successful",
            text: "Your booking is now pending",
          });
        });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong",
      });
    }
  };

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
                  {new Date(ticket.departureDateTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl lg:sticky lg:top-24">
              <div className="card-body">
                <h2 className="card-title">Book This Ticket</h2>

                <div className="p-4 rounded-lg bg-base-200">
                  {timeLeft ? (
                    <p className="text-xl font-extrabold text-primary">
                      {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
                      {timeLeft.seconds}S
                    </p>
                  ) : (
                    <p className="text-xl font-extrabold text-red-500">
                      00D 00H 00M 00S
                    </p>
                  )}
                  <p className="text-sm text-base-content/70">
                    Left for departure
                  </p>
                </div>

                <div className="card-actions mt-5">
                  <button
                    className={`btn btn-primary w-full`}
                    disabled={timeLeft == 0 || ticket.quantity == 0}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
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
