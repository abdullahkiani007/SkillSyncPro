import React, { useState, useEffect } from "react";
import JobSeekerController from "../../../API/jobseeker";
import JobCard from "./JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    designer: "all",
    location: "all",
    experience: "all",
    salary: "all",
    salaryRange: 20000,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await JobSeekerController.getJobs();
        console.log(data.jobs);
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // useEffect(() => {
  //   filterJobs();
  // }, [filters, jobs]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (filters.designer !== "all") {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(filters.designer)
      );
    }

    if (filters.location !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location)
      );
    }

    if (filters.experience !== "all") {
      filtered = filtered.filter((job) =>
        job.level.toLowerCase().includes(filters.experience)
      );
    }

    if (filters.salary !== "all") {
      const [minSalary, maxSalary] = filters.salary.split("-");
      filtered = filtered.filter((job) => {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ""));
        return salary >= minSalary && salary <= maxSalary;
      });
    }

    if (filters.salaryRange) {
      filtered = filtered.filter((job) => {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ""));
        return salary <= filters.salaryRange;
      });
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="font-sans flex flex-col min-h-screen bg-gray-100">
      <div className="p-5">
        <div className="flex space-x-5 mb-5">
          <div className="flex flex-col space-y-2">
            <label className="font-bold" htmlFor="designer">
              Designer
            </label>
            <select
              id="designer"
              className="p-2 border border-gray-300 rounded"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="ui/ux">UI/UX</option>
              <option value="graphic">Graphic</option>
              <option value="motion">Motion</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold" htmlFor="location">
              Work location
            </label>
            <select
              id="location"
              className="p-2 border border-gray-300 rounded"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="san-francisco">San Francisco</option>
              <option value="new-york">New York</option>
              <option value="california">California</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold" htmlFor="experience">
              Experience
            </label>
            <select
              id="experience"
              className="p-2 border border-gray-300 rounded"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold" htmlFor="salary">
              Per month
            </label>
            <select
              id="salary"
              className="p-2 border border-gray-300 rounded"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="1200-2000">1,200 - 2,000</option>
              <option value="2000-3000">2,000 - 3,000</option>
              <option value="3000-4000">3,000 - 4,000</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold" htmlFor="salaryRange">
              Salary range
            </label>
            <input
              type="range"
              id="salaryRange"
              min="1200"
              max="20000"
              className="p-2 border border-gray-300 rounded"
              onChange={handleFilterChange}
              value={filters.salaryRange}
            />
            <span>{filters.salaryRange}</span>
          </div>
        </div>
        <div className="p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <div className="text-xl font-bold">Recommended jobs</div>
            <div className="text-lg font-bold">{filteredJobs.length}</div>
            <div className="flex space-x-2 items-center">
              <label htmlFor="sort" className="font-semibold">
                Sort by:
              </label>
              <select id="sort" className="p-2 border border-gray-300 rounded">
                <option value="last-updated">Last updated</option>
                <option value="salary">Salary</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-around">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} {...job} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5 space-x-5">
          <button className="py-2 px-4 border rounded border-gray-300 text-gray-600">
            1
          </button>
          <button className="py-2 px-4 border rounded border-gray-300 text-gray-600">
            2
          </button>
          <button className="py-2 px-4 border rounded border-gray-300 text-gray-600">
            3
          </button>
          <button className="py-2 px-4 border rounded border-gray-300 text-gray-600">
            4
          </button>
          <button className="py-2 px-4 border rounded border-gray-300 text-gray-600">
            ...
          </button>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
