import { Link } from "react-router";
import ProfilePic from "../../assets/default-profile.png";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
const LogoutAndProfile = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logout} = useAuth();
  const handleLogout = () =>{
    logout()
    .then(()=> alert('Logged Out'))
  }
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="dropdown">
          <div tabIndex={0} role="button">
            <img
              src={user?.photoURL || ProfilePic}
              className="w-9 h-9 cursor-pointer rounded-full border-2 border-[#ff6f00]"
            />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow -left-48"
          >
            <div className="pl-2">
              <p>
                <span className="font-bold">Name: </span>
                <span>{user.displayName}</span>
              </p>
              <p>
                <span className="font-bold">Email: </span>{" "}
                <span>{user.email}</span>
              </p>
            </div>
            <div className="pl-2 py-2">
              <p className="font-bold">Change Theme</p>
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle"
              />
            </div>
            <Link
              className="btn btn-primary mt-3 w-full hover:bg-white hover:border-red-600 hover:text-black"
              to={'/dashboard/profile'}
            >
              My Profile
            </Link>
            <button
              className="btn btn-primary mt-3 bg-red-600 w-full hover:bg-white hover:border-red-600 hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogoutAndProfile;
