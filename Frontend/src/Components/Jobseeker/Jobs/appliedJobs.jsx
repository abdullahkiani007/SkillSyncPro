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
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Event as DateIcon,
  AssignmentTurnedIn as StatusIcon,
  Feedback as FeedbackIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Footer Component
const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: "#333",
  color: "#fff",
  padding: theme.spacing(4),
  marginTop: theme.spacing(5),
  textAlign: "center",
  "& a": {
    color: "#007bff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "#0056b3",
    },
  },
}));

const AppliedJobs = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllJobs = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await jobseeker.getAppliedJobs(token);
      console.log("Applied jobs", response);
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
          variant="contained"
          color="primary"
          onClick={() => navigate("/jobseeker/jobs")}
        >
          Consider Applying
        </Button>
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="lg" className="mt-10 min-h-screen">
        <Typography variant="h4" align="center" gutterBottom>
          Applied Jobs
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="applied jobs table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>
                    <WorkIcon fontSize="small" /> Job Title
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <BusinessIcon fontSize="small" /> Company
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <LocationIcon fontSize="small" /> Location
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <DateIcon fontSize="small" /> Date Applied
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <StatusIcon fontSize="small" /> Status
                  </strong>
                </TableCell>

                <TableCell>
                  <strong>
                    <StarIcon fontSize="small" /> Rating
                  </strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.jobId} hover>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    {new Date(job.appliedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>
                    {job.rating ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {[...Array(5)].map((star, index) => (
                          <StarIcon
                            key={index}
                            style={{
                              color: index < job.rating ? "#ffd700" : "#ccc",
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      "No rating yet"
                    )}
                  </TableCell>
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

      {/* Footer */}
      <Footer>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} SkillSync Pro. All Rights Reserved.
        </Typography>
        <Typography variant="body2" style={{ marginTop: "8px" }}>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |{" "}
          <a href="#">Contact Us</a>
        </Typography>
      </Footer>
    </>
  );
};

export default AppliedJobs;
