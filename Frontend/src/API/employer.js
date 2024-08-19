import ApiClient from "./ApiClient"; // Import the ApiClient class

class EmployerController {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/employer"); // Create a new instance of the ApiClient class
  }

  async postJob(data, token) {
    try {
      const response = await this.apiClient.post("job", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error posting job:", error);
      throw error;
    }
  }

  async getJobs(token) {
    try {
      const response = await this.apiClient.get("jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  }

  async registerCompany(data, token) {
    try {
      const response = await this.apiClient.post("company", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error registering company:", error);
      throw error;
    }
  }

  async getCompany(token) {
    try {
      const response = await this.apiClient.get("company", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching company:", error);
      throw error;
    }
  }

  async updateCompany(data, token) {
    try {
      const response = await this.apiClient.put("company", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  }

  async getDashboard(token) {
    try {
      const response = await this.apiClient.get("dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      throw error;
    }
  }

  async createAssessment(data, token) {
    try {
      console.log("Sending /post/assessment request");
      console.log(data);
      const response = await this.apiClient.post("assessment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error creating assessment:", error);
      throw error;
    }
  }

  async getAssessments(token, companyId) {
    try {
      console.log("Sending /get/assessments request");
      console.log(companyId);
      const response = await this.apiClient.get(
        `assessments?companyId=${companyId}`,
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
      console.error("Error fetching assessments:", error);
      throw error;
    }
  }

  async deleteAssessment(token, assessmentId) {
    try {
      console.log("Sending /delete/assessment request");
      console.log(assessmentId);
      const response = await this.apiClient.delete(
        `assessment/?id=${assessmentId}`,
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
      console.error("Error deleting assessment:", error);
      throw error;
    }
  }
}

export default new EmployerController();
