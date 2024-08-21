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

const SalaryRangeDistributionChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchSalaryDistribution();
      const data = response.data.salaryRange;

      console.log("Salary range distribution data:", data);

      const labels = data.map((entry) =>
        entry._id === "Others" ? "Others" : `$${entry._id}`
      );
      const counts = data.map((entry) => entry.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Jobs",
            data: counts,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching salary range distribution data:", error);
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
                text: "Salary Range",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Jobs",
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

export default SalaryRangeDistributionChart;
