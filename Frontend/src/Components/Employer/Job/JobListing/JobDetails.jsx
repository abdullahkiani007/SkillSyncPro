import React from "react";
import { useOutletContext } from "react-router-dom";

const JobDetails = () => {
  const { detail } = useOutletContext();
  const [jobDetails] = React.useState(detail);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {jobDetails?.title}
          </h1>
          <p className="text-gray-500 text-lg">
            {jobDetails?.location} | {jobDetails?.employmentType} | {jobDetails?.salaryRange}
          </p>
        </div>

        {/* Job Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Job Description</h2>
          <p className="text-gray-700 text-lg">{jobDetails?.description}</p>
        </section>

        {/* Job Requirements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Job Requirements</h2>
          <pre className="whitespace-pre-wrap text-gray-700 text-lg bg-gray-50 p-4 rounded-lg">
            {jobDetails?.requirements}
          </pre>
        </section>

        {/* Job Status */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Job Status</h2>
          <div className="text-lg text-gray-700 space-y-2">
            <p><strong>Posted On:</strong> {new Date(jobDetails?.createdAt).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(jobDetails?.updatedAt).toLocaleDateString()}</p>
          </div>
        </section>

        {/* Applicants */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Applicants</h2>
          {jobDetails?.applicants?.length > 0 ? (
            <ul className="list-disc ml-5 text-lg text-gray-700 space-y-1">
              {jobDetails.applicants.map((applicant, index) => (
                <li key={index}>{applicant}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">No applicants yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
