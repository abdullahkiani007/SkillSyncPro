import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate} from "react-router-dom";
import jobSeeker from "../../../../API/jobseeker";
import { useDispatch, useSelector } from "react-redux";


const ApplyPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [jobDescription , setJobDescription] = useState("")
  const [application, setApplication] = useState({});
  const [error , setError] = useState("");


  // Step tracking state
  const [step, setStep] = useState(1);

  const handleStartApplication = async () => {
    try {
      const accessToken = localStorage  .getItem("accessToken");
      const response = await jobSeeker.startApplication(id, accessToken);
      console.log("Start application response:", response.data.application);
      if (response.status === 200) {
        setApplication({application_id : response.data.application._id , job:id});
        localStorage.setItem("application_id", JSON.stringify(response.data.application._id));
      }

    } catch (err) {
      console.error("Start application error:", err);
      setError("You have already Applied")
      setTimeout( ()=>{
        console.log("hiiiiiii")
        setError("");
        navigate("/jobseeker/dashboard")
      },3000)
    }
  };

  const handleState = (fieldName, value) => {
    console.log(fieldName, value);
    setApplication((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };


  useEffect(() => {
    console.log("Starting application");
    handleStartApplication();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    console.log("Fetching assessments");
    const getAssessments = async () => {
      const data = await jobSeeker.getAssessmentById(id);
      console.log(data);
      if (data.status === 200) {
        console.log(data.data.assessment);
        localStorage.setItem(
          "assessment",
          JSON.stringify(data.data.assessment)
        );
      } else {
        console.log("Error fetching assessments");
      }
    };
    const getJobDetails = async() =>{
      try{
        const response = await jobSeeker.getJobDescription(id);
        const jobDescription = response.data.job.description + " " + response.data.job.requirements
        setJobDescription(jobDescription)
      }catch(err){
        console.log(err)
      }
    }
    getJobDetails()
    getAssessments();

    setApplication((prev) => ({
      ...prev,
      job: id,
      user: user._id,
      status: "Applied",
    }));

    console.log("Application", application);
  }, [id, user._id]); // Add dependencies to ensure this runs only when id or user._id changes

  // Handler to move to the next step
  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (step === 1) {
      navigate(`./interview`);
    } else if (step === 2) {
      navigate(`./skillAssessment`);
    }
  };

  const handleSubmit = async () => {
    console.log("Application", application);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await jobSeeker.submitApplication(application, token);
      console.log(response);
      if (response.status === 200) {
        navigate("/jobseeker/dashboard");
      } else {
        console.log("Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Application in useEffect", application);
    if (application.skillAssessment) {
      handleSubmit();
    }
  }, [application]); // Add application as a dependency to ensure this runs only when application changes

  // Define active and disabled styles
  const activeClassName =
    "text-blue-500 border-b-2 border-blue-500 cursor-pointer";
  const disabledClassName = "text-gray-400 cursor-not-allowed";
  const defaultClassName = "text-gray-500 hover:text-blue-500 cursor-pointer";

  if (error){
    return (
      <h1>{error}</h1>
    )
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-10 text-secondary-dark">
        Apply for Job
      </h1>

      {/* Render sub routes links */}
      <div className="flex justify-center space-x-4">
        <NavLink
          to={`./`}
          end
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
          style={{ pointerEvents: "none" }}
        >
          Resume
        </NavLink>
        <NavLink
          to={"./interview"}
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
          style={{ pointerEvents: "none" }}
        >
          Interview
        </NavLink>
        <NavLink
          to={"./skillAssessment"}
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
          style={{ pointerEvents: "none" }}
        >
          Skills
        </NavLink>
      </div>

      {/* Render the current step's content */}
      <Outlet context={{ step, goToNextStep, handleState , jobDescription}} />
    </div>
  );
};

export default ApplyPage;