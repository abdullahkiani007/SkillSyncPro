import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import admin from "../../../API/admin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const JobPostingsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const fetchData = async (fromDate, toDate) => {
    try {
      const response = await admin.fetchJobsOverTime(fromDate, toDate);
      console.log("response in jobposting chart api call", response.data.jobs);
      const data = response.data.jobs;

      const labels = data.map((entry) => entry._id); //switched from date to _id
      const jobCounts = data.map((entry) => entry.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Job Postings Over Time",
            data: jobCounts,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching job postings data:", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData(
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );
    }
  }, [startDate, endDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex space-x-5  mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="text-xs w-40 p-0 m-0"
            label="From Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To Date"
            className="text-xs w-40"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="chart-container bg-white p-2 shadow-md rounded-md w-full h-[300px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobPostingsChart;
