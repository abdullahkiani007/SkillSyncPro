import React, { useState } from "react";
import FastApi from "../../../../API/FastApi";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const { step, goToNextStep } = useOutletContext();

  const user = useSelector((state) => state.user);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const userName = `${user.firstName}${user.lastName}`;
    console.log("User name is :", userName);
    const fileName = `${userName}.pdf`;

    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file, fileName);

    try {
      const response = await FastApi.uploadResume(formData);
      if (response) {
        alert("Resume uploaded successfully");
        goToNextStep();
      } else {
        alert("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl mb-6 text-center text-secondary-dark">
          <span className="text-gray-500 font-light">Step {step}:</span> Upload
          Your Resume
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please upload your resume to proceed to the next step of your
          application. Ensure your resume is up-to-date and clearly outlines
          your skills and experiences.
        </p>
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <input
            type="file"
            onChange={handleFileChange}
            name="resume"
            className="mb-4 md:mb-0"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out w-full md:w-48"
            onClick={handleUpload}
          >
            Upload Resume
          </button>
        </div>
        {file && (
          <p className="text-gray-500 mt-4 text-center">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
