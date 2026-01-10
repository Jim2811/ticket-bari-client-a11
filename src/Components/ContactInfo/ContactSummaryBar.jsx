import React from "react";
import { FaPhoneAlt, FaEnvelope, FaComments } from "react-icons/fa";

const ContactSummaryBar = () => {
  return (
    <footer className="bg-gradient-to-r from-base-200 via-base-100 to-base-200 
                       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                       text-base-content border-t border-base-300 
                       transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-12">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-primary mb-8 tracking-tight">
          Contact&nbsp;&amp;&nbsp;Support
        </h2>

        {/* Contact Info Row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center sm:justify-between 
                     gap-5 sm:gap-8 text-center sm:text-left"
        >
          {/* Hotline */}
          <div className="flex items-center gap-3 group">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FaPhoneAlt className="text-2xl text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-base md:text-lg leading-tight">
                Hotline
              </h4>
              <p className="text-sm md:text-base text-base-content/80">
                +880&nbsp;1736‑093199
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-base-content/20"></div>

          {/* Email */}
          <div className="flex items-center gap-3 group">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FaEnvelope className="text-2xl text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-base md:text-lg leading-tight">
                Email
              </h4>
              <p className="text-sm md:text-base text-base-content/80">
                support@ticketbari.com
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-base-content/20"></div>

          {/* Live Chat */}
          <div className="flex items-center gap-3 group">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <FaComments className="text-2xl text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-base md:text-lg leading-tight">
                Live Chat
              </h4>
              <p className="text-sm md:text-base text-base-content/80">
                24/7&nbsp;Support Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSummaryBar;