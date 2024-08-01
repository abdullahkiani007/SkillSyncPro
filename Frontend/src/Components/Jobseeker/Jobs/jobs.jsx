import React, { useEffect, useState } from "react";
import { jobsData } from "../../../constants/index.js";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import jobseekerController from "../../../API/jobseeker.js";
import Loader from "../../../Components/Loader/Loader.jsx";
import { FaFilter } from "react-icons/fa6";

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

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salaryRange: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(); // Filtered list of jobs

  const applyFilters = () => {
    let result = jobs;
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }
    if (filters.type) {
      result = result.filter((job) => job.type === filters.type);
    }
    setFilteredJobs(result);
  };

  useEffect(() => {
    async function getJobs() {
      const token = localStorage.getItem("token");
      const data = await jobseekerController.getJobs();
      console.log("jobs data", data);
      const AppliedJobs = await jobseekerController.getAppliedJobs(token);
      console.log("Applied jobs", AppliedJobs);
      // console.log(appliedJobs.data.jobs);
      setAppliedJobs(AppliedJobs.data.jobs);
      const jobs = data.data.jobs;
      if (AppliedJobs.data) {
        const appliedJobs = AppliedJobs.data.jobs;
      }

      const ap = jobs.map((job) => {
        if (appliedJobs?.some((appliedJob) => appliedJob._id === job._id)) {
          return {
            ...job,
            applied: true,
          };
        }
        return {
          ...job,
          applied: false,
        };
      });
      console.log("ap", ap);
      setJobs(ap);
      console.log("Jobss data", jobs);
      // console.log("I 've applied to these jobs: ", ap);
      // console.log("applied",appliedJobs);
      // console.log('overall',jobs)
      setLoading(false);
      localStorage.setItem("jobs", JSON.stringify(ap));
      localStorage.setItem("jobsFetchTimestamp", new Date().getTime());
    }
    getJobs();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default Jobs;
