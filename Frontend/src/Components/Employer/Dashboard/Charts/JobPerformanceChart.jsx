import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import JobPerfomanceTracker from "../../../../API/JobPerfomanceTracker";
import Employer from "../../../../API/employer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import dayjs from "dayjs";

const JobPerformanceChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  // Fetch jobs for the company
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

  // Fetch job performance data
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

      setChartData({
        labels,
        datasets: [
          {
            label: "Views",
            data: views,
            borderColor: "#4FC3F7",
            backgroundColor: "rgba(79, 195, 247, 0.2)",
            fill: true,
          },
          {
            label: "Applications",
            data: applications,
            borderColor: "#81C784",
            backgroundColor: "rgba(129, 199, 132, 0.2)",
            fill: true,
          },
          {
            label: "Hires",
            data: hires,
            borderColor: "#FF8A65",
            backgroundColor: "rgba(255, 138, 101, 0.2)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching job performance data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      className="bg-secondary-light"
      style={{
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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

      {loading ? (
        <h1 style={{ color: "#FFF" }}>Loading ...</h1>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#000",
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#000",
                },
              },
              y: {
                ticks: {
                  color: "#000",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default JobPerformanceChart;
