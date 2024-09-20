import React, { useState, useEffect } from "react";
import { Outlet, useParams , useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import Employer from "../../../API/employer";
import Loader from "../../Loader/Loader";


const JobDetails = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [candidatesList, setCandidatesList] = useState([]);




  const id = params.id;
  const [detail, setDetail] = useState([]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await Employer.deleteJob(token, id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await Employer.archiveJob(token, id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("empJobs"));

    const job = jobs.find((job) => job._id === id);
    if (job === undefined) {
      try{
        async function fetchJob() {
          const token = localStorage.getItem("accessToken");
          const response = await Employer.getJobDetails(token, id);
          console.log("job details", response.data);

          setDetail(response.data);
          setLoading(false);
        }
        fetchJob();
      } catch (error) {
        console.log(error);
      }
    }
    setDetail(job);
    console.log("job details" , detail);
  }, []);

  useEffect(() => {
    async function fetchCandidates() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await Employer.getCandidatesByJobId(token, id);
        console.log(response);
        console.log("candidates list", response.data);
        setCandidatesList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCandidates();
  },[])



  console.log("params received", params.id);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col px-10 pt-10">
      <div className="flex justify-between">
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

        <div className="space-x-7">
          <Button
            variant="outlined"
            color="primary"
            className="mt-4"
            onClick={() => {
              handleArchive(id);
            }}
          >
            Archive
          </Button>

          <Button variant="outlined" color="error" className="mt-4">
            delete
          </Button>
        </div>
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
      <Outlet context={{ candidatesList , detail }} />
      
    </div>
  );
};

export default JobDetails;
