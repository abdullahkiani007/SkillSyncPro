import React,{useState,useEffect} from 'react';
import JobCard from './jobCard';
import { jobsListings } from '../../../../constants';
import employer from '../../../../API/employer';
import Loader from '../../../Loader/Loader';
import { TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom';


const JobListing = () => {
  const [jobs,setJobs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState(''); // Add this line

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchJobs = async()=>{
      try {
        const token = localStorage.getItem('token');
        const response = await employer.getJobs(token);
        if(response.status === 200){
          setJobs(response.data.data);
          console.log(response.data)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs',error);
      }
    }
    fetchJobs();
  },[])

  // Add this function
  const handleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  if (loading) return <Loader/>;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      {/* Add this TextField for the title filter */}
      <TextField label="Filter by title" value={titleFilter} onChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.filter(job => job.title.includes(titleFilter)).map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListing;