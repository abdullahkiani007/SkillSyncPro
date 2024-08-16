import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("empJobs"));
    setDetail(jobs.filter((item) => item._id == id)[0]);
    console.log(detail);
  }, []);

  console.log("params received", params.id);
  return (
    <div className="flex flex-col px-10 pt-10">
      <div>
        <Button
          onClick={() => {
            navigate("../job/job-listing");
          }}
          variant="contained"
          color="primary"
          className="mt-4"
          startIcon={<ArrowBackIosIcon />}
        >
          Back to Jobs
        </Button>
      </div>
      <div>
        <h1 className="font-bold mt-4 text-secondary-dark text-3xl">
          {detail.title}
        </h1>
        <h2 className="text-sm mt-2 text-gray-500">{detail.location}</h2>
      </div>
      <nav className="flex mb-4">
        <Link
          to="./"
          className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
        >
          Candidates
        </Link>
        <Link
          to="./jobdetails"
          className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
        >
          Job Details
        </Link>
        <Link
          to="./notes"
          className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
        >
          Notes
        </Link>
        <Link
          to="./reports"
          className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
        >
          Reports
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default JobDetails;
