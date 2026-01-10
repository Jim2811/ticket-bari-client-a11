import React from "react";
import { Link } from "react-router";

const LatestTicketsCard = ({ ticket }) => {
  return (
    <div
      key={ticket._id}
      className="card bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 
                 shadow-md hover:shadow-2xl transition-all transform duration-300 hover:-translate-y-1"
    >
      <figure className="h-52 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
        <img
          src={ticket.imageURL}
          alt={ticket.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </figure>

      <div className="card-body px-6 py-5">
        <h2 className="card-title text-lg font-semibold text-base-content line-clamp-1">
          {ticket.title}
        </h2>

        <div className="badge badge-secondary text-base-content capitalize mt-1">
          {ticket.transportType}
        </div>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-primary font-bold text-lg">
            ৳ {ticket.pricePerUnit}
            <span className="ml-1 text-sm font-medium text-base-content/60">
              /unit
            </span>
          </p>
          <p className="text-sm text-base-content/70">
            Qty: <span className="font-semibold">{ticket.quantity}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {ticket.perks?.slice(0, 4).map((perk, idx) => (
            <span
              key={idx}
              className="badge badge-outline border-base-300 dark:border-gray-600 
                         text-xs text-base-content/80"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="card-actions justify-end pt-4">
          <Link
            to={`/ticket-detail/${ticket._id}`}
            className="btn btn-primary btn-sm text-white normal-case"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestTicketsCard;