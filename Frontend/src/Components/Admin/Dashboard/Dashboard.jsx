import React from "react";
import JobPostingsChart from "../Charts/JobPostingChart";
import JobApplicationsChart from "../Charts/JobApplicationChart";
import TopCompaniesChart from "../Charts/TopCompaniesChart";
import JobseekerRegistrationsChart from "../Charts/JobSeekerRegistrationsChart";
import EmploymentTypesDistributionChart from "../Charts/EmloyementTypeDistributionChart";
import SalaryRangeDistributionChart from "../Charts/SalaryRangeDistributionChart";
import JobPostingsByLocationBarChart from "../Charts/JobPostingByLocationBarChar";
import JobPostingsByLocationMapChart from "../Charts/JobPostingByLocationMapChart";

const AdminDashboard = () => {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Job postings card */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg  font-semibold text-gray-400 mb-4">
            Job Postings Over Time
          </h2>
          <JobPostingsChart />
        </div>
        {/* job seeker registrations over time */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Jobseeker Registrations Over Time</h2>
          <JobseekerRegistrationsChart />
        </div>

        {/* Job Applications card */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg  font-semibold text-gray-400 mb-4">
            Job Applications per Job
          </h2>
          <JobApplicationsChart />
        </div>

        {/* Top companies chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Top Companies by Job Postings</h2>
          <TopCompaniesChart />
        </div>

        {/* Employment type distribution chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Employment Type Distribution</h2>
          <EmploymentTypesDistributionChart />
        </div>

        {/* Salary range distribution chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Salary Range Distribution</h2>
          <SalaryRangeDistributionChart />
        </div>

        {/* Job Locations Bar chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Job posting by Location</h2>
          <JobPostingsByLocationBarChart />
        </div>

        {/* Job locations map chart */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg mb-2">Job posting by Location</h2>
          <JobPostingsByLocationMapChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
