import React, { useState } from "react";
import axios from "axios";
import UserController from "../../../../API/index";
import resume from "../../../../API/resume";
import { useOutletContext } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { goToNextStep, handleState, jobDescription } = useOutletContext();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Get pre-signed URL from backend
      const response = await UserController.generatePresignedUrl(
        "Resume",
        file.name,
        file.type
      );
      console.log("Presigned URL response:", response);

      // Upload file directly to S3
      const { url } = response;
      console.log("Uploading file to S3:", url.data);
      await axios.put(url.data, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Update application state with resume URL

      alert("File uploaded successfully");
      goToNextStep();

      console.log("After go to next step in resume")
      const formData = new FormData();
      formData.append("jobDescription", jobDescription);
      formData.append("resume", file);
      handleState(
        "resume",
        `https://skillsyncprobucket.s3.ap-southeast-2.amazonaws.com/Resume/${file.name}`
      );

      try {
        const similarityScore = await resume.checkSimilarity(formData);
        if (similarityScore) {
          handleState("similarityScore", similarityScore.data.similarity);
        }

        console.log("Similarity Score : ", similarityScore);
        console.log("Job description ", jobDescription)
      } catch (err) { 
        console.log(err);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  // handleSubmitResume()

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl mb-6 text-center text-secondary-dark">
          Upload Your Resume
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please upload your resume to proceed.
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
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
        {file && (
          <p className="text-gray-500 mt-4 text-center">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-4 text-center">Error: {error}</p>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
