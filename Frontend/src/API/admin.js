import ApiClient from "./ApiClient";
import axios from "axios";

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
      console.error("Error fetching job seeker registrations", error);
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
      console.error("Error fetching employment types", error);
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
      console.error("Error fetching salary range distribution", error);
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
      console.error("Error fetching job locations", error);
      throw error;
    }
  }

  async getJobsForAdmin() {
    try {
      const response = await this.apiClient.get(`/jobs`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching jobs for admin", error);
      throw error;
    }
  }

  async getJobSeekersForAdmin(token) {
    try {
      const response = await this.apiClient.get(`/jobseekers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching job seekers for admin", error);
      throw error;
    }
  }

  async getAllEmployees(token) {
    try {
      const response = await this.apiClient.get(`/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching all employees", error);
      throw error;
    }
  }

  async getEmployeeDetails(employeeId, token) {
    try {
      const response = await this.apiClient.get(`/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching employee details", error);
      throw error;
    }
  }

  async getCompanies() {
    try {
      const response = await this.apiClient.get(`/companies`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching companies", error);
      throw error;
    }
  }

  async getCompanies(req, res, next) {
    try {
      const response = await this.apiClient.get(`/companies`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching companies", error);
      throw error;
    }
  }

  async authorizeCompany(companyId, token) {
    try {
      const response = await this.apiClient.put(
        `/company/authorize?id=${companyId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error authorizing company", error);
      throw error;
    }
  }

  async getCompanyDetails(companyId, token) {
    try {
      const response = await this.apiClient.get(`/company?id=${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching company details", error);
      throw error;
    }
  }
}

export default new Admin();
