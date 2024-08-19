import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.apiClient = axios.create({
      baseURL: baseURL || "http://localhost:3000/api/v1/",
    });

    // Set up the request interceptor
    this.apiClient.interceptors.request.use(
      async (config) => {
        // Log the interceptor setup
        console.log("Interceptor setup");

        let accessToken = this.getAccessToken();
        console.log("Access token:", accessToken);

        if (this.isTokenExpired(accessToken)) {
          accessToken = await this.refreshToken();
        }

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Get access token from local storage
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // Function to check if the token is expired
  isTokenExpired(token) {
    if (!token) return true;

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const expiration = payload.exp * 1000;
    console.log("Token expiration:", Date.now() > expiration);
    return Date.now() > expiration;
  }

  // Function to refresh the token
  async refreshToken() {
    try {
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle error (e.g., log out user)
    }
  }

  // Example method to make a GET request
  async get(url, config = {}) {
    return this.apiClient.get(url, config);
  }

  // Example method to make a POST request
  async post(url, data, config = {}) {
    return this.apiClient.post(url, data, config);
  }

  // Example method to make a PUT request
  async put(url, data, config = {}) {
    return this.apiClient.put(url, data, config);
  }

  // Example method to make a DELETE request
  async delete(url, config = {}) {
    return this.apiClient.delete(url, config);
  }
}

// Example usage:
// const apiClient = new ApiClient("/api");
// apiClient.get("/company/employees").then(response => console.log(response.data));

export default ApiClient;
