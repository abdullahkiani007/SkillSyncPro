import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Topbar from "./navbar/Topbar";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Sidebar from "./navbar/Sidebar";
import Header from "./navbar/Header";

const JobseekerRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(user.auth && user.role === "jobseeker")) {
      navigate("/login/jobseeker");
    }
  }, [user, navigate]);

  if (user.auth && user.role === "jobseeker") {
    return (
      <div className="flex h-full">
        {/* <Navbar /> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 lg:ml-64">
          {/* <Topbar /> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="py-4">
            <Outlet className="bg-gray-200 " />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default JobseekerRoutes;
