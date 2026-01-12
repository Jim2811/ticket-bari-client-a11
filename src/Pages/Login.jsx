import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleSignIn from "../Components/GoogleSignIn/GoogleSignIn";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { user, signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        Swal.fire("Success!", "You are logged in successfully", "success");
        reset();
        navigate(from, { replace: true });
      })
      .catch((err) =>
        Swal.fire("Error", err.message || "Login failed!", "error")
      );
  };

  const demoLogin = (role) => {
    let credentials = {};
    if (role === "user")
      credentials = {
        email: "userdemo@ticketbari.com",
        password: "Userdemo@ticketbari.com",
      };
    else if (role === "admin")
      credentials = {
        email: "admindemo@ticketbari.com",
        password: "Admindemo@ticketbari.com",
      };
    else if (role === "vendor")
      credentials = {
        email: "vendordemo@ticketbari.com",
        password: "Vendordemo@ticketbari.com",
      };

    signInUser(credentials.email, credentials.password)
      .then(() => {
        Swal.fire(
          "Demo Login Successful",
          `${role.charAt(0).toUpperCase() + role.slice(1)} account logged in`,
          "success"
        );
        navigate("/dashboard", { replace: true });
      })
      .catch((err) =>
        Swal.fire("Error", err.message || "Demo login failed", "error")
      );
  };

  if (user)
    return (
      <p className="text-red-600 font-bold text-xl text-center py-5">
        You are already logged in. Go to your desired page.
      </p>
    );

  return (
    <>
      <title>Login - TicketBari</title>
      <main className="min-h-screen bg-base-200 flex flex-col justify-center items-center py-10 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 border border-base-300 shadow-xl p-8 w-full max-w-sm"
        >
          <h1 className="text-center font-bold text-3xl md:text-4xl text-primary mb-6">
            Login to TicketBari
          </h1>

          <label className="label font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
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

          <label className="label font-medium mt-3">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-error text-sm">{errors.password.message}</span>
          )}

          <div className="flex justify-between items-center mt-2">
            <Link
              to="/reset-password"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary hover:btn-accent w-full mt-5 normal-case"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary font-bold">
              Register
            </Link>
          </p>

          <div className="divider my-6">or continue with</div>
          <GoogleSignIn />
          <div className="divider my-6">Demo Access</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => demoLogin("user")}
              className="btn btn-outline btn-sm sm:btn-md"
            >
              User Demo
            </button>
            <button
              type="button"
              onClick={() => demoLogin("vendor")}
              className="btn btn-outline btn-sm sm:btn-md"
            >
              Vendor Demo
            </button>
            <button
              type="button"
              onClick={() => demoLogin("admin")}
              className="btn btn-outline btn-sm sm:btn-md"
            >
              Admin Demo
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;