import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Tabs,
  Tab,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import EmployerController from "../../../../../API/employer";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Candidate = () => {
  const { id } = useParams();
  const applicationId = id;

  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0); // For managing tabs
  const [stage, setStage] = useState("");
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [rating, setRating] = useState(0); // State for rating

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await EmployerController.getApplication(
          applicationId,
          accessToken
        );
        const data = response.data;
        console.log("Candidate data: ", data.data);
        setCandidateData(data.data);
        setStage(data.data.stage); // Initialize the stage
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, [applicationId]);

  const handleStageChange = async (newStage) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await EmployerController.updateApplicationStage(
        applicationId,
        newStage,
        accessToken
      );
      setStage(newStage); // Update the local state
    } catch (error) {
      console.error("Error updating stage:", error);
    }
  };

  const handleFeedbackSubmit = async () => {
    console.log("applicationId", applicationId);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await EmployerController.submitFeedback(
        applicationId,
        { feedback, rating },
        accessToken
      );
      console.log("Feedback response:", response);
      if (response.status === 201) {
        alert("Feedback submitted successfully");
        setFeedback("");
        setRating(0);
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!candidateData) {
    return <div>No data found for this application.</div>;
  }

  const statusSteps = [
    "Applied",
    "Under Review",
    "Interview Scheduled",
    "Rejected",
    "Accepted",
  ];

  const getStatusStepIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-8 py-12">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-5">
        <ArrowBack
          className="text-secondary-dark"
          fontSize="medium"
          onClick={() => window.history.back()}
        />
        <h1 className="text-xl font-extrabold text-slate-800">
          {candidateData.jobTitle}
        </h1>
      </div>

      {/* Candidate Info */}
      <div className="mb-8 space-y-2">
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Candidate Name:</span>{" "}
          {candidateData.candidateName}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Current Status:</span> {stage}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Applied Date:</span>{" "}
          {new Date(candidateData.appliedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Stages - MUI Stepper */}
      <div className="mb-12">
        <Stepper activeStep={getStatusStepIndex(stage)} alternativeLabel>
          {statusSteps.map((stage, index) => (
            <Step key={index}>
              <StepLabel>{stage}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
      >
        <Tab label="Review Application" />
        <Tab label="Job Description" />
        <Tab label="Change Stage" />
        <Tab label="Feedback" />
      </Tabs>

      {/* Tab Panels */}
      {tabIndex === 0 && (
        <div>
          {/* Resume */}
          {candidateData.resume && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Resume:
              </h3>
              <a
                href={candidateData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Download/View Resume
              </a>
            </div>
          )}

          {/* Video Introduction */}
          {candidateData.videoIntroduction && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Video Introduction:
              </h3>
              <video
                controls
                className="w-96 rounded-lg shadow-lg"
                src={candidateData.videoIntroduction}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Candidate Assessment */}
          {candidateData.candidateAssessment && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Coding Assessment
              </h2>

              {candidateData.candidateAssessment.answers.map(
                (answer, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      Problem: {answer.problemTitle}
                    </h3>
                    <p className="text-slate-700 mb-2">
                      <span className="font-semibold">Code:</span>
                    </p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                      {answer.code}
                    </pre>
                    <p className="text-slate-700 mb-2">
                      <span className="font-semibold">Passed:</span>{" "}
                      {answer.passed ? "Yes" : "No"}
                    </p>
                    <p className="text-slate-700 mb-2">
                      <span className="font-semibold">Time Spent:</span>{" "}
                      {answer.timeSpent} ms
                    </p>
                    <p className="text-slate-700 mb-2">
                      <span className="font-semibold">Keystrokes:</span>{" "}
                      {answer.keystrokes}
                    </p>
                    {answer.error && (
                      <p className="text-slate-700 mb-2">
                        <span className="font-semibold">Error:</span>{" "}
                        {answer.error}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
      {tabIndex === 1 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Job Description:
          </h3>
          <p>{candidateData.jobDescription}</p>
        </div>
      )}
      {tabIndex === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Change Stage:
          </h3>
          <FormControl fullWidth>
            <InputLabel id="stage-label">Stage</InputLabel>
            <Select
              labelId="stage-label"
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              {statusSteps.map((step) => (
                <MenuItem key={step} value={step}>
                  {step}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStageChange(stage)}
          >
            Update Stage
          </Button>
        </div>
      )}
      {tabIndex === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Feedback:
          </h3>
          <p>{candidateData.feedback}</p>
          <div className="mt-4">
            <TextField
              label="Feedback"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mt-4">
              <label className="text-lg font-semibold text-slate-800 mb-2">
                Rating:
              </label>
              <ReactStars
                count={5}
                onChange={(newRating) => setRating(newRating)}
                size={24}
                activeColor="#ffd700"
                value={rating}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFeedbackSubmit}
              className="mt-4"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidate;
