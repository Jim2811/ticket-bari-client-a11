import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const VendorRequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["vendorBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/bookings?vendorEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-20 font-semibold">Loading bookings...</p>;

  if (!bookings.length)
    return <p className="text-center py-20">No booking requests yet.</p>;

  return (
    <section className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center md:text-left">
        Requested Bookings
      </h2>

      <div className="overflow-x-auto border border-base-300 rounded-xl">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th>Total Price (৳)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id} className="hover">
                <th>{index + 1}</th>
                <td>{b.userEmail}</td>
                <td>{b.title}</td>
                <td>{b.bookingQuantity}</td>
                <td>{b.totalPrice}</td>
                <td>
                  <span
                    className={`badge ${
                      b.status === "pending"
                        ? "badge-warning"
                        : b.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-success">
                    Accept
                  </button>
                  <button className="btn btn-xs btn-error text-white" >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VendorRequestedBookings;