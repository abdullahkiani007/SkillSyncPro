import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import EmployerController from "../../../../API/employer";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [company, setCompany] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    requirements: "",
    company: "",
    location: "",
    salaryRange: "",
    employmentType: "",
  });
  const navigate = useNavigate();
  const steps = ["Step 1", "Step 2", "Step 3"];
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("token");
      const response = await EmployerController.getCompany(token);
      if (response.status === 200) {
        setCompany(response.data.data);
        console.log("company ", response.data.data);
        // setFormValues((prevValues) => ({
        //   ...prevValues,
        //   company: response.data.company.name,
        // }));
      } else {
        setError(true);
        setMessage("error fetching company");
      }
    };
    fetchCompany();
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    console.log(completed);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    let isValid = true;
    const newCompleted = completed;

    switch (activeStep) {
      case 0:
        if (!formValues.title || !formValues.location) isValid = false;
        break;
      case 1:
        if (!formValues.description || !formValues.requirements)
          isValid = false;
        break;
      case 2:
        if (
          !formValues.company ||
          !formValues.salaryRange ||
          !formValues.employmentType
        )
          isValid = false;
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    } else {
      setMessage("Please fill in all required fields before proceeding.");
    }
  };

  const handleSliderChange = (event, newValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      salaryRange: newValue,
    }));
    console.log(formValues);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await EmployerController.postJob(formValues, token);
      if (response.status === 200) {
        setMessage("Job Posted Successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("Error Posting Job");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card className="my-20 mx-10 p-10">
            <div>
              <h1 className="font-bold text-lg text-secondary-dark">Title:</h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formValues.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Location:
              </h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="location"
                  name="location"
                  label="Location"
                  variant="outlined"
                  value={formValues.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>
        );
      case 1:
        return (
          <Card className="my-20 mx-10 p-10 h-96 " sx={{ overflowY: "scroll" }}>
            <div>
              <h1 className="font-bold text-lg text-secondary-dark">
                Description:
              </h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Requirements:
              </h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="requirements"
                  name="requirements"
                  label="Requirements"
                  variant="outlined"
                  value={formValues.requirements}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>
        );
      case 2:
        return (
          <Card className="my-20 mx-10 p-10">
            <div>
              <h1 className="font-bold text-lg text-secondary-dark">
                Company:
              </h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="company"
                  name="company"
                  label="Company"
                  variant="outlined"
                  value={formValues.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Salary Range:
              </h1>
              <div className="pl-3 pt-2">
                <Slider
                  value={formValues.salaryRange || [0, 100000]} // Ensure this is an array
                  onChange={handleSliderChange} // Updated to use the fixed function
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={100000}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 25000, label: "25K" },
                    { value: 50000, label: "50K" },
                    { value: 75000, label: "75K" },
                    { value: 100000, label: "100K" },
                  ]}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Employment Type:
              </h1>
              <div className="pl-3 pt-2">
                <TextField
                  className="w-full"
                  id="employmentType"
                  name="employmentType"
                  label="Employment Type"
                  variant="outlined"
                  value={formValues.employmentType}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Card>
        );
      default:
        return "Unknown step";
    }
  };

  if (error)
    return (
      <div className="flex flex-col items-center my-40 w-96 mx-auto">
        <h1 className="font-bold text-2xl text-center text-secondary-dark">
          Error Fetching Company
        </h1>
        <p className="text-gray-400 text-center my-4">
          You need to create a company before you can post a job. Click the
          button below
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/employer/company-profile")}
        >
          Join or Create a Company
        </Button>
      </div>
    );
  return (
    <div>
      <h1 className="font-bold text-2xl text-center text-secondary-dark">
        Post a Job
      </h1>
      <Box sx={{ width: "50%", margin: "auto", padding: "2rem" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {renderStepContent(activeStep)}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
      {message && (
        <>
          <div className=" bottom-0 right-0 fixed ">
            <Alert severity="success">{message}</Alert>
          </div>
          <Typography color="primary" variant="h6" align="center">
            {message}
          </Typography>
        </>
      )}
    </div>
  );
};

export default JobPost;
