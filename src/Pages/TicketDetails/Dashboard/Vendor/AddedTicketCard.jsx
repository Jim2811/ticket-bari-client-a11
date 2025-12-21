import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const AddedTicketCard = ({ ticket }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteTicketMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/tickets/${id}`),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your ticket has been deleted.",
        icon: "success",
      });

      queryClient.invalidateQueries(["vendorTickets"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete ticket!", "error");
    },
  });

  const handleDlt = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTicketMutation.mutate(ticket._id);
      }
    });
  };

  return (
    <>
      <div
        key={ticket._id}
        className="card bg-base-100 shadow-xl border border-base-300"
      >
        <figure className="h-76">
          <img
            src={ticket.imageURL}
            alt={ticket.title}
            className="h-full w-full object-cover rounded-t-xl"
          />
        </figure>

        <div className="card-body space-y-1">
          <h3 className="card-title text-lg line-clamp-1 mb-1">
            {ticket.title}
          </h3>

          <p className="text-sm font-medium">
            <span className="font-bold ">From: </span>
            <span>{ticket.from}</span>
          </p>
          <p className="text-sm font-medium">
            <span className="font-bold">To: </span>
            <span>{ticket.to}</span>
          </p>

          <p className="text-sm">
            <span className="font-bold">Price:</span> ৳{ticket.pricePerUnit}
          </p>
          <p className="text-sm">
            <span className="font-bold">Quantity:</span> {ticket.quantity}
          </p>
          <p className="text-sm">
            <span className="font-bold">Departure:</span>{" "}
            {new Date(ticket.departureDateTime).toLocaleString()}
          </p>

          <div className="mt-2">
            <span
              className={`badge text-black ${
                ticket.verificationStatus === "approved"
                  ? "badge-success"
                  : ticket.verificationStatus === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {ticket.verificationStatus}
            </span>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link
              to={`/dashboard/vendor/update-ticket/${ticket._id}`}
              className="btn btn-sm  btn-primary"
              disabled={ticket.verificationStatus === "rejected"}
            >
              Update
            </Link>
            <button
              className="btn btn-sm btn-error text-white"
              disabled={ticket.verificationStatus === "rejected"}
              onClick={handleDlt}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddedTicketCard;
