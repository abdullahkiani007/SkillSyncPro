import ApiClient from "./ApiClient"; // Adjust the import path as needed

class Controller {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/"); // Initialize with base URL
  }

  async signUp(data) {
    try {
      const response = await this.apiClient.post("auth/signup", data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error signing up:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async login(data) {
    try {
      const response = await this.apiClient.post("auth/login", data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error logging in:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async getProfile(token) {
    try {
      const response = await this.apiClient.get("/jobseeker/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching profile:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async getEmpProfile(token) {
    try {
      const response = await this.apiClient.get("/employer/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching employer profile:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async updateEmpProfile(token, data) {
    try {
      const response = await this.apiClient.put("/employer/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error updating employer profile:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async updateProfile(token, data) {
    try {
      const response = await this.apiClient.put("/jobseeker/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        data: null,
        status: error.response ? error.response.status : 500,
      };
    }
  }

  async getCoordinates(address) {
    const GEOCODING_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
    const GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json";

    try {
      const response = await axios.get(GEOCODING_API_URL, {
        params: {
          q: address,
          key: GEOCODING_API_KEY,
          limit: 1,
        },
      });
      const { results } = response.data;
      if (results.length > 0) {
        return {
          lat: results[0].geometry.lat,
          lng: results[0].geometry.lng,
        };
      }
      return { lat: 0, lng: 0 }; // Default if no result found
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return { lat: 0, lng: 0 }; // Default in case of error
    }
  }

  async generatePresignedUrl(folderName, fileName, fileType) {
    console.log("Sending request to generate presigned URL");
    try {
      const response = await this.apiClient.get("generate-presigned-url", {
        params: {
          fileName,
          fileType,
          folderName,
        },
      });
      console.log("Presigned URL response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      return null;
    }
  }
}

export default new Controller();

