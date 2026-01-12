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
      .then((res) => {
        return updateProfile(res.user, { displayName: name, photoURL });
      })
      .then(() => {
        const userInfo = {
          name,
          email,
          role: "user",
          createdAt: new Date().toISOString(),
          isFraud: false,
        };
        axiosInstance.post("/users", userInfo).then(() => {
          Swal.fire("Success!", "Registration complete", "success");
          reset();
          navigate(from, { replace: true });
        });
      })
      .catch((err) => {
        Swal.fire("Error", err.message || "Registration failed!", "error");
      });
  };

  return (
    <>
      <title>Register - TicketBari</title>
      <section className="min-h-screen bg-base-200 flex flex-col justify-center items-center py-12 px-4">
        <div className="card bg-base-100 border border-base-300 shadow-xl p-8 w-full max-w-sm">
          <h1 className="text-center font-bold text-3xl md:text-4xl text-primary mb-6">
            Register on TicketBari
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-base-content/80 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-error text-sm">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content/80 mb-1">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-error text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content/80 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="Profile Photo URL"
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
                <span className="text-error text-sm">
                  {errors.photoURL.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content/80 mb-1">
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                {...register("pass", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) ||
                      "Must contain at least one uppercase letter",
                    hasLower: (v) =>
                      /[a-z]/.test(v) ||
                      "Must contain at least one lowercase letter",
                  },
                })}
              />
              {errors.pass && (
                <span className="text-error text-sm">{errors.pass.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 normal-case"
            >
              Register
            </button>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>

            <div className="divider my-4">or continue with</div>
            <GoogleSignIn />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;