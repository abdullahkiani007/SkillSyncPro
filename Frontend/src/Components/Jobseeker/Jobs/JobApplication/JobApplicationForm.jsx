import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import jobseekerController from '../../../../API/jobseeker';


const JobApplicationForm = ({ jobId }) => {
  const [jobSeekerId, setJobSeekerId] = useState('');
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      jobId: jobId,
      resume:"myresume.jpg",
      coverLetter,
    };
    const token = localStorage.getItem('token');
    
    try {
      const response = await jobseekerController.applyJob(application,token)
      if (response.status === 200){
        alert("Applied Successfully");
        setCoverLetter("");

      }
    }catch(err){
      console.log(err)
    }
    
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      {/* <div className="mb-4">
        <TextField
          label="Job Seeker ID"
          variant="outlined"
          fullWidth
          value={jobSeekerId}
          onChange={(e) => setJobSeekerId(e.target.value)}
          required
        />
      </div> */}
      {/* <div className="mb-4">
        <TextField
          label="Resume URL"
          variant="outlined"
          fullWidth
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
        />
      </div> */}
      <div className="mb-4">
        <TextField
          label="Cover Letter"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <Button variant="contained" color="primary" type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
