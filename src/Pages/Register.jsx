import React from "react";
import { Link } from "react-router";
import GoogleSignIn from "../Components/GoogleSignIn/GoogleSignIn";
const Register = () => {
  return (
    <>
      <title>Register - FinEase</title>
      <div className="h-full w-11/12 mx-auto flex justify-center py-20 flex-col items-center">
        <form>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register</legend>

            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              name="name"
              required
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
            />
            <label className="label">Photo URL</label>
            <input
              type="url"
              className="input"
              placeholder="Photo URL"
              name="photoURL"
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="pass"
              required
            />
            <button className="btn btn-accent mt-4" type="submit">
              Register
            </button>
            <Link to={"/login"} className="py-2">
              Already have an Account?{" "}
              <span className="font-bold text-primary">Login</span>
            </Link>
          </fieldset>
        </form>
        <GoogleSignIn></GoogleSignIn>
      </div>
    </>
  );
};

export default Register;
