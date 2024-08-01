import React from 'react';
import JobApplicationForm from './JobApplicationForm';
import { useParams } from 'react-router-dom';

const ApplyPage = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      <JobApplicationForm jobId={id} />
    </div>
  );
};

export default ApplyPage;
