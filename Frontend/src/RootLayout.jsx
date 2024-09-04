import React from "react";
import Navbar from "./Components/landingpage/Navbar";
import { Outlet } from "react-router-dom";
import Header from "./Components/landingpage/Header";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
