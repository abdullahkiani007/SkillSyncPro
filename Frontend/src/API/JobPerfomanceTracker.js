import axios from "axios";
import ApiClient from "./ApiClient";

class JobPerformanceTracker {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/jobs");
  }

  // Track a job view by a user
  async trackJobView(jobId, userId) {
    try {
      const response = await this.apiClient.post(
        `/track-view?jobId=${jobId}&userId=${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error tracking job view:", error);
      throw error;
    }
  }

  // Track a job application
  async trackJobApplication(jobId) {
    try {
      const response = await this.apiClient(
        `/track-application/${jobId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error tracking job application:", error);
      throw error;
    }
  }

  // Track a job hire
  async trackJobHire(jobId) {
    try {
      const response = await this.apiClient(
        `/track-hire/${jobId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error tracking job hire:", error);
      throw error;
    }
  }

  // Get job performance data
  async getJobPerformance(jobId, startDate, endDate) {
    try {
      const response = await this.apiClient.get(`/performance/${jobId}`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error retrieving job performance:", error);
      throw error;
    }
  }

  async getJobPerformanceByDate(companyId, startDate, endDate , job) {
    console.log("company id is ", companyId);
    console.log("start date is ", startDate);
    console.log("end date is ", endDate);
    console.log("Selected job is ", job)
    try {
      const response = await this.apiClient.get(
        `/performanceByDate/${companyId}?startDate=${startDate}&endDate=${endDate}&jobId=${job}`,
        {
          params: {
            companyId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error retrieving job performance:", error);
      throw error;
    }
  }
}

export default new JobPerformanceTracker();
