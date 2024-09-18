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
  const [initialCode, setInitialCode] = useState(""); // State for initial code
  const [userCode, setUserCode] = useState([]); // State for user code
  const { id } = useParams();

  // Prevent back navigation
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // This triggers the browser's "Are you sure you want to leave?" dialog.
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     setAlertMessage("Navigation back is not allowed!");
  //     setOpenAlert(true);
  //     window.history.pushState(null, null, window.location.pathname);
  //   };

  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);

  // Prevent copy-paste
  useEffect(() => {
    const handlePaste = (event) => {
      setAlertMessage("Pasting code is not allowed!");
      setOpenAlert(true);
      event.preventDefault();
    };

    const handleCopy = (event) => {
      setAlertMessage("Copying code is not allowed!");
      setOpenAlert(true);
      event.preventDefault();
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("copy", handleCopy);

    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("copy", handleCopy);
    };
  }, []);

  // Fetch assessments
  useEffect(() => {
    const getAssessments = async () => {
      const data = await jobseeker.getAssessmentById(id);
      if (data.status === 200) {
        setAssessments(data.data.assessment);
        setLoading(false);
        setInitialCode(data.data.assessment.problems[0].initialCode); // Set initial code for the first problem
      } else {
        console.log("Error fetching assessments");
      }
    };
    getAssessments();
  }, [id]);

  // Full-screen mode
  useEffect(() => {
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    };

    enterFullScreen();

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []);

  const getLanguageId = (language) => {
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      // Add other languages and their IDs here
    };

    return languageMap[language.toLowerCase()] || 63; // Default to JavaScript if unknown
  };

  const handleCodeSubmit = async (code, timeSpent, keystrokes) => {
    const languageId = getLanguageId(currentProblem.language || "javascript");
    const token = await Judge0.submitCodeToJudge0(code, languageId, "hello");
    let result;

    if (token) {
      let status = "queued";
      while (status === "queued" || status === "running") {
         result = await Judge0.checkSubmissionStatus(token);
        console.log("Result: ", result);
        status = result.status.description;

        if (status === "accepted" || true) {
          // break;
          continue
        } else if (
          // status === "rejected" ||
          // status === "time limit exceeded" ||
          // status === "runtime error"
          false
        ) {
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

    const currentProblem = assessments.problems[currentProblemIndex];

      const data = {
        code: submittedCode,
        assesmentId: assessments._id,
        answers: submittedCode.map((codeSubmission, index) => ({
          problemId: codeSubmission._id,
          code: codeSubmission.code,
            actualOutput: result.stdout ? result.stdout.split('\n')[testIndex] : '',
            passed: result.status.description === 'Accepted' && !result.stderr,
          timeSpent: codeSubmission.timeSpent,
          keystrokes: codeSubmission.keystrokes,
        })),
        result: {
          error: result.stderr,
          time: result.time,
          stdout: result.stdout,
          status: result.status.description,
        },
      };

      setUserCode((prev) => [...prev, data]);
      
    if (currentProblemIndex < assessments.problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setInitialCode(assessments.problems[currentProblemIndex + 1].initialCode); // Update initial code for the next problem
    } else {
      


      handleState("skillAssessment", data);
      handleSubmit();

      // const token = localStorage.getItem("accessToken");
      // const response = await jobseeker.submitApplication(data, token);
      // if (response.status === 200) {
      //   goToNextStep();
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
        <p>
          {currentProblem.initialCode}
        </p>
      </div>

      <CodeEditor
        key={currentProblemIndex} // Add key to force re-render
        initialCode={initialCode}
        onSubmit={handleCodeSubmit}
        language={currentProblem.language || "javascript"}
      />
    </div>
  );
};

export default SkillAssessment;