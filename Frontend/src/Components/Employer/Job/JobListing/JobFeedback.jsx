import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import employer from "../../../../API/employer";
import { useParams } from "react-router-dom";

export const JobFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await employer.getJobFeedbacks(id, token);
        if (response.status === 200) {
          setFeedbacks(response.data.feedbacks);
        } else {
          setError("Failed to fetch feedbacks");
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        setError("Error fetching feedbacks");
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Job Feedback By Users
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="feedback table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
                <TableCell>
                  <strong>Feedback</strong>
                </TableCell>
                <TableCell>
                  <strong>Rating</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" color="error">
                      {error}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ marginRight: "0.5rem" }}>
                          {feedback.userName.charAt(0)}
                        </Avatar>
                        <Typography variant="body1">
                          {feedback.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{feedback.feedback}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {[...Array(5)].map((star, index) => (
                          <StarIcon
                            key={index}
                            sx={{
                              color:
                                index < feedback.rating ? "#ffd700" : "#ccc",
                            }}
                          />
                        ))}
                        <Typography
                          variant="body2"
                          component="p"
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          {feedback.rating.toFixed(1)}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1">
                      No feedback available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
