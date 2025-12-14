import React from "react";
import { FaBus, FaGlobe, FaLightbulb, FaLock } from "react-icons/fa6";
import { IoPhonePortrait } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <div>
      <section className="py-12 bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-10">
            Why Choose TicketBari?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><FaBus /></div>
              <h3 className="text-xl font-semibold mb-2">
                Multiple Transport Options
              </h3>
              <p className="text-gray-600">
                Book buses, trains, flights, and ferries — all from one
                platform.
              </p>
            </div>

            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><MdElectricBolt /></div>
              <h3 className="text-xl font-semibold mb-2">
                Fast & Easy Booking
              </h3>
              <p className="text-gray-600">
                Simple interface with quick search and instant confirmation.
              </p>
            </div>

            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><FaLock /></div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Safe transactions with trusted gateways and encrypted data.
              </p>
            </div>

            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><FaLightbulb /></div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized suggestions based on your travel history.
              </p>
            </div>

            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><IoPhonePortrait /></div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Fully responsive design for booking on the go.
              </p>
            </div>

            <div className="card bg-white shadow-md p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center"><FaGlobe /></div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">
                Access routes and services across Bangladesh and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
