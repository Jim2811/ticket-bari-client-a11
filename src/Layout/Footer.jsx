import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import bkash from "../assets/bkash.png";

const Footer = () => {
  return (
    <footer className="bg-accent border-t border-base-300">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            TicketBari
          </h2>
          <p className="text-sm leading-relaxed text-black">
            Book bus, train, launch & flight tickets easily with TicketBari —
            your one-stop travel booking platform.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-black">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-tickets" className="hover:text-primary transition">
                All Tickets
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Contact Info
          </h3>
          <ul className="space-y-2 text-sm text-black">
            <li>
              📧{" "}
              <a
                href="mailto:support@ticketbari.com"
                className="hover:text-primary transition"
              >
                support@ticketbari.com
              </a>
            </li>
            <li>📞 +880-1736093199</li>
            <li>
              <a
                href="https://www.facebook.com/rukhsat.ruksathossain/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition"
              >
                <FaFacebookSquare className="text-xl text-blue-600" />
                Rukhsat Hossain
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Payment Methods
          </h3>
          <div className="flex items-center gap-4">
            <SiStripe className="text-2xl text-indigo-500" title="Stripe" />
            <img src={bkash} alt="bKash" className="h-9" />
          </div>
          <p className="text-sm text-black mt-3">
            Secure payment via Stripe & local gateways
          </p>
        </div>
      </div>

      <div className="bg-base-300 py-4 text-center text-sm text-base-500">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
