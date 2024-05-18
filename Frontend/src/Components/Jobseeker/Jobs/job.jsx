import React, { useState } from 'react';
import { Typography, Container, Card, CardContent, Chip, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const jobDetails = {
  title: 'Frontend Developer',
  description: 'Develop and maintain web applications using React.js.',
  requirements: [
    '3+ years of experience in frontend development',
    'Proficiency in React.js and JavaScript',
    'Experience with CSS and responsive design',
    'Strong problem-solving skills',
  ],
  company: 'Tech Corp',
  postedBy: 'John Doe',
  location: 'New York, NY',
  salaryRange: '$70,000 - $90,000',
  employmentType: 'Full-time',
  applicants: [
    {
        _id: '1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@gmail.com',
    },{
        _id: '2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmai.com'
    }
  ],
  application: 
    {
      jobSeeker: 'Jane Smith',
      status: 'Under Review',
      resume: 'resume1.pdf',
      coverLetter: 'Looking forward to joining your team!',
      interview: {
        date: '2024-05-25',
      },
    },
};


const Job = () => {
    const [applied,setApplied] = useState(false);
    const user = useSelector((state) => state.user);
    console.log(jobDetails.applicants.filter((applicant) => applicant._id === user._id))
    if (jobDetails.applicants.find((applicant) => applicant._id === user._id)) {
        setApplied(true);
        }
  return (
    <Container maxWidth="md" className="mt-10">
      <Card className="shadow-2xl">
    
        <CardContent>
            <div>
          <Typography variant="h4" component="h1" className="mb-4">
            {jobDetails.title}
          </Typography>
          {applied && <p className='bg-green-700 text-white px-3 py-2 w-fit rounded-lg my-4'>Already Applied</p>}
            </div>
          <Typography variant="h6" color="textSecondary" className="mb-2">
            {jobDetails.company}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-4">
            {jobDetails.location}
          </Typography>
          <Box className="mb-4">
            <Chip label={jobDetails.employmentType} className="mr-2" />
            <Chip label={jobDetails.salaryRange} />
          </Box>
          <Divider className="my-4" />
          <Typography variant="h6" className="mb-2">
            Job Description
          </Typography>
          <Typography variant="body1" className="mb-4">
            {jobDetails.description}
          </Typography>
          <Typography variant="h6" className="mb-2">
            Requirements
          </Typography>
          <ul className="list-disc ml-5">
            {jobDetails.requirements.map((requirement, index) => (
              <li key={index}>
                <Typography variant="body1">{requirement}</Typography>
              </li>
            ))}
          </ul>
          <Divider className="my-4" />
          { applied?(
            <>
          <Typography variant="h6" className="mb-2">
            Application Status
          </Typography>
          
            <Card  className="mb-4">
              <CardContent>
                {/* <Typography variant="h6" className="mb-2">
                  Applicant: {jobDetails.application.jobSeeker}
                </Typography> */}
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  Status: {jobDetails.application.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  Resume: <a href={jobDetails.application.resume} target="_blank" rel="noopener noreferrer">{jobDetails.application.resume}</a>
                </Typography>
                {jobDetails.application.coverLetter && (
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    Cover Letter: {jobDetails.application.coverLetter}
                  </Typography>
                )}
                {jobDetails.application.interview && (
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    Interview Scheduled: {jobDetails.application.interview.date}
                  </Typography>
                )}
              </CardContent>
            </Card>
            </>):(
            <button className="bg-green-700 text-white px-3 py-2 w-fit rounded-lg my-4">Apply</button>
            )    
            }
          <Divider className="my-4" />
          <Typography variant="body2" color="textSecondary" className="mt-4">
            Posted by: {jobDetails.postedBy}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Applicants: {jobDetails.applicants.length}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Job;
