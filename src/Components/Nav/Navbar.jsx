import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import TicketBari from "../../assets/ticketBari.png";
import useAuth from "../../Hooks/useAuth";
import LogoutAndProfile from "../LogoutAndProfile/LogoutAndProfile";
const Navbar = () => {
  const { user} = useAuth();

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div
        className="navbar backdrop-blur-md 
      bg-white/30 dark:bg-black/30 flex justify-between"
      >
        <div className="navbar-start flex">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-accent rounded-box w-52 text-[1.1rem] text-black"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/tickets">All Tickets</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            </ul>
          </div>
          <Link href="/">
            <img src={TicketBari} alt="TicketBari Logo" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[1.1rem]">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-tickets">All Tickets</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <LogoutAndProfile></LogoutAndProfile>
          ) : (
            <NavLink to="/login" className="btn btn-primary hover:btn-accent">
              Login/Register
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
