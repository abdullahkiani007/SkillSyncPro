import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jobseeker from "../../../API/jobseeker";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getAllJobs = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await jobseeker.getAppliedJobs(token);
      console.log("Applied jobs", response)
      if (response.status === 200) {
        setJobs(response.data.jobs);
      }
    };
    getAllJobs();
  }, []);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="mt-20 flex flex-col justify-center items-center">
        <Typography variant="h3" align="center" gutterBottom>
          No Applied Jobs
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/jobseeker/jobs')}
        >
          Consider Applying
        </Button>
      </div>
    )
  }

  return (
    <Container maxWidth="lg" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Applied Jobs
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="applied jobs table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Job Title</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Date Applied</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.jobId} hover>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{new Date(job.appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      navigate("/jobseeker/job-details", { state: { job } })
                    }
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AppliedJobs
