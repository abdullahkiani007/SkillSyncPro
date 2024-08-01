import React, { useState, useEffect } from 'react';
import {employerDashboardData} from '../../../constants/index';
import Loader from '../../Loader/Loader';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDashboardData(employerDashboardData);
      setLoading(false);
    }, 1000); // Simulate a delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 ">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Company Info</h2>
            <p>Name: {dashboardData.company.name}</p>
            <p>Industry: {dashboardData.company.industry}</p>
            <p>Website: {dashboardData.company.website}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Jobs Posted</h2>
            <p>Total Jobs: {dashboardData.jobs.length}</p>
            <ul>
              {dashboardData.jobs.map((job) => (
                <li key={job._id}>{job.title}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Employees</h2>
            <p>Total Employees: {dashboardData.employees.length}</p>
            <ul>
              {dashboardData.employees.map((employee) => (
                <li key={employee._id}>{employee.user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
