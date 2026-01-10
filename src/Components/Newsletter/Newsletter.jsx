import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Stay Updated!
        </h2>

        <p className="text-base-content/70 mb-10 max-w-md mx-auto">
          Subscribe to get exclusive deals, travel tips, and latest updates straight to your inbox.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed successfully! (demo)");
          }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 w-full px-5 py-3 rounded-lg border border-base-300 dark:border-gray-700 
                       bg-base-100 dark:bg-gray-800 text-base-content placeholder:text-base-content/60
                       focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 
                       text-primary-content transition-colors duration-300 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;