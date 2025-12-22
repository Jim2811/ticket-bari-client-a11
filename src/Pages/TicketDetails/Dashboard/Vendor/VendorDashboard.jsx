import { NavLink, Outlet } from "react-router";
import { RiMenu3Line } from "react-icons/ri";
import { IoTicketSharp } from "react-icons/io5";
import { FaChartBar, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuTicketPlus } from "react-icons/lu";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";

const VendorDashboard = () => {
  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 ${isActive ? "bg-primary text-white" : ""}`;

  return (
    <div className="drawer min-h-screen bg-base-200">
      <input id="vendor-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar bg-base-300">
          <label htmlFor="vendor-drawer" className="btn btn-square btn-ghost">
            <RiMenu3Line />
          </label>
          <h1 className="px-4 font-bold text-primary text-lg">
            TicketBari Vendor Dashboard
          </h1>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        
        <label htmlFor="vendor-drawer" className="drawer-overlay"></label>
        <ul className="menu w-64 min-h-full bg-base-200">
          <li>
            <NavLink to="/" end className={activeClass}>
              <FaHome />
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" end className={activeClass}>
              <MdDashboard />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={activeClass}>
              <CgProfile />
              Vendor Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/vendor/add-ticket" className={activeClass}>
              <LuTicketPlus />
              Add Ticket
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/vendor/my-added-tickets"
              className={activeClass}
            >
              <IoTicketSharp />
              My Added Tickets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/vendor/requested-bookings"
              className={activeClass}
            >
              <VscGitPullRequestCreate />
              Requested Bookings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/vendor/revenue-overview"
              className={activeClass}
            >
              <FaChartBar />
              Revenue Overview
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendorDashboard;
