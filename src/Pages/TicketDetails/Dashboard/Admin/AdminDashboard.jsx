import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { RiAdvertisementFill, RiMenu3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 ${
      isActive ? "bg-primary text-white" : "hover:bg-base-300"
    }`;

  return (
    <div className="drawer min-h-screen bg-base-200">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar w-full bg-base-300">
          <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
            <RiMenu3Line />
          </label>
          <h2 className="px-4 text-xl font-bold text-primary">
            TicketBari Admin Dashboard
          </h2>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>

        <ul className="menu w-64 min-h-full bg-base-200 text-base-content p-4 space-y-1">
          <li>
            <NavLink to="/" end className={activeClass}>
              <FaHome />
              Homepage
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/admin-profile" className={activeClass}>
              <CgProfile />
              Admin Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-tickets" className={activeClass}>
              <IoTicketSharp />
              Manage Tickets
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-users" className={activeClass}>
              <FaUsersCog />
              Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/advertise-tickets" className={activeClass}>
              <RiAdvertisementFill />
              Advertise Tickets
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;