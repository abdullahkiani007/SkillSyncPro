import React , {useState , useEffect}from 'react';
import { Typography, Container, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jobseeker from '../../../API/jobseeker';
import { useSelector } from 'react-redux';

const AppliedJobs = () => {
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user);

    const [jobs,setJobs] = useState([]);

  // Static data for applied jobs
  const applications = [
    {
      _id: '1',
      job: {
        _id: '1',
        title: 'Frontend Developer',
        description: 'Develop and maintain web applications using React.js.',
        company: 'Tech Corp',
        location: 'New York, NY',
      },
      status: 'Under Review',
      resume: 'resume1.pdf',
      coverLetter: 'Looking forward to joining your team!',
      interview: {
        date: '2024-05-25',
      },
    },
    {
      _id: '2',
      job: {
        _id: '2',
        title: 'Backend Developer',
        description: 'Build and maintain server-side applications with Node.js.',
        company: 'Innovatech',
        location: 'San Francisco, CA',
      },
      status: 'Applied',
      resume: 'resume2.pdf',
      coverLetter: '',
      interview: null,
    },
    {
      _id: '3',
      job: {
        _id: '3',
        title: 'Data Scientist',
        description: 'Analyze data and build predictive models.',
        company: 'Data Insights',
        location: 'Austin, TX',
      },
      status: 'Interview Scheduled',
      resume: 'resume3.pdf',
      coverLetter: 'Excited about the opportunity to work with your team!',
      interview: {
        date: '2024-06-01',
      },
    },
  ];

  useEffect(()=>{
  const Jobs = localStorage.getItem("jobs")
  if(Jobs){
    console.log(JSON.parse(Jobs));

    const jobItems = JSON.parse(Jobs).filter((job) => {
      return job.applicants.includes(user._id)
    })
    setJobs(jobItems);
    // console.log("job state" , job);
  }
},[])

if (jobs.length === 0) {
  return(
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        No Applied Jobs
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/jobseeker/jobs")}>Consider Applying </Button>
    
    </Container>
  
  )
}
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Applied Jobs
      </Typography>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map(application => (
          <Card key={application._id} 
          className="max-w-sm  rounded overflow-hidden shadow-lg hover:cursor-pointer hover:bg-slate-100"
          onClick={() =>navigate("/jobseeker/job/"+application.job._id ) }
          
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {application.job.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {application.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Description: {application.job.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Company: {application.job.company}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Location: {application.job.location}
              </Typography>
              {application.coverLetter && (
                <Typography variant="body2" color="textSecondary">
                  Cover Letter: {application.coverLetter}
                </Typography>
              )}
              {application.interview && (
                <Typography variant="body2" color="textSecondary">
                  Interview Scheduled: {application.interview.date}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default AppliedJobs;
