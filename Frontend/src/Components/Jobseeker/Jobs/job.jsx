import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import companyLogo from "../../../assets/companyLogo.png";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobPerformanceTracker from "../../../API/JobPerfomanceTracker";
import Loader from "../../Loader/Loader";

const Job = () => {
  const id = window.location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(id);
  const [job, setJob] = useState({});
  const [applied, setApplied] = useState(false);
  const user = useSelector((state) => state.user);
  // console.log(
  //   jobDetails.applicants.filter((applicant) => applicant._id === user._id)
  // );
  // if (jobDetails.applicants.find((applicant) => applicant._id === user._id)) {
  //   setApplied(true);
  // }

  useEffect(() => {
    async function handlView() {
      try {
        await JobPerformanceTracker.trackJobView(id, user._id);
      } catch (err) {
        console.log(err);
      }
    }

    handlView();
  });

  useEffect(() => {
    console.log("retrieving job from local storage");
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    console.log(jobs);
    if (jobs) {
      console.log("id -->", id);
      const jobItem = jobs.filter((job) => job._id.trim() === id.trim());
      setJob(jobItem[0]);
      console.log("job state", jobItem[0]);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex items-center pl-10 py-2 border border-b-gray-200">
        <IoMdArrowRoundBack
          className="hover:cursor-pointer"
          onClick={() => navigate("../jobs")}
        />
        <p
          className="ml-2 font-bold hover:cursor-pointer"
          onClick={() => navigate("../jobs")}
        >
          All Jobs
        </p>
      </div>

      <div className="lg:flex lg:flex-row">
        <Container className="">
          <Card className="shadow-2xl">
            <CardContent className="flex flex-row justify-between ">
              <div className="p-5">
                <img
                  src={companyLogo}
                  alt="company logo"
                  className="w-20 h-20 rounded-full"
                />
                <h1 className="font-bold mt-2 text-lg">{job.title}</h1>
                <p className="text-sm text-gray-500 my-2">
                  {job.companyWebsite}
                </p>
                <div className="flex flex-row ">
                  <p className="text-sm text-gray-700 mr-4">
                    {job.companyName}
                  </p>
                  <div className="flex flex-row items-center justify-center">
                    <HiOutlineCurrencyDollar className="text-xl" />
                    <p className="text-sm text-gray-500">{job.salaryRange}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <FaRegBookmark className="text-2xl m-10" />
                <div className="mb-7">
                  <Button
                    onClick={() => navigate(`../../jobseeker/job/apply/${id}`)}
                    variant="contained"
                    sx={{
                      background: "#182235",
                    }}
                    className="bg-green-700 text-white "
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardContent className="shaeow-2xl border border-t-gray-300">
              <div className="p-5">
                <h1 className="font-bold  text-lg">Requirements</h1>

                {job.requirements?.map((requirement, index) => (
                  <div className="flex flex-row items-center">
                    <IoCaretForwardOutline />
                    <p key={index} className="text-sm ml-1 text-gray-700 my-1">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-5">
                <h1 className="font-bold  text-lg">Description</h1>

                <div className="flex flex-row items-center">
                  <IoCaretForwardOutline />
                  <p className="text-sm ml-1 text-gray-700 my-1">
                    {job.description}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardContent className="shaeow-2xl border border-t-gray-300">
              <div className="p-5">
                <h1 className="font-bold  text-lg">Skills</h1>

                <div className="flex flex-row items-center">
                  {job.skills &&
                    job.skills.map((skill, index) => (
                      <p
                        key={index}
                        className="text-sm ml-1 bg-secondary-dark text-white px-3 py-2 rounded-lg hover:text-secondary-dark hover:bg-white transition  shadow-xl my-1"
                      >
                        {skill}
                      </p>
                    ))}
                </div>
              </div>
            </CardContent>
            {/* <CardContent className="shaeow-2xl border border-t-gray-300">
              <div className="p-5">
                <h1 className="font-bold text-lg">About {job.companyName}</h1>
                <p className="mt-1 text-justify text-gray-700">
                  {jobDetails.companyDescription}
                </p>
              </div>
            </CardContent> */}
          </Card>
        </Container>

        <Container className="basis-1/3">
          <CardContent className="shadow-2xl rounded-lg">
            <div className="p-5">
              <h1 className="font-bold text-lg mb-8">About the Job</h1>
              <h2 className="text-gray-500 text-sm">Apply Before</h2>
              <p className="mt-0.5 mb-5">{job.deadLine}</p>
              <h2 className="text-gray-500 text-sm">Posted on</h2>
              <p className="mt-0.5 mb-5">{job.createdAt.toString()}</p>
              <h2 className="text-gray-500 text-sm">Job type</h2>
              <p className="mt-0.5 mb-5">{job.employmentType}</p>
              <h2 className="text-gray-500 text-sm">Experience level</h2>
              <p className="mt-0.5 mb-5 text-gray-500  rounded-sm p-1 border border-gray-400 w-fit text-xs">
                {job.experienceLevel}
              </p>
              <h2 className="text-gray-500 text-sm">Salary</h2>
              <div className="flex flex-row items-center py-1 ">
                <HiOutlineCurrencyDollar className="text-xl" />
                <p className="text-sm text-gray-500">{job.salaryRange}</p>
              </div>
            </div>
          </CardContent>
        </Container>
      </div>
    </>
  );
};

export default Job;
