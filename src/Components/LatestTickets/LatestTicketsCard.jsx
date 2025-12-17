import React from "react";

const LatestTicketsCard = ({ticket}) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure className="h-48">
          <img
            src={ticket?.imageURL}
            alt={ticket?.title}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title line-clamp-1">{ticket?.title}</h2>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold text-success">
                ৳ {ticket?.pricePerUnit}
              </span>
              <span className="text-base-content/60"> / unit</span>
            </p>

            <p className="text-base-content/70">
              Quantity:{" "}
              <span className="font-semibold">{ticket?.quantity}</span>
            </p>

            <p className="text-base-content/70">
              Transport:{" "}
              <span className="capitalize font-semibold">
                {ticket?.transportType}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {(ticket?.perks || []).map((perk, idx) => (
              <span key={idx} className="badge badge-outline">
                {perk}
              </span>
            ))}
          </div>

          <div className="card-actions justify-end pt-3">
            <button className="btn btn-primary">See details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestTicketsCard;
