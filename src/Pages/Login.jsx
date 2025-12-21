import { Link } from "react-router";
import GoogleSignIn from "../Components/GoogleSignIn/GoogleSignIn";

const Login = () => {

  return (
    <>
    <title>Login - TicketBari</title>
      <div className="h-full mt-5 flex justify-center py-20 items-center flex-col">
        <form>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
            <h1 className="text-center font-bold text-3xl md:text-5xl text-primary pb-2">Login <br /> to <br /> TicketBari</h1>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              required
            />
            <Link to={"/reset-password"} className="text-primary font-bold py-1">
              Forgot Password
            </Link>
            <button className="btn btn-primary transition hover:btn-accent mt-4" type="submit">
              Login
            </button>
            <Link to={"/register"} className="py-2">
              Do not have an Account?{" "}
              <span className="font-bold text-primary">Register</span>
            </Link>
          </fieldset>
        </form>
        <GoogleSignIn></GoogleSignIn>
      </div>
    </>
  );
};

export default Login;
