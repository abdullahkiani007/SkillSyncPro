import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{job.company}</p>
        <span className="text-gray-500">{job.location}</span>
      </div>
    </div>
  );
};

export default JobCard;
