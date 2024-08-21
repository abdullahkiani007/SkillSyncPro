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

const TopCompaniesChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchTopCompanies(); // Update with your API endpoint
      console.log("top compnaies are here ", response.data);
      const data = response.data.companies;

      const labels = data.map((entry) => entry.companyName);
      const jobCounts = data.map((entry) => entry.jobCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Job Postings",
            data: jobCounts,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching top companies data:", error);
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
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw} jobs`;
                },
              },
            },
          },
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
  );
};

export default TopCompaniesChart;
