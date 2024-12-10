import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import JobSeekerController from "../../API/jobseeker";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await JobSeekerController.getJobs();
      const { jobs } = data;
      setJobs(jobs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-red-500">
        Error: {error}
      </div>
    );

  const handleApplyClick = () => {
    navigate("/signup/jobseeker");
  };

  return (
    <div className="font-sans h-[calc(100vh)] flex flex-col min-h-screen bg-white mt-20">
      <div className="p-5">
        <div className="p-6 bg-white shadow-lg rounded-lg h-[calc(100vh)] ">
          <div className="text-4xl font-bold text-center mb-6 text-black">
            Available Jobs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="job-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                >
                  <h3 className="text-xl font-semibold text-black">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{job.company?.name}</p>
                  <p className="text-gray-500 mt-2">{job.location}</p>
                  <p className="text-gray-500 mt-2">{job.salaryRange}</p>
                  <p className="text-gray-500 mt-2">{job.requirements}</p>

                  {/* Display Company Details */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Company: {job.companyName}
                    </p>
                    <p className="text-sm text-gray-400">
                      Website:{" "}
                      <a href={job.company?.website} className="text-blue-500">
                        {job.companyWebsite}
                      </a>
                    </p>
                  </div>

                  {/* Display Posted By Details */}
                  <div className="mt-2 flex flex-row gap-x-2">
                    {job.skills.map((skill, index) => {
                      return (
                        <div
                          key={index}
                          className="text-sm text-white bg-primary rounded-[6.25rem] py-[0.5rem] px-[1rem] flex items-center justify-center text-center "
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Display Skill Assessment Details */}
                  {Array.isArray(job.skillAssessment) &&
                    job.skillAssessment.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">
                          Skill Assessment:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-500">
                          {job.skillAssessment.map((assessment, index) => (
                            <li key={index}>{assessment}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className="mt-4">
                    <button
                      onClick={handleApplyClick}
                      className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-xl text-gray-500">
                No jobs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
