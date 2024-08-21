import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import admin from "../../../API/admin";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobPostingsByLocationBarChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchJobsByLocation();
      const data = response.data.locations;

      console.log("Job postings by location data:", data);

      const labels = data.map((entry) => entry._id);
      const counts = data.map((entry) => entry.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Job Postings",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching job postings by location data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container bg-white p-2 shadow-md rounded-md w-full h-[300px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Location",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Job Postings",
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default JobPostingsByLocationBarChart;
