import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import JobPerfomanceTracker from "../../../../API/JobPerfomanceTracker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const JobPerformanceChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const fetchData = async () => {
    console.log("fetching data");
    setLoading(true);

    try {
      const company = JSON.parse(localStorage.getItem("company"));
      console.log("start date", startDate);
      console.log("end date", endDate);
      let data = await JobPerfomanceTracker.getJobPerformanceByDate(
        company._id,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );

      data = data.performance;

      console.log("data is ", data);

      // Extracting the labels and data from the response
      const labels = data.map((entry) =>
        new Date(entry._id.date).toLocaleDateString()
      );
      const views = data.map((entry) => entry.views);
      const applications = data.map((entry) => entry.applications);
      const hires = data.map((entry) => entry.hires);

      // Setting the chart data
      setChartData({
        labels,
        datasets: [
          {
            label: "Views",
            data: views,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Applications",
            data: applications,
            borderColor: "green",
            fill: false,
          },
          {
            label: "Hires",
            data: hires,
            borderColor: "red",
            fill: false,
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
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
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
      {loading ? <h1>Loading ...</h1> : <Line data={chartData} />}
    </div>
  );
};

export default JobPerformanceChart;
