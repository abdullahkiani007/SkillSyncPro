import React, { useState, useEffect } from "react";
import admin from "../../../API/admin";
import { FaEye, FaArchive, FaTrashAlt } from "react-icons/fa";

const ManageJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await admin.getJobSeekersForAdmin(token);
        setJobSeekers(response.data.jobSeekers);
      } catch (error) {
        console.error("Failed to fetch job seekers", error);
      }
    };

    fetchJobSeekers();
  }, []);

  const handleArchiveJobSeeker = async (jobSeekerId) => {
    try {
      await admin.put(`/api/admin/jobseekers/${jobSeekerId}/archive`);
      setJobSeekers(
        jobSeekers.map((jobSeeker) =>
          jobSeeker._id === jobSeekerId
            ? { ...jobSeeker, archived: true }
            : jobSeeker
        )
      );
    } catch (error) {
      console.error("Failed to archive job seeker", error);
    }
  };

  const handleDeleteJobSeeker = async (jobSeekerId) => {
    try {
      await admin.delete(`/api/admin/jobseekers/${jobSeekerId}`);
      setJobSeekers(
        jobSeekers.filter((jobSeeker) => jobSeeker._id !== jobSeekerId)
      );
    } catch (error) {
      console.error("Failed to delete job seeker", error);
    }
  };

  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJobSeeker(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-slate-800 mb-8">
        Manage Job Seekers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-slate-600 to-slate-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {jobSeekers.map((jobSeeker) => (
              <tr
                key={jobSeeker._id}
                className="border-b cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <td className="py-4 px-4">{`${jobSeeker.user.firstName} ${jobSeeker.user.lastName}`}</td>
                <td className="py-4 px-4">{jobSeeker.user.email}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => openModal(jobSeeker)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="View Details"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    {!jobSeeker.archived ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchiveJobSeeker(jobSeeker._id);
                        }}
                        className="text-teal-500 hover:text-teal-700 transition-colors"
                        title="Archive Job Seeker"
                      >
                        <FaArchive className="w-5 h-5" />
                      </button>
                    ) : (
                      <span className="text-gray-500">Archived</span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJobSeeker(jobSeeker._id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Job Seeker"
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

      {/* Job Seeker Details Modal */}
      {isModalOpen && selectedJobSeeker && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">{`${selectedJobSeeker.user.firstName} ${selectedJobSeeker.user.lastName}`}</h3>
            <p className="mb-4">
              <strong>Email:</strong> {selectedJobSeeker.user.email}
            </p>
            <div className="mb-4">
              <strong>Skills:</strong>
              <p className="text-slate-600">
                {selectedJobSeeker.skills.join(", ")}
              </p>
            </div>
            <div className="mb-4">
              <strong>Experience:</strong>
              {selectedJobSeeker.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="text-slate-700">{`${exp.companyName} - ${exp.role}`}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                  <p className="text-slate-600">{exp.description}</p>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <strong>Education:</strong>
              {selectedJobSeeker.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="text-slate-700">{`${edu.institution} - ${edu.degree} in ${edu.fieldOfStudy}`}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <strong>Certifications:</strong>
              {selectedJobSeeker.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <p className="text-slate-700">{`${cert.title} - ${cert.institution}`}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(cert.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 py-2 px-4 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobSeekers;
