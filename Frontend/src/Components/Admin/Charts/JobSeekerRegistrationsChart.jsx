import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import admin from "../../../API/admin";
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
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const JobseekerRegistrationsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const fetchData = async (fromDate, toDate) => {
    try {
      const response = await admin.fetchJobSeekerRegistrations(
        fromDate,
        toDate
      );
      console.log(response);
      const data = response.data.jobseekers;

      console.log(
        "response from fetch registrations of jobseeker receive :",
        data
      );

      const labels = data.map((entry) => entry._id);
      const registrationCounts = data.map((entry) => entry.registrationCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Jobseeker Registrations Over Time",
            data: registrationCounts,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobseeker registrations data:", error);
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

export default JobseekerRegistrationsChart;
