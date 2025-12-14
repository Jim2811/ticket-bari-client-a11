import React from "react";

const LatestTickets = () => {
  const latestTickets = [
    {
      id: 1,
      route: "Dhaka → Rajshahi",
      price: 500,
      type: "Bus",
      image: "/bus.png",
    },
    {
      id: 2,
      route: "Dhaka → Khulna",
      price: 650,
      type: "Train",
      image: "/train.png",
    },
    {
      id: 3,
      route: "Dhaka → Sylhet",
      price: 1200,
      type: "Flight",
      image: "/plane.png",
    },
    {
      id: 4,
      route: "Dhaka → Barisal",
      price: 450,
      type: "Bus",
      image: "/bus.png",
    },
    {
      id: 5,
      route: "Dhaka → Rangpur",
      price: 700,
      type: "Train",
      image: "/train.png",
    },
    {
      id: 6,
      route: "Dhaka → Cox’s Bazar",
      price: 1500,
      type: "Flight",
      image: "/plane.png",
    },
  ];
  return (
    <div>
      <section className="py-10">
        <h2 className="md:text-4xl text-3xl font-bold text-center text-[#16A34A] mb-8">
          Latest Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {latestTickets.map((ticket) => (
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
                  <button className="btn bg-[#16A34A] text-white hover:bg-[#15803D]">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LatestTickets;
