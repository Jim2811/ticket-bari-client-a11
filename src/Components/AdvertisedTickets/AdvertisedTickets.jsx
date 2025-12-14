import React from "react";

const AdvertisedTickets = () => {
  const advertisedTickets = [
    {
      id: 1,
      route: "Dhaka → Rangpur",
      price: 550,
      image: "/bus.png",
      type: "Bus",
    },
    {
      id: 2,
      route: "Dhaka → Chittagong",
      price: 700,
      image: "/train.png",
      type: "Train",
    },
    {
      id: 3,
      route: "Dhaka → Sylhet",
      price: 1200,
      image: "/plane.png",
      type: "Flight",
    },
  ];

  return (
    <>
      <section className="py-10 bg-accent">
        <h2 className="md:text-4xl text-3xl font-bold text-center text-primary mb-8">
          Admins Choice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {advertisedTickets.map((ticket) => (
            <div key={ticket.id} className="card bg-white shadow-md">
              <figure>
                <img
                  src={ticket.image}
                  alt={ticket.route}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">{ticket.route}</h3>
                <p className="text-gray-600">Type: {ticket.type}</p>
                <p className="text-[#16A34A] font-bold">৳ {ticket.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-primary text-white hover:bg-[#15803D]">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdvertisedTickets;
