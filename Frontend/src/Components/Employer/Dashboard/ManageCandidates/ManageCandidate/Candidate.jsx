import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// Static data simulating candidate data from backend
const staticCandidateData = {
  jobSeeker: {
    user: {
      firstName: "John",
      lastName: "Doe",
    },
  },
  application: {
    job: {
      title: "Frontend Developer",
    },
    status: "In-person Interview", // "Resume Screening", "Assignment", "Review & Background Check", "Accepted"
    createdAt: "2024-08-20T12:34:56Z",
    updatedAt: "2024-08-25T14:23:45Z",
  },
  candidateAssessment: {
    companyAssessment: {
      title: "Frontend Design Challenge",
      description:
        "Build a responsive landing page for a hypothetical product.",
      note: "Please ensure your submission is mobile-friendly.",
      attachments: "https://via.placeholder.com/600x400", // Placeholder image for attachments
    },
    status: "Completed", // "In Progress", "Not Started"
  },
};

function Candidate() {
  const [candidateData] = useState(staticCandidateData);

  return (
    <div className="bg-gray-100 min-h-screen px-8 py-12">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-5">
        {/* on click move to last route */}
        <ArrowBack className="text-secondary-dark" fontSize="medium" 
        onClick={() => window.history.back()}
        />
        <h1 className="text-xl font-extrabold text-slate-800">
          {candidateData.application.job.title}
        </h1>
      </div>

      {/* Candidate Info */}
      <div className="mb-8 space-y-2">
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Candidate Name:</span>{" "}
          {candidateData.jobSeeker.user.firstName}{" "}
          {candidateData.jobSeeker.user.lastName}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Current Status:</span>{" "}
          {candidateData.application.status}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Applied Date:</span>{" "}
          {new Date(candidateData.application.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Latest Update:</span>{" "}
          {new Date(candidateData.application.updatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <Button
          variant="contained"
          color="primary"
          className="py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform text-white"
        >
          Review Application
        </Button>
        <Button
          variant="contained"
          className="py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform text-gray-800 bg-gray-300 hover:bg-gray-400"
        >
          Job Description
        </Button>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        {["Details", "Stage", "Documents", "Assignments"].map(
          (detail, index) => (
            <div
              key={index}
              className="bg-gray-200 px-4 py-3 rounded-full font-semibold text-slate-800 shadow-md text-center"
            >
              {detail}
            </div>
          )
        )}
      </div>

      {/* Stages - MUI Stepper */}
      <div className="mb-12">
        <Stepper
          activeStep={candidateData.application.status === "Accepted" ? 4 : 3}
          alternativeLabel
        >
          {[
            "Resume Screening",
            "In-person Interview",
            "Assignment",
            "Review & Background Check",
            "Offer",
          ].map((stage, index) => (
            <Step key={index}>
              <StepLabel>{stage}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Design Challenge */}
      {candidateData.candidateAssessment && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {candidateData.candidateAssessment.companyAssessment.title}
          </h2>
          <p className="text-slate-700 mb-4">
            {candidateData.candidateAssessment.companyAssessment.description}
          </p>
          <p className="text-slate-700 mb-6">
            {candidateData.candidateAssessment.companyAssessment.note}
          </p>

          {/* Attachments */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Attachments:
            </h3>
            <div className="border border-slate-300 rounded-lg overflow-hidden shadow-md">
              <img
                src={
                  candidateData.candidateAssessment.companyAssessment
                    .attachments
                }
                alt="Design Challenge"
                className="w-full"
              />
            </div>
          </div>

          {/* Challenge Status */}
          <div className="mt-6">
            <p className="text-lg text-slate-700">
              Status:{" "}
              <span
                className={`font-bold text-${
                  candidateData.candidateAssessment.status === "Completed"
                    ? "green-500"
                    : "red-500"
                }`}
              >
                {candidateData.candidateAssessment.status}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Candidate;
