import React from "react";
import Google from "../../assets/Google.svg";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
const GoogleSignIn = () => {
  const { googleSignIn } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleClick = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("Google User:", loggedUser);

        const userInfo = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
          });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl py-2">Or</h2>
      <button
        className="btn bg-white text-black border-[#e5e5e5]"
        onClick={handleClick}
      >
        <img src={Google} alt="" />
        Authenticate with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
