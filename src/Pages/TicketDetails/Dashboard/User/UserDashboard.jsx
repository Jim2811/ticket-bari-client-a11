import { CgProfile } from "react-icons/cg";
import { FaHistory, FaHome } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router";
import DashboardOverview from "../DashboardOverview";

const UserDashboard = () => {
  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 ${isActive ? "bg-primary text-white" : ""}`;

  return (
    <div className="drawer min-h-screen bg-base-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
            <RiMenu3Line />
          </label>
          <h2 className="px-4 text-xl font-bold text-primary">
            TicketBari User Dashboard
          </h2>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <ul className="menu w-64 min-h-full bg-base-200">
          <li>
            <NavLink to="/dashboard" end className={activeClass}>
              <MdDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/" end className={activeClass}>
              <FaHome />
              Homepage
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={activeClass}>
              <CgProfile />
              User Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="my-booked-tickets" className={activeClass}>
              <IoTicketSharp />
              My Booked Tickets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/transaction-history"
              className={activeClass}
            >
              <FaHistory />
              Transaction History
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
