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
  Select,
  MenuItem,
  Chip,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import EmployerController from "../../../../API/employer";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [submited, setSubmited] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [company, setCompany] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    requirements: "",
    company: "",
    location: "",
    salaryRange: [0, 100000], // Ensure this is an array
    employmentType: "",
    experienceLevel: "",
    skills: [],
  });
  const navigate = useNavigate();
  const steps = ["Step 1", "Step 2", "Step 3"];
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  useEffect(() => {
    let company = JSON.parse(localStorage.getItem("company"));
    setCompany(company);
    setFormValues((prevValues) => ({
      ...prevValues,
      company: company._id,
    }));
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
    console.log(completedSteps(), totalSteps());

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
          !formValues.employmentType ||
          !formValues.experienceLevel ||
          formValues.skills.length === 0
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
      setError(true);
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
    setSubmissionError("");
    setSubmited(false);
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

  const handleSkillChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      skills: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log(formValues);
    const formattedValues = {
      ...formValues,
      salaryRange: `${formValues.salaryRange[0]}-${formValues.salaryRange[1]}`,
    };
    console.log(formattedValues);
    try {
      const response = await EmployerController.postJob(formattedValues, token);
      console.log(response);
      if (response.status === 200) {
        setSubmited(true);
        setTimeout(() => {
          setMessage("Job Posted Successfully");
          navigate("/employer/jobs");
        }, 3000);
      } else {
        setSubmited(true);
        setSubmissionError("Error Posting Job");
        setMessage("Error Posting Job");
        setError(true);
      }
    } catch (error) {
      setSubmited(true);
      setSubmissionError("Error Posting Job");
      console.log(error);
      setMessage("Error Posting Job");
      setError(true);
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
                  multiline
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
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Salary Range:
              </h1>
              <div className="pl-3 pt-2">
                <Slider
                  value={formValues.salaryRange} // Ensure this is an array
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
                <FormControl variant="outlined" className="w-full">
                  <InputLabel id="employmentType-label">
                    Employment Type
                  </InputLabel>
                  <Select
                    labelId="employmentType-label"
                    id="employmentType"
                    name="employmentType"
                    label="Employment Type"
                    value={formValues.employmentType}
                    onChange={handleInputChange}
                  >
                    {["Full-time", "Part-time", "Contract", "Temporary"].map(
                      (type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">
                Experience Level:
              </h1>
              <div className="pl-3 pt-2">
                <FormControl fullWidth>
                  <InputLabel id="experienceLevel-label">
                    Experience Level
                  </InputLabel>
                  <Select
                    labelId="experienceLevel-label"
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formValues.experienceLevel}
                    onChange={handleInputChange}
                    label="Experience Level" // Ensure the label prop is set
                  >
                    {[
                      "Fresher",
                      "0-2 years",
                      "2-5 years",
                      "5-10 years",
                      "10+ years",
                    ].map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg text-secondary-dark">Skills:</h1>
              <div className="pl-3 pt-2">
                <FormControl className="w-full">
                  <InputLabel id="skills-label">Skills</InputLabel>
                  <Select
                    labelId="skills-label"
                    id="skills"
                    name="skills"
                    multiple
                    value={formValues.skills}
                    onChange={handleSkillChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {["JavaScript", "React", "Node.js", "CSS", "HTML"].map(
                      (skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:w-2/3 mx-auto mt-10">
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div
          className="
        "
        >
          {allStepsCompleted() ? (
            <div
              className="flex flex-col 
        items-center mt-10 bg-secondary-dark
        rounded-xl"
            >
              <Typography
                variant="h5"
                sx={{ mt: 2, mb: 1, fontWeight: "bold", color: "white" }}
              >
                {!submited
                  ? "All steps completed - you're finished"
                  : submissionError
                  ? "Error Posting Job"
                  : "Job Posted Successfully"}
              </Typography>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submited}
              >
                Submit
              </Button>

              <button
                className="py-2 px-5 rounded-md my-6
                text-secondary-dark
                bg-white"
                onClick={handleReset}
              >
                Back
              </button>
            </div>
          ) : (
            <>
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
                {activeStep !== steps.length && (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                )}
              </Box>
            </>
          )}
        </div>
      </Box>
      {message && (
        <Alert
          severity={error ? "error" : "success"}
          className=" 
        fixed
        bottom-0
        right-0

        mt-10 "
        >
          {message}
        </Alert>
      )}
    </div>
  );
};

export default JobPost;
