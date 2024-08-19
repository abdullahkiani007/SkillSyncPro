import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Candidates from "./CanidateListings";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeController from "../../../../API/employer";
import Loader from "../../../Loader/Loader";
import JobCard from "./jobCard";

const JobDetails = () => <h1>Job details</h1>;
const Notes = () => <h1>Notes</h1>;
const Reports = () => <h1>Reports</h1>;

const JobListing = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      const response = await EmployeeController.getJobs(token);

      if (response.status === 200) {
        setJobData(response.data.data);
        console.log(response.data.data);
        localStorage.setItem("empJobs", JSON.stringify(response.data.data));

        setLoading(false);
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      {jobData.map((job) => {
        return <JobCard job={job} key={job._id} />;
      })}
      {/* <Outlet /> */}
    </div>
  );
};

export default JobListing;
