import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Nav/Navbar";
import Footer from "./Footer";
import Spinner from "../Components/Spinner/Spinner";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="max-w-7xl mx-auto relative">
      <Navbar />

      {navigation.state === "loading" && (
        <Spinner></Spinner>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;