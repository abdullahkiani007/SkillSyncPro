import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Topbar from "./navbar/Topbar";
import Sidebar from "./navbar/Sidebar";
import Header from "./navbar/Header";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import SignUpForm from "../Employer/Company/Signup";
import { useState } from "react";

const EmployerRoute = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // return <SignUpForm/>
  if (user.auth && user.role === "employer") {
    return (
      <div className="flex h-full ">
        {/* <Navbar />
         */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-col flex-1 md:ml-64 ">
          {/* <Topbar /> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="">
            <Outlet className="bg-gray-200 " />
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/login/jobseeker");
    return null;
  }
};

export default EmployerRoute;
