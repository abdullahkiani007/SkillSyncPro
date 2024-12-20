import { data } from "autoprefixer";
import ApiClient from "./ApiClient";
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

  async getJobDetails(token, jobId) {
    try {
      const response = await this.apiClient.get(`job?id=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching job details:", error);
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

  async getAllCompanyNames() {
    try {
      console.log("Sending /get/companies/names request");
      const response = await this.apiClient.get("companies/names");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching companies:", error);
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

  async joinCompany(companyId, token) {
    console.log("access token in here", token);

    try {
      const response = await this.apiClient.post(
        `company/join?id=${companyId}`,
        {},
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
      console.error("Error joining company:", error);
      throw error;
    }
  }

  async leaveCompany(token) {
    console.log("leaving company");
    try {
      const response = await this.apiClient.delete(`/company/leave`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error leaving company:", error);
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

  async getEmployees(token, companyId) {
    try {
      const response = await this.apiClient.get(
        `company/employees?companyId=${companyId}`,
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
      console.error("Error fetching employees:", error);
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

  async authorizeEmployee(token, companyId, employeeId) {
    try {
      const response = await this.apiClient.put(
        `company/employee/authorize`,
        {
          employeeId,
          companyId,
        },
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
      console.error("Error authorizing employee:", error);
      throw error;
    }
  }

  async revokeEmployee(token, companyId, employeeId) {
    try {
      const response = await this.apiClient.delete(`company/employee/revoke`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          companyId,
          employeeId,
        },
      });
    } catch (err) {
      console.log("Error removing employee", err);
      throw err;
    }
  }

  async deleteJoinRequest(token, EmployeeId, companyId) {
    try {
      const response = await this.apiClient.delete(
        `company/employee/joinRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            EmployeeId,
            companyId,
          },
        }
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      console.log("Error removing employee", err);
      throw err;
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

  async updateAssessment(token, assessmentId, assessment) {
    try {
      console.log("Sending /update/assessment request");
      console.log(assessmentId);
      const response = await this.apiClient.put(
        `assessment/?id=${assessmentId}`,
        assessment,
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

  async archiveJob(token, jobId) {
    try {
      console.log("Sending /archive/job request");
      console.log(jobId);
      const response = await this.apiClient.put(
        `/archiveJob?id=${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: response.message,
        status: response.status,
      };
    } catch (error) {
      console.log("Error deleting job ", error);
    }
  }

  async deleteJob(token, jobId) {
    try {
      console.log("Sending /delete/job request");
      console.log(jobId);
      const response = await this.apiClient.delete(`/job?id=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.message,
        status: response.status,
      };
    } catch (error) {
      console.log("Error deleting job ", error);
    }
  }

  async getApplicationsGroupedByStatus(token) {
    try {
      console.log("Sending /get/applications/grouped request");
      const response = await this.apiClient.get("applicationsStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: response.data.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching applications grouped by status:", error);
      throw error;
    }
  }

  async getAllCandidates(token) {
    try {
      console.log("Sending /get/candidates request");
      const response = await this.apiClient.get("candidates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: response.data.candidates,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw error;
    }
  }

  async getCandidatesByJobId(token, jobId) {
    try {
      console.log("Sending /get/candidates/job request");
      const response = await this.apiClient.get(
        `candidates/job?jobId=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data: response.data.candidates,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching candidates by job id:", error);
      throw error;
    }
  }

  async getApplication(applicationId, token) {
    try {
      const response = await this.apiClient.get(
        `application?id=${applicationId}`,
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
      console.error("Error fetching application:", error);
      throw error;
    }
  }

  async updateApplicationStage(applicationId, newStage, token) {
    console.log("Updating application stage to:", newStage);
    console.log("Application ID:", applicationId);
    console.log("Token:", token);

    try {
      const response = await this.apiClient.put(
        `application/stage?id=${applicationId}`,
        { stage: newStage },
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
      console.error("Error updating application stage:", error);
      throw error;
    }
  }

  async getJobReport() {
    const mockData = {
      jobTitle: "Frontend Developer",
      totalApplications: 120,
      shortlisted: 30,
      rejected: 50,
      inProgress: 40,
      averageAge: 28,
      topLocations: ["New York", "San Francisco", "London"],
      educationLevels: {
        Bachelors: 60,
        Masters: 30,
        PhD: 10,
      },
      averageSkillMatch: 75,
      topSkills: ["JavaScript", "React", "CSS"],
      jobViews: 5000,
      clickThroughRate: 4.5,
      skillAssessments: {
        completed: 50,
        averageScore: 80,
      },
      averageTimeToHire: 45,
      currentJobTime: 30,
    };

    return mockData;
  }

  // ================= Job Notes API Functions ================= //
  async getNotesForJob(jobId, token) {
    try {
      const response = await this.apiClient.get(`note/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from parameter
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching notes for job:", error);
      throw error;
    }
  }

  // Create a new note for a job
  async createJobNote(data, token) {
    console.log("Crating note in employ", data);

    try {
      const response = await this.apiClient.post(`note`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from parameter
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error creating job note:", error);
      throw error;
    }
  }

  // Delete a note
  async deleteNote(noteId, token) {
    try {
      const response = await this.apiClient.delete(`note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from parameter
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  async submitFeedback(applicationId, data, token) {
    try {
      const response = await this.apiClient.post(
        `application/feedback?id=${applicationId}`,
        data,
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
      console.error("Error submitting feedback:", error);
      throw error;
    }
  }

  async getJobFeedbacks(jobId, token) {
    try {
      const response = await this.apiClient.get(`job/feedback?id=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching job feedback:", error);
      throw error;
    }
  }
}

export default new EmployerController();
