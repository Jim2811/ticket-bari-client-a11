import React from "react";
import { Link } from "react-router";

const AddedTicketCard = ({ticket}) => {
  console.log(ticket);
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
            <span className="font-bold">Departure:</span> {new Date(ticket.departureDateTime).toLocaleString()}
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
