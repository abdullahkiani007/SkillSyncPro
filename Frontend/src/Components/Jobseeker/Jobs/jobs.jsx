import React, { useState, useEffect } from 'react';
import JobSeekerController from '../../../API/jobseeker';
import JobCard from './JobCard';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobFilter from './JobFilter';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [showRecommended, setShowRecommended] = useState(false); // State for toggle
  const [searchParams] = useSearchParams();

  const userId = useSelector((store) => store.user)._id;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data } = await JobSeekerController.getJobs();

        let jobs = data.jobs.filter((job) => !job.archived);
        const formData = new FormData();
        formData.append('user_id', userId);

        const recommendedJobsResponse = await JobSeekerController.getRecommendedJbs(formData);
        console.log('recommendedJobs: ', recommendedJobsResponse);

        // Sort recommended jobs on the basis of similarity score
        recommendedJobsResponse.recommended_jobs.sort((a, b) => b.similarity_score - a.similarity_score);

        // Extract recommended job IDs from the response
        const recommendedJobIds = recommendedJobsResponse.recommended_jobs.map(job => job.job_id);
        console.log('Recommended Job IDs: ', recommendedJobIds);

        // Filter jobs based on recommended IDs and add similarity score to each job
        const filteredRecommendedJobs = jobs
          .filter((job) => recommendedJobIds.includes(job._id))
          .map((job) => {
            const recommendedJob = recommendedJobsResponse.recommended_jobs.find(rj => rj.job_id === job._id);
            return { ...job, similarity_score: recommendedJob.similarity_score };
          });

        console.log('filteredRecommendedJobs: ', filteredRecommendedJobs);

        setJobs(jobs);
        setRecommendedJobs(filteredRecommendedJobs);
        localStorage.setItem('jobs', JSON.stringify(jobs));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  useEffect(() => {
    filterJobs();
  }, [searchParams, jobs]);

  const filterJobs = () => {
    let filtered = [...jobs];

    // Filtering by query params (as you have implemented)
    const requirements = searchParams.get('requirements');
    const company = searchParams.get('company');
    const location = searchParams.get('location');
    const salaryRange = searchParams.get('salaryRange');
    const employmentType = searchParams.get('employmentType');
    const applicants = searchParams.get('applicants');

    if (requirements) {
      filtered = filtered.filter((job) =>
        job.requirements?.toLowerCase().includes(requirements?.toLowerCase())
      );
    }

    if (company) {
      filtered = filtered.filter((job) =>
        job.company?.toLowerCase().includes(company?.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location?.toLowerCase())
      );
    }

    if (salaryRange) {
      const [minSalary, maxSalary] = salaryRange.split('-');
      filtered = filtered.filter((job) => {
        const salary = parseInt(job.salaryRange.replace(/[^0-9]/g, ''));
        return salary >= minSalary && salary <= maxSalary;
      });
    }

    if (employmentType) {
      filtered = filtered.filter((job) =>
        job.employmentType
          ?.toLowerCase()
          .includes(employmentType?.toLowerCase())
      );
    }

    if (applicants) {
      filtered = filtered.filter(
        (job) => job.applicants.length <= parseInt(applicants)
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className='font-sans flex flex-col min-h-screen bg-gray-100'>
      <div className='p-5'>
        <JobFilter />
        <div className='p-5 rounded-lg '>
        <div className='text-4xl font-bold my-4'>Jobs</div>
          <div className='flex justify-between items-center mb-5'>
            
            <div className='flex space-x-2 items-center'>
              <label htmlFor='show-recommended' className='font-semibold'>
                Show Recommended Jobs Only:
              </label>
              <input
                type='checkbox'
                id='show-recommended'
                checked={showRecommended}
                onChange={() => setShowRecommended(!showRecommended)}
              />
            </div>
            <div className='text-lg font-bold'>
            Totol Jobs:  {(showRecommended
                ? recommendedJobs.length
                : filteredJobs.length) || 0}
            </div>
          </div>
          <div className='flex flex-wrap justify-around'>
            {(showRecommended ? recommendedJobs : filteredJobs).map((job) => (
              <JobCard key={job._id} props={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;