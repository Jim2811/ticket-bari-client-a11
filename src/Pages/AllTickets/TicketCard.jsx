import React from "react";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const transportIcons = {
  Bus: FaBus,
  Train: FaTrain,
  Launch: FaShip,
  Plane: FaPlane,
};

const TicketCard = ({ ticket }) => {
  const TransportIcon = transportIcons[ticket.transportType] || FaBus;

  return (
    <div className="flex flex-col h-full card bg-base-100 border border-base-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
      <figure className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
        <img
          src={ticket.imageURL}
          alt={ticket.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </figure>

      <div className="card-body flex-grow flex flex-col justify-between p-6">
        <div>
          <h2 className="card-title text-base-content font-semibold line-clamp-1 mb-2">
            {ticket.title}
          </h2>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-base-content/80">
              <FaMapMarkerAlt className="text-primary" />
              {ticket.from} → {ticket.to}
            </span>
            <span className="badge bg-primary/10 text-primary capitalize flex items-center gap-1">
              <TransportIcon className="text-xs" />
              {ticket.transportType}
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-primary font-bold text-lg">
              ৳ {ticket.pricePerUnit}
              <span className="ml-1 text-sm text-base-content/60">/unit</span>
            </p>
            <p className="text-sm text-base-content/70">
              Qty: <span className="font-semibold">{ticket.quantity}</span>
            </p>
          </div>

          {ticket.perks?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3">
              {ticket.perks.slice(0, 4).map((perk, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline border-base-300 dark:border-gray-600 text-xs text-base-content/70"
                >
                  {perk}
                </span>
              ))}
            </div>
          )}

          <div className="pt-3 text-sm text-base-content/70 flex items-center gap-1">
            <FaClock />
            <span>
              {new Date(ticket.departureDateTime).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        <div className="card-actions justify-end pt-4">
          <Link
            to={`/ticket-detail/${ticket._id}`}
            className="btn btn-sm md:btn-md btn-primary text-white normal-case w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;