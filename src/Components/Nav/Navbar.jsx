import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import TicketBari from "../../assets/ticketBari.png";
import useAuth from "../../Hooks/useAuth";
import LogoutAndProfile from "../LogoutAndProfile/LogoutAndProfile";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-tickets">All Tickets</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="navbar backdrop-blur-md bg-white/30 dark:bg-black/30 container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 text-base"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img src={TicketBari} alt="TicketBari Logo" className="h-10" />
            <span className="text-xl font-bold text-primary hidden sm:block">
              TicketBari
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-semibold gap-1">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <LogoutAndProfile />
            ) : (
              <Link to="/login" className="btn btn-primary text-white normal-case">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;