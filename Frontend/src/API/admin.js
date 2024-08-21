import ApiClient from "./ApiClient";

class Admin {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/admin");
  }

  async fetchJobsOverTime(fromDate, toDate) {
    try {
      const response = await this.apiClient.get(
        `jobsOverTime?from=${fromDate}&to=${toDate}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching jobs over time:", error);
      throw error;
    }
  }

  async fetchJobApplications() {
    try {
      const response = await this.apiClient.get("/jobApplications");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      console.error("Error fetching job applications", err);
      throw err;
    }
  }

  async fetchTopCompanies() {
    try {
      const response = await this.apiClient.get("/topComapaniesByJobPosts");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching top companies", error);
      throw error;
    }
  }

  async fetchJobSeekerRegistrations(from, to) {
    try {
      const response = await this.apiClient.get(
        `/jobSeekerRegistrations?from=${from}&to=${to}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching top companies", error);
      throw error;
    }
  }

  async fetchEmploymentTypeDistribution() {
    try {
      const response = await this.apiClient.get(`/EmploymentTypesDistribution`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching Employment types", error);
      throw error;
    }
  }

  async fetchSalaryDistribution() {
    try {
      const response = await this.apiClient.get(`/salaryRange`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching Salary Range Distribution", error);
      throw error;
    }
  }

  async fetchJobsByLocation() {
    try {
      const response = await this.apiClient.get(`/jobLocations`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching Job locations", error);
      throw error;
    }
  }
}

export default new Admin();
