import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import bkash from "../assets/bkash.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 dark:bg-gray-900 text-base-content border-t border-base-300 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">TicketBari</h2>
          <p className="text-sm leading-relaxed text-base-content/80">
            Book buses, trains, launches & flights easily with TicketBari —  
            your one‑stop travel booking platform for Bangladesh & beyond.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-base-content">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-base-content/80">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt className="text-primary/70" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-tickets"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt className="text-primary/70" /> All Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt className="text-primary/70" /> Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt className="text-primary/70" /> About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-base-content">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm text-base-content/80">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary/70" />
              <a
                href="mailto:support@ticketbari.com"
                className="hover:text-primary transition-colors"
              >
                support@ticketbari.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary/70" /> +880 1736 093199
            </li>
            <li>
              <a
                href="https://www.facebook.com/rukhsat.ruksathossain/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaFacebookSquare className="text-blue-600 text-xl" />
                Rukhsat Hossain
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-base-content">
            Payment Methods
          </h3>
          <div className="flex items-center gap-4">
            <SiStripe className="text-2xl text-indigo-500" title="Stripe" />
            <img src={bkash} alt="bKash" className="h-9 object-contain" />
          </div>
          <p className="text-sm text-base-content/70 mt-3">
            Secure payments via Stripe & trusted local gateways.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-base-300 dark:bg-gray-800 py-5 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;