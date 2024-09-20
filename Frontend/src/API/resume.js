import ApiClient from "./ApiClient";

class ResumeApi {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/resume/");
  }

  async checkSimilarity(resume) {
    try {
      const response = await this.apiClient.post("calculate_similarity", 
        resume,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error checking similarity:", error);
      throw error;
    }
  }

    async tailorResume(resume) {
        try {
        const response = await this.apiClient.post("tailor_resume",
            resume,{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
        return {
            data: response.data,
            status: response.status,
        };
        } catch (error) {
        console.error("Error tailoring resume:", error);
        throw error;
        }
    }
  
}


export default new ResumeApi();