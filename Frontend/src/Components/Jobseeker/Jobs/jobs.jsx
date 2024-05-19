import React,{useEffect , useState} from "react";
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

 
  useEffect(() => {
  // if (
  //   localStorage.getItem("jobs") &&
  //   new Date().getTime() - localStorage.getItem("jobsFetchTimestamp") > 30 * 60 * 1000
  // ) {
  //   setJobs(JSON.parse(localStorage.getItem("jobs")));
  //   console.log("Fetching from local storage :");
  //   console.log(
  //     "Time Passed: ",
  //     (new Date().getTime() - localStorage.getItem("jobsFetchTimestamp")) / 600000
  //   );
  //   setLoading(false);
  // } else 
  {
    async function getJobs() {
      const data = await jobseekerController.getJobs();
      setJobs(data.jobs);
      setLoading(false);
      localStorage.setItem("jobs", JSON.stringify(data.jobs));
      localStorage.setItem("jobsFetchTimestamp", new Date().getTime());
    }
    getJobs();
  }
}, []);


  if (loading) {
    return <Loader/>
  }
  return (
    <Container maxWidth="lg" className="min-h-screen mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid  item xs={12} md={6} lg={4} key={job.id}>
            <Card className="h-full flex flex-col hover:bg-slate-100" 
            onClick={() => navigate(`/jobseeker/job/${job._id}`)}>
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
                <Typography variant="body2" color="textPrimary" className="text-green-500">
                  {job.salary}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mt-2 flex-grow">
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
