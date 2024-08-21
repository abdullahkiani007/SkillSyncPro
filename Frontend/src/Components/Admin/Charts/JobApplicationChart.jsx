import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import admin from "../../../API/admin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobApplicationsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchJobApplications();
      console.log("response in job applications chart api call", response.data);
      const data = response.data.applications;

      const labels = data.map((entry) => entry.title);
      const jobApplications = data.map((entry) => entry.applicationsCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Applications per Job",
            data: jobApplications,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching job applications data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container bg-white p-4 shadow-md rounded-lg w-full h-[300px]">
      <Bar
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
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default JobApplicationsChart;
