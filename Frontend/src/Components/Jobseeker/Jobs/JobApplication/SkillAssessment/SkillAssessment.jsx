import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import CodeEditor from "./CodingEnvironment"; // Adjust the path as needed
import Loader from "../../../../Loader/Loader";
import jobseeker from "../../../../../API/jobseeker";
import Judge0 from "../../../../../API/Assessment";

const SkillAssessment = () => {
  const [openDisclaimer, setOpenDisclaimer] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { goToNextStep, handleSubmit, handleState } = useOutletContext();
  const [assessments, setAssessments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [submittedCode, setSubmittedCode] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching assessments");
    const getAssessments = async () => {
      const data = await jobseeker.getAssessmentById(id);
      console.log(data);
      if (data.status === 200) {
        setAssessments(data.data.assessment);
        setLoading(false);
      } else {
        console.log("Error fetching assessments");
      }
    };
    getAssessments();
  }, []);

  useEffect(() => {
    const handlePaste = (event) => {
      setAlertMessage("Pasting code is not allowed!");
      setOpenAlert(true);
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  const getLanguageId = (language) => {
    language = language.toLowerCase();
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      // Add other languages and their IDs here
    };

    return languageMap[language.toLowerCase()] || 63; // Default to JavaScript if unknown
  };

  const handleCodeSubmit = async (code, timeSpent, keystrokes) => {
    console.log("Submitted Code:", code);

    const languageId = getLanguageId(currentProblem.language || "javascript"); // Map your language to Judge0's ID
    const token = await Judge0.submitCodeToJudge0(code, languageId, "hello");

    if (token) {
      // Poll Judge0 for results
      let status = "queued";
      while (status === "queued" || status === "running") {
        const result = await Judge0.checkSubmissionStatus(token);
        console.log("Result:", result);
        status = result.status.description;

        if (status === "accepted") {
          console.log("Code Accepted:", result);
          // Handle accepted code (e.g., score, feedback)
          break;
        } else if (
          status === "rejected" ||
          status === "time limit exceeded" ||
          status === "runtime error"
        ) {
          console.log("Code Rejected:", result);
          setAlertMessage("Code rejected: " + result.status.description);
          setOpenAlert(true);
          break;
        }
      }
    }

    const newCode = {
      code,
      timeSpent,
      keystrokes,
      _id: assessments.problems[currentProblemIndex]._id,
    };

    setSubmittedCode([...submittedCode, newCode]);

    if (currentProblemIndex < assessments.problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      console.log("All problems solved!");
      handleSubmit();

      const data = {
        code: submittedCode,
        assesmentId: assessments._id,
      };
      // const token = localStorage.getItem("accessToken");
      // const response = await jobseeker.submitApplication(data, token);
      // console.log("Response", response);
      // if (response.status === 200) {
      //   console.log("Application submitted successfully");
      //   goToNextStep();
      //   console.log("response", response);
      // } else {
      //   setAlertMessage("Failed to submit application. Please try again.");
      //   setOpenAlert(true);
      // }
    }
  };

  const handleCloseDisclaimer = () => {
    setOpenDisclaimer(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  if (loading) {
    return <Loader />;
  }

  const currentProblem = assessments.problems[currentProblemIndex];

  return (
    <div className="skill-assessment-container p-5 bg-gray-900 text-white min-h-screen">
      <Dialog
        open={openDisclaimer}
        onClose={handleCloseDisclaimer}
        aria-labelledby="disclaimer-dialog-title"
        aria-describedby="disclaimer-dialog-description"
      >
        <DialogTitle id="disclaimer-dialog-title">Disclaimer</DialogTitle>
        <DialogContent>
          <Typography>
            This is a coding challenge to assess your skills. Please do not copy
            code from external sources or other candidates. Your code should be
            original and written by you.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisclaimer} color="primary">
            I Understand
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        action={
          <Button color="inherit" onClick={handleCloseAlert}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h4" className="text-xl font-semibold mb-4">
        Coding Challenge {currentProblemIndex + 1} /{" "}
        {assessments.problems.length}
      </Typography>

      <div className="problem-statement mb-4">
        <Typography variant="h5" className="mb-2">
          {currentProblem.title}
        </Typography>
        <Typography variant="body1">{currentProblem.description}</Typography>
        <Typography variant="body2" className="mt-4">
          <strong>Input:</strong> {currentProblem.input}
        </Typography>
        <Typography variant="body2">
          <strong>Output:</strong> {currentProblem.output}
        </Typography>
      </div>

      <CodeEditor
        initialCode={currentProblem.initialCode}
        onSubmit={handleCodeSubmit}
        language={currentProblem.language || "javascript"}
      />
    </div>
  );
};

export default SkillAssessment;
