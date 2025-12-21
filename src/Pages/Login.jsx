import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleSignIn from "../Components/GoogleSignIn/GoogleSignIn";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
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
      .catch((err) => {
        Swal.fire("Error", err.message || "Login failed!", "error");
      });
  };

  return (
    <>
      <title>Login - TicketBari</title>
      <div className="h-full mt-5 flex justify-center py-20 items-center flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
            <h1 className="text-center font-bold text-3xl md:text-5xl text-primary pb-2">
              Login <br /> to <br /> TicketBari
            </h1>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid Email Address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm pl-1">
                {errors.email.message}
              </span>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm pl-1">
                {errors.password.message}
              </span>
            )}

            <Link
              to={"/reset-password"}
              className="text-primary font-bold py-1"
            >
              Forgot Password
            </Link>

            <button
              className="btn btn-primary transition hover:btn-accent mt-4"
              type="submit"
            >
              Login
            </button>

            <Link to={"/register"} className="py-2">
              Do not have an Account?{" "}
              <span className="font-bold text-primary">Register</span>
            </Link>
          </fieldset>
        </form>

        <GoogleSignIn />
      </div>
    </>
  );
};

export default Login;