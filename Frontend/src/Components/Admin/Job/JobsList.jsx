import React, { useState, useEffect } from "react";
import admin from "../../../API/admin";
import { FaArchive, FaTrashAlt } from "react-icons/fa";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await admin.getJobsForAdmin(token);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleArchiveJob = async (jobId) => {
    try {
      await admin.put(`/api/admin/jobs/${jobId}/archive`);
      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, archived: true } : job
        )
      );
    } catch (error) {
      console.error("Failed to archive job", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await admin.delete(`/api/admin/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Manage Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-500 to-slate-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Applicants</th>
              <th className="py-3 px-4 text-left">Posted At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {jobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="py-4 px-4">{job.title}</td>
                <td className="py-4 px-4">{job.companyName}</td>
                <td className="py-4 px-4">{job.location}</td>
                <td className="py-4 px-4">{job.applicantCount}</td>
                <td className="py-4 px-4">
                  {new Date(job.postedAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-4">
                    {!job.archived ? (
                      <button
                        onClick={() => handleArchiveJob(job._id)}
                        className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                        title="Archive Job"
                      >
                        <FaArchive className="w-5 h-5" />
                      </button>
                    ) : (
                      <span className="text-gray-500">Archived</span>
                    )}
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      title="Delete Job"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
