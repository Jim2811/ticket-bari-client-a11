import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaClock, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const [timeLeft, setTimeLeft] = useState();
  const { user } = useAuth();

  const { data: userData } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data[0];
    },
  });

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ["ticket-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosInstance.get(`/tickets/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!ticket?.departureDateTime) return;
    const departureTime = new Date(ticket.departureDateTime).getTime();
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
    return () => clearInterval(interval);
  }, [ticket?.departureDateTime]);

  const handleBookNow = async () => {
    const { value: quantity } = await Swal.fire({
      title: "Book Ticket",
      input: "number",
      inputLabel: "Enter ticket quantity",
      inputAttributes: { min: 1, max: ticket.quantity },
      inputValue: 1,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value || value <= 0) return "Quantity must be at least 1";
        if (value > ticket.quantity) return "Quantity exceeds available tickets";
      },
    });

    if (!quantity) return;

    try {
      await axiosInstance.post("/bookings", {
        ticketId: ticket._id,
        userEmail: user.email,
        paymentStatus: "unpaid",
        status: "pending",
        bookingQuantity: Number(quantity),
        createdAt: new Date(),
      });
      Swal.fire({ icon: "success", title: "Booking Successful", text: "Your booking is now pending" });
    } catch {
      Swal.fire({ icon: "error", title: "Booking Failed", text: "Something went wrong" });
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError || !ticket)
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center space-y-6">
        <div className="alert alert-error shadow-md w-fit">
          <span>Ticket not found</span>
        </div>
        <Link to="/all-tickets" className="btn btn-primary btn-sm">
          Back to All Tickets
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/all-tickets"
          className="btn btn-outline btn-sm mb-6 flex items-center gap-1"
        >
          <FaTicketAlt className="text-primary" /> Back to Tickets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 border border-base-300 rounded-xl shadow-md hover:shadow-lg">
              <figure className="max-h-[420px] overflow-hidden rounded-t-xl">
                <img
                  src={ticket.imageURL}
                  alt={ticket.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                  {ticket.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                  <span className="flex items-center gap-1 text-base-content/80">
                    <FaMapMarkerAlt className="text-primary" />
                    {ticket.from} → {ticket.to}
                  </span>
                  <span className="badge bg-primary/10 text-primary capitalize">
                    {ticket.transportType}
                  </span>
                </div>

                <div className="divider my-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-center">
                  <div className="p-4 rounded-xl bg-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Price per Unit</p>
                    <h3 className="text-3xl font-extrabold text-primary">
                      ৳ {ticket.pricePerUnit}
                    </h3>
                  </div>
                  <div className="p-4 rounded-xl bg-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Available Quantity</p>
                    <h3 className="text-3xl font-bold text-base-content">
                      {ticket.quantity}
                    </h3>
                    <p className="text-xs text-base-content/60 mt-1">
                      {ticket.quantity === 0 ? "Sold out" : "In stock"}
                    </p>
                  </div>
                </div>

                {ticket.perks?.length > 0 && (
                  <div className="mt-6">
                    <h2 className="font-semibold text-base-content mb-2">Perks</h2>
                    <div className="flex flex-wrap gap-2">
                      {ticket.perks.map((perk, idx) => (
                        <span
                          key={idx}
                          className="badge badge-outline border-base-300 dark:border-gray-600 text-xs text-base-content/70"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm text-base-content/70">
                  <FaClock className="text-primary" />
                  <span>
                    Departure:{" "}
                    {new Date(ticket.departureDateTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 border border-base-300 shadow-md rounded-xl sticky top-24">
              <div className="card-body">
                <h2 className="card-title text-lg font-bold text-center mb-3">
                  Booking Summary
                </h2>

                <div className="p-4 rounded-lg bg-base-200 text-center mb-5">
                  {timeLeft ? (
                    <p className="text-xl font-extrabold text-primary tracking-wide">
                      {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
                      {timeLeft.seconds}S
                    </p>
                  ) : (
                    <p className="text-xl font-extrabold text-error">00D 00H 00M 00S</p>
                  )}
                  <p className="text-xs text-base-content/60 mt-1">
                    Time left for departure
                  </p>
                </div>

                <button
                  className="btn btn-primary w-full"
                  disabled={
                    ticket.quantity === 0 ||
                    timeLeft === 0 ||
                    userData?.role === "admin" ||
                    userData?.role === "vendor"
                  }
                  onClick={handleBookNow}
                >
                  {ticket.quantity <= 0
                    ? "Sold Out"
                    : userData?.role === "admin" || userData?.role === "vendor"
                    ? "Booking not allowed"
                    : "Book Now"}
                </button>

                <p className="text-xs text-base-content/60 mt-4 text-center">
                  Booking is disabled for Admins and Vendors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;