import React, { useState } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Step tracking state
  const [step, setStep] = useState(1);

  // Handler to move to the next step
  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (step === 1) {
      navigate(`./interview`);
    } else if (step === 2) {
      navigate(`./skillAssessment`);
    }
  };

  // Define active and disabled styles
  const activeClassName =
    "text-blue-500 border-b-2 border-blue-500 cursor-pointer";
  const disabledClassName = "text-gray-400 cursor-not-allowed";
  const defaultClassName = "text-gray-500 hover:text-blue-500 cursor-pointer";

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
          style={step >= 1 ? {} : { pointerEvents: "none" }}
        >
          Resume
        </NavLink>
        <NavLink
          to={"./interview"}
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
          style={step >= 2 ? {} : { pointerEvents: "none" }}
        >
          Interview
        </NavLink>
        <NavLink
          to={"./skillAssessment"}
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
          style={step >= 3 ? {} : { pointerEvents: "none" }}
        >
          Skills
        </NavLink>
      </div>

      {/* Render the current step's content */}
      <Outlet context={{ step, goToNextStep }} />
    </div>
  );
};

export default ApplyPage;
