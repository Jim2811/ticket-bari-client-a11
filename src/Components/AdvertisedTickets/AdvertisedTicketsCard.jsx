import React from "react";
import { Link } from "react-router";
const AdvertisedTicketsCard = ({ ticket }) => {
  return (
    <>
      <div key={ticket._id} className="card bg-base-100 shadow-xl">
        <figure className="h-48">
          <img
            src={ticket.imageURL}
            alt={ticket.title}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title line-clamp-1">{ticket.title}</h2>
          <div className="badge badge-secondary text-black capitalize">
            {ticket.transportType}
          </div>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-primary font-bold text-lg">
              ৳ {ticket.pricePerUnit}
              <span className="text-sm font-medium text-base-content/60">
                {" "}
                /unit
              </span>
            </p>
            <p className="text-sm text-base-content/70">
              Qty: <span className="font-semibold">{ticket.quantity}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {ticket.perks.slice(0, 4).map((perk, idx) => (
              <span key={idx} className="badge badge-outline">
                {perk}
              </span>
            ))}
          </div>

          <div className="card-actions justify-end pt-3">
            <Link to={`/tickets/${ticket._id}`} className="btn btn-primary">
              See details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisedTicketsCard;
