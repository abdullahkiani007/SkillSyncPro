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

const jobDetails = {
  title: "Frontend Developer",
  companyInfo: "Lifafa is a software company",
  description: "Develop and maintain web applications using React.js.",
  requirements: [
    "3+ years of experience in frontend development",
    "Proficiency in React.js and JavaScript",
    "Experience with CSS and responsive design",
    "Strong problem-solving skills",
  ],
  companyName: "Tech Corp",
  companyDescription:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit doloremque ab commodi explicabo, minima facere? Perferendis exercitationem aliquam quia voluptate saepe obcaecati quas fugit vero doloremque commodi ducimus accusantium sed possimus, minus quam perspiciatis, nihil nostrum, neque dolorum. Debitis, repellat earum molestiae iusto nam, perspiciatis expedita architecto aut asperiores distinctio qui, sint odit. Omnis nam magni, odit tempora labore quas inventore expedita ut! Nobis temporibus iste repellat enim, quo animi eius illo debitis commodi? Asperiores adipisci quasi iure vero, ex dolorem recusandae maiores aut id non. Harum libero explicabo vitae animi sunt quae. Modi quasi tempore ut, quidem reiciendis harum?,",
  postedBy: "John Doe",
  location: "New York, NY",
  salaryRange: "70k-90k PKR",
  deadLine: "2024-05-25",
  postedOn: "2024-04-25",
  employmentType: "Full-time",
  experienceLevel: "Mid-Level",
  applicants: [
    {
      _id: "1",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@gmail.com",
    },
    {
      _id: "2",
      firstName: "John",
      lastName: "Doe",
      email: "john@gmai.com",
    },
  ],
  application: {
    jobSeeker: "Jane Smith",
    status: "Under Review",
    resume: "resume1.pdf",
    coverLetter: "Looking forward to joining your team!",
    interview: {
      date: "2024-05-25",
    },
  },
};

const Job = () => {
  const id = window.location.pathname.split("/")[3];
  const navigate = useNavigate();

  console.log(id);
  const [job, setJob] = useState({});
  const [applied, setApplied] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(
    jobDetails.applicants.filter((applicant) => applicant._id === user._id)
  );
  if (jobDetails.applicants.find((applicant) => applicant._id === user._id)) {
    setApplied(true);
  }

  useEffect(() => {
    const jobs = localStorage.getItem("jobs");
    console.log(jobs);
    if (jobs) {
      const jobItem = JSON.parse(jobs).filter((job) => job._id === id);
      setJob(jobItem[0]);
      console.log("job state", job);
    }
  }, []);
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
                <h1 className="font-bold mt-2 text-lg">
                  {jobDetails.companyName}
                </h1>
                <p className="text-sm text-gray-500 my-2">
                  {jobDetails.companyInfo}
                </p>
                <div className="flex flex-row ">
                  <p className="text-sm text-gray-700 mr-4">
                    {jobDetails.companyName}
                  </p>
                  <div className="flex flex-row items-center justify-center">
                    <HiOutlineCurrencyDollar className="text-xl" />
                    <p className="text-sm text-gray-500">
                      {jobDetails.salaryRange}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <FaRegBookmark className="text-2xl m-10" />
                <div className="mb-7">
                  <Button
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

                {jobDetails.requirements.map((requirement, index) => (
                  <div className="flex flex-row items-center">
                    <IoCaretForwardOutline />
                    <p key={index} className="text-sm ml-1 text-gray-700 my-1">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardContent className="shaeow-2xl border border-t-gray-300">
              <div className="p-5">
                <h1 className="font-bold text-lg">
                  About {jobDetails.companyName}
                </h1>
                <p className="mt-1 text-justify text-gray-700">
                  {jobDetails.companyDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </Container>
        {/* <Container maxWidth="md" className="mt-10">
          <Card className="shadow-2xl">
            <CardContent>
              <div>
                <Typography variant="h4" component="h1" className="mb-4">
                  {job.title}
                </Typography>
                {applied && (
                  <p className="bg-green-700 text-white px-3 py-2 w-fit rounded-lg my-4">
                    Already Applied
                  </p>
                )}
              </div>
              <Typography variant="h6" color="textSecondary" className="mb-2">
                {job.companyName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-4"
              >
                {job.location || "Hybrid"}
              </Typography>
              <Box className="mb-4">
                <Chip
                  label={job.employmentType || "Full-Time"}
                  className="mr-2"
                />
                <Chip label={job.salaryRange || "TBD"} />
              </Box>
              <Divider className="my-4" />
              <Typography variant="h6" className="mb-2">
                Job Description
              </Typography>
              <Typography variant="body1" className="mb-4">
                {job.description}
              </Typography>
              <Typography variant="h6" className="mb-2">
                Requirements
              </Typography>
              {job.requirements ? (
                <ul className="list-disc ml-5">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>
                      <Typography variant="body1">{requirement}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No requirements Found</p>
              )}
              <Divider className="my-4" />
              {applied ? (
                <>
                  <Typography variant="h6" className="mb-2">
                    Application Status
                  </Typography>

                  <Card className="mb-4">
                    <CardContent>
                     
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        Status: {jobDetails.application.status}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        Resume:{" "}
                        <a
                          href={jobDetails.application.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {jobDetails.application.resume}
                        </a>
                      </Typography>
                      {jobDetails.application.coverLetter && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="mb-2"
                        >
                          Cover Letter: {jobDetails.application.coverLetter}
                        </Typography>
                      )}
                      {jobDetails.application.interview && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="mb-2"
                        >
                          Interview Scheduled:{" "}
                          {jobDetails.application.interview.date}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <button
                  className={`bg-green-700 text-white px-3 py-2 w-fit rounded-lg my-4 ${
                    job.applied && "bg-gray-400"
                  }`}
                  onClick={() => navigate("../job/apply/" + job._id)}
                  disabled={job.applied}
                >
                  {job.applied ? "Applied" : "Apply"}
                </button>
              )}
              <Divider className="my-4" />
              <Typography
                variant="body2"
                color="textSecondary"
                className="mt-4"
              >
                Posted by: {jobDetails.postedBy}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Applicants: {jobDetails.applicants.length}
              </Typography>
            </CardContent>
          </Card>
        </Container> */}
        <Container className="basis-1/3">
          <CardContent className="shadow-2xl rounded-lg">
            <div className="p-5">
              <h1 className="font-bold text-lg mb-8">About the Job</h1>
              <h2 className="text-gray-500 text-sm">Apply Before</h2>
              <p className="mt-0.5 mb-5">{jobDetails.deadLine}</p>
              <h2 className="text-gray-500 text-sm">Posted on</h2>
              <p className="mt-0.5 mb-5">{jobDetails.postedOn}</p>
              <h2 className="text-gray-500 text-sm">Job type</h2>
              <p className="mt-0.5 mb-5">{jobDetails.employmentType}</p>
              <h2 className="text-gray-500 text-sm">Experience level</h2>
              <p className="mt-0.5 mb-5 text-gray-500  rounded-sm p-1 border border-gray-400 w-fit text-xs">
                {jobDetails.experienceLevel}
              </p>
              <h2 className="text-gray-500 text-sm">Salary</h2>
              <div className="flex flex-row items-center py-1 ">
                <HiOutlineCurrencyDollar className="text-xl" />
                <p className="text-sm text-gray-500">
                  {jobDetails.salaryRange}
                </p>
              </div>
            </div>
          </CardContent>
        </Container>
      </div>
    </>
  );
};

export default Job;
