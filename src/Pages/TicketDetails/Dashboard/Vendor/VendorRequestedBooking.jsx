import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../../Components/Spinner/Spinner"

const VendorRequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["vendorBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor/bookings?vendorEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleStatus = (id, action) => {
    Swal.fire({
      title: `Are you sure to ${action} this booking?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/bookings/${id}/${action}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Success!",
              `Booking ${action}ed successfully`,
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <Spinner></Spinner>
    );

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
                        : b.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleStatus(b._id, "accept")}
                    className="btn btn-xs btn-success"
                    disabled={b.status !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatus(b._id, "reject")}
                    className="btn btn-xs btn-error text-white"
                    disabled={b.status !== "pending"}
                  >
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