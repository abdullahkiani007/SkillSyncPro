import React, { useState, useEffect } from "react";
import { employerDashboardData } from "../../../constants/index";
import Loader from "../../Loader/Loader";
import employerController from "../../../API/employer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await employerController.getDashboard(token);
        if (response.status === 200) {
          console.log(response.data);
          setDashboardData(response.data);
          localStorage.setItem(
            "company",
            JSON.stringify(response.data.company)
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 ">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            onClick={() => {
              navigate("../company-profile");
            }}
          >
            <h2 className="text-2xl font-bold">Company Info</h2>
            <p>Name: {dashboardData.company.name}</p>
            <p>Industry: {dashboardData.company.industry}</p>
            <a
              href={dashboardData.company.website}
              target="_blank"
              className="text-green-800 text-sm"
            >
              Website: {dashboardData.company.website}
            </a>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            onClick={() => {
              navigate("../job/job-listing");
            }}
          >
            <h2 className="text-2xl font-bold">Jobs Posted</h2>
            <p>Total Jobs: {dashboardData.jobs.length}</p>
            <ul>
              {dashboardData.jobs.slice(0, 3).map((job) => (
                <li key={job._id}>{job.title}</li>
              ))}
            </ul>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Employees</h2>
            <p>Total Employees: {dashboardData.employees.length}</p>
            <ul>
              {dashboardData.employees.map((employee) => (
                <li key={employee._id}>{employee.user.name}</li>
              ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
