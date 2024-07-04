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

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

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
    <Container maxWidth="lg" className="min-h-screen mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Jobsss
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card
              className="h-full flex flex-col hover:bg-slate-100"
              onClick={() => navigate(`/jobseeker/job/${job._id}`)}
            >
              {job.applied && (
                <p className="bg-green-800 text-white px-3 py-2 rounded-lg">
                  Applied
                </p>
              )}
              <CardContent className="flex flex-col flex-grow">
                <Typography variant="h5" component="h2" className="font-bold">
                  {job.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {job.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className="text-green-500"
                >
                  {job.salary}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mt-2 flex-grow"
                >
                  {job.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {job.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Jobs;
