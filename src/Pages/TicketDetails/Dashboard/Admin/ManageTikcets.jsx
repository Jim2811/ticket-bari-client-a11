import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  const handleStatus = (id, action) => {
    Swal.fire({
      title: `Are you sure you want to ${action} this ticket?`,
      text: "This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tickets/${id}/${action}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Updated!",
                `Ticket ${action}ed successfully.`,
                "success"
              );
              refetch();
            } else {
              Swal.fire("Info", "No changes were made", "info");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status", "error");
          });
      }
    });
  };
  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-error py-16 font-semibold">
        Failed to load tickets.
      </p>
    );

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Manage Tickets
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-sm md:text-base">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th className="hidden md:table-cell">From → To</th>
              <th>Vendor Info</th>
              <th className="hidden sm:table-cell">Price (৳)</th>
              <th className="hidden sm:table-cell">Type</th>
              <th>Created At</th>
              <th>Departure Time</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, idx) => (
              <tr key={t._id} className="hover">
                <td>{idx + 1}</td>

                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <img
                        src={t.imageURL}
                        alt={t.title}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </td>

                <td className="font-semibold">{t.title}</td>

                <td className="hidden md:table-cell">
                  <span className="font-medium text-gray-700">
                    {t.from} → {t.to}
                  </span>
                </td>

                <td>
                  <p className="font-semibold text-sm md:text-base">
                    {t.vendorName || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 md:text-sm">
                    {t.vendorEmail || ""}
                  </p>
                </td>

                <td className="hidden sm:table-cell">
                  ৳{t.pricePerUnit?.toLocaleString()}
                </td>
                <td className="hidden sm:table-cell">{t.transportType}</td>

                <td className="text-sm text-gray-700">
                  {formatDate(t.createdAt)}
                </td>

                <td className="text-sm text-gray-700">
                  {formatDate(t.departureDateTime)}
                </td>

                <td>
                  <span
                    className={`badge ${
                      t.verificationStatus === "approved"
                        ? "badge-success"
                        : t.verificationStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    } text-xs md:text-sm font-bold border-none`}
                  >
                    {t.verificationStatus || "pending"}
                  </span>
                </td>

                <td className="flex flex-col sm:flex-row justify-center items-center gap-2">
                  <button
                    className="btn btn-xs md:btn-sm btn-success text-white w-full sm:w-auto"
                    disabled={t.verificationStatus === "approved" || t.verificationStatus === "rejected"}
                    onClick={()=> handleStatus(t._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs md:btn-sm btn-error text-white w-full sm:w-auto"
                    disabled={t.verificationStatus === "approved" || t.verificationStatus === "rejected"}
                    onClick={()=> handleStatus(t._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-center py-10 text-gray-500 font-medium">
            No tickets found on server.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
