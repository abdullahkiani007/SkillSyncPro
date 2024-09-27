import ApiClient from './ApiClient'; // Import the ApiClient class

class JobseekerController {
  constructor() {
    // Initialize the ApiClient with the base URL
    this.apiClient = new ApiClient("http://localhost:3000/api/v1");
    this.fastApiClient = new ApiClient("http://localhost:8000/")
  }

  // Get all jobs
  async getJobs() {
    try {
      const response = await this.apiClient.get("/jobs");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  async getRecommendedJbs(user_id){
    try{
      const response = await this.fastApiClient.post("recommend-jobs",user_id)

      return response.data;
      
    }catch(err){
      console.log(err);
      return {status: 500 , message: "Internal server error"}
    }
  }

  // Get a specific job description by ID
  async getJobDescription(id) {
    try {
      const response = await this.apiClient.get(`/jobs/description?id=${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching job description:", error);
      return { status: 500, message: "Internal server error" };
    }
  }

  // Apply to a job
  async applyJob(data, token) {
    try {
      const response = await this.apiClient.post("/jobseeker/job/apply", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error applying for job:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Get all applied jobs for a job seeker
  async getAppliedJobs(token) {
    try {
      const response = await this.apiClient.get("/jobseeker/jobs/applied", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Get all applications
  async getApplications(token) {
    try {
      const response = await this.apiClient.get("/jobseeker/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching applications:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Get all companies
  async getCompanies() {
    try {
      const response = await this.apiClient.get("/jobseeker/companies");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching companies:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Get a specific assessment by ID
  async getAssessmentById(id) {
    try {
      const response = await this.apiClient.get(`/jobseeker/assessment?id=${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching assessment:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Start a job application
  async startApplication(jobId, token) {
    try {
      const response = await this.apiClient.post(
        "/jobseeker/startApplication",
        { jobId },
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
      console.error("Error starting application:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  // Submit a job application
  async submitApplication(data, token) {
    try {
      const response = await this.apiClient.post(
        "/jobseeker/submitApplication",
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
      console.error("Error submitting application:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  async uploadResume(userId , file) {
    console.log("Uploading resume to backend", file , userId)
    try {
      // Create a FormData object to send file and user_id
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('file', file);
  
      // Make a POST request to the FastAPI backend
      const response = await this.fastApiClient.post('/upload_resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      return response.data;

    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume.');
    }
  }
  
}

export default new JobseekerController();
