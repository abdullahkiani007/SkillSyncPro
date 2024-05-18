import React from 'react';
import JobCard from './jobCard';
import { jobsListings } from '../../../../constants';


const JobListing = () => {
  // Sample job data
  
  const jobs = jobsListings
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListing;
