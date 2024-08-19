// components/JobFilter.js
import React, { useState } from "react";

const JobFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    requirements: "",
    company: "",
    location: "",
    salaryRange: "",
    employmentType: "",
    applicants: "",
  });

  const handleChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <form>
      <input
        type="text"
        name="requirements"
        value={filters.requirements}
        onChange={handleChange}
        placeholder="Requirements"
      />
      <input
        type="text"
        name="company"
        value={filters.company}
        onChange={handleChange}
        placeholder="Company"
      />
      <input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="text"
        name="salaryRange"
        value={filters.salaryRange}
        onChange={handleChange}
        placeholder="Salary Range"
      />
      <select
        name="employmentType"
        value={filters.employmentType}
        onChange={handleChange}
      >
        <option value="">Employment Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <input
        type="text"
        name="applicants"
        value={filters.applicants}
        onChange={handleChange}
        placeholder="Applicants"
      />
    </form>
  );
};

export default JobFilter;
