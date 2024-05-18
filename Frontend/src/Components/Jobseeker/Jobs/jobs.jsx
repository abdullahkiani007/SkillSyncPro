import React from "react";
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

const Jobs = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className="min-h-screen mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobsData.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card className="h-full flex flex-col hover:bg-slate-100" 
            onClick={() => navigate(`/jobseeker/job/${job.id}`)}>
            
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
