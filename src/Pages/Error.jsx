import React from "react";
import { Link } from "react-router-dom";
import notFount from "../assets/App-Error.png"
const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <img
        src={notFount}
        alt="Error"
        className="w-full max-w-sm mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Something went wrong
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
        We can't seem to find the page you're looking for.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
