import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../../Components/Spinner/Spinner";

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
      title: `Are you sure?`,
      text: `Do you want to ${action} this ticket?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/tickets/${id}/${action}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Ticket ${action}ed`, "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <p className="text-center text-error py-16 font-semibold">
        Failed to load tickets.
      </p>
    );

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  return (
    <div className="p-3 md:p-6 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Manage Tickets
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-2xl rounded-2xl">
        <table className="table table-zebra min-w-[1100px]">
          <thead className="bg-base-200">
            <tr className="text-sm md:text-base">
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Route</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Type</th>
              <th>Created</th>
              <th>Departure</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, idx) => (
              <tr key={t._id} className="hover text-sm md:text-base">
                <td className="font-semibold">{idx + 1}</td>

                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <img src={t.imageURL} alt={t.title} />
                    </div>
                  </div>
                </td>

                <td className="font-semibold whitespace-nowrap">
                  {t.title}
                </td>

                <td className="whitespace-nowrap">
                  {t.from} → {t.to}
                </td>

                <td>
                  <p className="font-medium">{t.vendorName || "N/A"}</p>
                  <p className="text-xs text-gray-500">
                    {t.vendorEmail}
                  </p>
                </td>

                <td>৳ {t.pricePerUnit}</td>

                <td className="capitalize">{t.transportType}</td>

                <td>{formatDate(t.createdAt)}</td>

                <td>{formatDate(t.departureDateTime)}</td>

                <td>
                  <span
                    className={`badge badge-sm md:badge-md font-bold ${
                      t.verificationStatus === "approved"
                        ? "badge-success"
                        : t.verificationStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {t.verificationStatus || "pending"}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col md:flex-row gap-2 justify-center">
                    <button
                      className="btn btn-xs md:btn-sm btn-success"
                      disabled={
                        t.verificationStatus === "approved" ||
                        t.verificationStatus === "rejected"
                      }
                      onClick={() => handleStatus(t._id, "approve")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-xs md:btn-sm btn-error"
                      disabled={
                        t.verificationStatus === "approved" ||
                        t.verificationStatus === "rejected"
                      }
                      onClick={() => handleStatus(t._id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-center py-10 text-gray-500 font-medium">
            No tickets found.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3 md:hidden">
        Swipe left ↔ to view full table
      </p>
    </div>
  );
};

export default ManageTickets;
