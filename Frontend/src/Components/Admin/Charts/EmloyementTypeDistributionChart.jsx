import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import admin from "../../../API/admin";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmploymentTypesDistributionChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchEmploymentTypeDistribution();
      const data = response.data.employmentType;
      console.log(
        "Response received in employment type distribution",
        response.data
      );

      const labels = data.map((entry) => entry._id || "Unknown");
      const counts = data.map((entry) => entry.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Employment Types Distribution",
            data: counts,
            backgroundColor: [
              "rgba(75,192,192,0.4)",
              "rgba(255,99,132,0.4)",
              "rgba(255,159,64,0.4)",
              "rgba(153,102,255,0.4)",
              "rgba(255,205,86,0.4)",
            ],
            borderColor: [
              "rgba(75,192,192,1)",
              "rgba(255,99,132,1)",
              "rgba(255,159,64,1)",
              "rgba(153,102,255,1)",
              "rgba(255,205,86,1)",
            ],
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching employment types distribution data:",
        error
      );
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
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw} Jobs`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default EmploymentTypesDistributionChart;
