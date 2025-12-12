import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Nav/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
