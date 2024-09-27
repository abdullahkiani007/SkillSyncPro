import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2' // Import Bar instead of Line
import JobPerfomanceTracker from '../../../../API/JobPerfomanceTracker'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import dayjs from 'dayjs'
import Employer from "../../../../API/employer"

const JobPerformanceChart2 = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      let response = await Employer.getJobs(token);
      let jobs = response.data.data;
      setJobs(jobs);
      if (jobs.length > 0) {
        setSelectedJob(jobs[0]._id); // Automatically select the first job
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchData = async () => {
    console.log("fetching data");
   

    try {
      const company = JSON.parse(localStorage.getItem("company"));
      console.log("start date", startDate);
      console.log("end date", endDate);
      console.log("selected job", selectedJob);

      let data = await JobPerfomanceTracker.getJobPerformanceByDate(
        company._id,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
        selectedJob // Add the selected job to the request
      );

      data = data.performance;

      console.log("data is ", data);

      const labels = data?.map((entry) =>
        new Date(entry._id.date).toLocaleDateString()
      );
      const views = data?.map((entry) => entry.views);
      const applications = data?.map((entry) => entry.applications);
      const hires = data?.map((entry) => entry.hires);

      // Setting the chart data
      setChartData({
        labels,
        datasets: [
          {
            label: 'Views',
            data: views,
            backgroundColor: 'blue',
          },
          {
            label: 'Applications',
            data: applications,
            backgroundColor: 'green',
          },
          {
            label: 'Hires',
            data: hires,
            backgroundColor: 'red',
          },
        ],
      })
    } catch (error) {
      console.error('Error fetching job performance data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(); // Fetch jobs when component mounts
  }, []);

  useEffect(() => {
    if (selectedJob) {
      fetchData(); // Fetch performance data when job, date range changes
    }
  }, [startDate, endDate, selectedJob]);

  return (
    <div
      className='bg-secondary-light'
      style={{
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div>
        <LocalizationProvider
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
          dateAdapter={AdapterDayjs}
        >
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <DatePicker
            className="text-xs w-40 p-0 m-0"
            label="From Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{ input: { color: "#" }, label: { color: "#FFF" } }}
              />
            )}
          />
          <DatePicker
            label="To Date"
            className="text-xs w-40"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{ input: { color: "#FFF" }, label: { color: "#FFF" } }}
              />
            )}
          />

          {/* Job selection dropdown */}
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
  <InputLabel sx={{ color: "#000" }}>Select Job</InputLabel> {/* Label color set to black */}
  <Select
    value={selectedJob || ""} // Ensure selectedJob is updated correctly
    onChange={(e) => {
      console.log("Selected job ID: ", e.target.value); // Log to check selected value
      setSelectedJob(e.target.value); // Update selectedJob state
    }}
    label="Select Job"
    sx={{
      color: "#000",  // Set text color for the selected value to black
      ".MuiOutlinedInput-notchedOutline": {
        // borderColor: "#000" // Border color for the dropdown
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        // borderColor: "#000" // Border color when focused
      },
      ".MuiSvgIcon-root": {
        color: "#000" // Dropdown arrow color
      }
    }}
  >
    {jobs?.map((job) => (
      <MenuItem key={job._id} value={job._id} sx={{ color: "#000" }}>
        {job.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        </div>
        </LocalizationProvider>
        {loading ? <h1>Loading ...</h1> : <Bar data={chartData} />}{' '}
        {/* Replaced Line with Bar */}
      </div>
    </div>
  )
}

export default JobPerformanceChart2
