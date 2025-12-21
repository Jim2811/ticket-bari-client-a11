import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleSignIn from "../Components/GoogleSignIn/GoogleSignIn";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, photoURL, pass } = data;

    createUser(email, pass)
      .then((r) => {
        return updateProfile(r.user, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        const userInfo = {
          name,
          email,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        axiosInstance.post("/users", userInfo).then(() => {
          Swal.fire("Success!", "Registration complete", "success");
          reset();
          navigate(from, { replace: true });
        });
      })
      .catch((err) =>
        Swal.fire("Error", err.message || "Registration failed!", "error")
      );
  };

  return (
    <>
      <title>Register - TicketBari</title>
      <div className="h-full w-11/12 mx-auto flex justify-center py-20 flex-col items-center">
        <h1 className="lg:text-4xl text-3xl text-primary font-bold mb-6">
          Register on TicketBari
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register</legend>

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm pl-1">
                {errors.name.message}
              </span>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm pl-1">
                {errors.email.message}
              </span>
            )}

            <label className="label">Photo URL</label>
            <input
              type="url"
              className="input"
              placeholder="Photo URL"
              {...register("photoURL", {
                required: "Photo URL is required",
                pattern: {
                  value:
                    /^(https?:\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w-./?%&=]*)?)$/i,
                  message: "Enter a valid URL",
                },
              })}
            />
            {errors.photoURL && (
              <span className="text-red-500 text-sm pl-1">
                {errors.photoURL.message}
              </span>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("pass", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasUpper: (value) =>
                    /[A-Z]/.test(value) ||
                    "Must contain at least one uppercase letter",
                  hasLower: (value) =>
                    /[a-z]/.test(value) ||
                    "Must contain at least one lowercase letter",
                },
              })}
            />
            {errors.pass && (
              <span className="text-red-500 text-sm pl-1">
                {errors.pass.message}
              </span>
            )}

            <button
              className="btn btn-primary hover:btn-accent mt-4"
              type="submit"
            >
              Register
            </button>

            <Link to={"/login"} className="py-2">
              Already have an Account?{" "}
              <span className="font-bold text-primary">Login</span>
            </Link>
          </fieldset>
        </form>
        <GoogleSignIn />
      </div>
    </>
  );
};

export default Register;
