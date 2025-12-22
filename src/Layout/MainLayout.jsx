import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Nav/Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default MainLayout;
