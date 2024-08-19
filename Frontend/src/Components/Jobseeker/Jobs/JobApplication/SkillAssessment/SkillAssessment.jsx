import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CodeEditor from "./CodingEnvironment"; // Adjust the path as needed

const SkillAssessment = () => {
  const [openDisclaimer, setOpenDisclaimer] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { goToNextStep } = useOutletContext();

  const handleCodeSubmit = (submittedCode, timeSpent, keystrokes) => {
    // Check for time limit or pasting issues
    if (timeSpent > 1800000 || keystrokes === 0) {
      setAlertMessage(
        "Time limit exceeded or code was pasted! The task cannot be submitted."
      );
      setOpenAlert(true);
    } else {
      console.log("Submitted Code:", submittedCode);
      // Here you would send the code to your backend to evaluate it
      goToNextStep();
    }
  };

  const handleCloseDisclaimer = () => {
    setOpenDisclaimer(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className="skill-assessment-container">
      <Dialog
        open={openDisclaimer}
        onClose={handleCloseDisclaimer}
        aria-labelledby="disclaimer-dialog-title"
        aria-describedby="disclaimer-dialog-description"
      >
        <DialogTitle id="disclaimer-dialog-title">Disclaimer</DialogTitle>
        <DialogContent>
          <p>
            This is a coding challenge to assess your skills. Please do not copy
            code from external sources or other candidates. Your code should be
            original and written by you.
          </p>
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

      <h2 className="text-xl font-semibold mb-4">Coding Challenge</h2>
      <p>Write a function that solves the following problem:</p>
      {/* Example Problem Statement */}
      <p>
        Write a function that takes an array of numbers and returns the maximum
        sum of any contiguous subarray.
      </p>
      <CodeEditor
        initialCode={`// Write your code here`}
        onSubmit={handleCodeSubmit}
        language="javascript"
      />
    </div>
  );
};

export default SkillAssessment;
