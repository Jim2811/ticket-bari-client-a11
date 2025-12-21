import React from "react";

import { Navigate, Outlet } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner/Spinner";
const PrivateRoute = () => {
  const { user, userLoading } = useAuth();
  if (userLoading) {
    return (
      <div className="min-h-screen">
        <Spinner></Spinner>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate state={{ from: location }} to="/login" replace/>;
};

export default PrivateRoute;