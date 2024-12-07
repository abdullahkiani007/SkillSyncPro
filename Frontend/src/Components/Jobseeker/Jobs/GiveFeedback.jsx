import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import jobseeker from "../../../API/jobseeker";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: "linear-gradient(135deg, #f0f0f0 0%, #f7f7f7 100%)",
  borderRadius: theme.spacing(3),
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
}));

const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  fontFamily: "'Roboto', sans-serif",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007bff",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  fontWeight: "bold",
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(2),
}));

export function GiveFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location state:", location.state);
  const { job } = location.state; // Access job data passed from JobDetails component

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await jobseeker.submitFeedback(
        job.jobId,
        { feedback, rating },
        token
      );
      if (response.status === 200) {
        alert("Feedback submitted successfully");
        navigate(-1); // Navigate back to the previous page
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", color: "#333" }}
        >
          Give Feedback
        </Typography>

        <Grid container spacing={4} style={{ marginTop: "1.5rem" }}>
          <Grid item xs={12}>
            <InfoText variant="body1" style={{ fontWeight: "bold" }}>
              Job Title: {job.title}
            </InfoText>
            <InfoText variant="body1">Company: {job.company}</InfoText>
            <InfoText variant="body1">Location: {job.location}</InfoText>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Feedback"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InfoText variant="body1" style={{ fontWeight: "bold" }}>
              Rating:
            </InfoText>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[...Array(5)].map((star, index) => (
                <StarIcon
                  key={index}
                  style={{
                    color: index < rating ? "#ffd700" : "#ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "2rem" }}>
            <StyledButton
              onClick={handleFeedbackSubmit}
              size="large"
              variant="contained"
            >
              Submit Feedback
            </StyledButton>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
}
