import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Notification } from "@mantine/core";

import Navbar from "./navbar/Navbar";
import Topbar from "./navbar/Topbar";
import Sidebar from "./navbar/Sidebar";
import Header from "./navbar/Header";
import Loader from "../Loader/Loader";
import SignUpForm from "../Employer/Company/Signup";
import employer from "../../API/employer";

const EmployerRoute = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joinCompany, setJoinCompany] = useState(false);
  const [allClear, setAllClear] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await employer.getCompany(token);

        if (response.status === 200) {
          const company = response.data.data;

          if (company.createdBy === user._id) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }

          if (!company.authorized) {
            setAllClear(false);
            setAlertMessage("Your company is not authorized yet");
            setAlert(true);
          } else {
            setAllClear(true);
          }
        }
      } catch (err) {
        setJoinCompany(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user._id]);

  if (loading) {
    return <Loader />;
  }

  if (alert) {
    return (
      <div className="fixed right-5 bottom-5">
        <Notification
          withBorder
          title="Notification"
          onClose={() => setAlert(false)}
        >
          {alertMessage}
        </Notification>
      </div>
    );
  }

  if (user.auth && user.role === "employer" && allClear) {
    return (
      <div className="flex h-full">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isAdmin={admin}
        />
        <div className="flex flex-col flex-1 md:ml-64">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="bg-gray-200">
            <Outlet context={{ admin, setAdmin }} />
          </div>
        </div>
      </div>
    );
  }

  if (joinCompany) {
    return <SignUpForm />;
  }

  navigate("/login/jobseeker");
  return null;
};

export default EmployerRoute;
