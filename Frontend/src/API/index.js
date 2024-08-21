import axios from "axios";

class Controller {
  constructor() {
    this.url = "http://localhost:3000/api/v1/";
  }
  async signUp(data) {
    const response = await fetch(this.url + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  }

  async login(data) {
    console.log("/POST login called with data", data);
    const response = await fetch(this.url + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return {
      data: await response.json(),
      status: response.status,
    };
  }

  async getProfile(token) {
    const response = await fetch(this.url + "/jobseeker/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: await response.json(),
      status: response.status,
    };
  }
  async getEmpProfile(token) {
    const response = await fetch(this.url + "/employer/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  }

  async updateEmpProfile(token, data) {
    const response = await fetch(this.url + "/employer/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  }

  async updateProfile(token, data) {
    const response = await fetch(this.url + "/jobseeker/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return {
      data: await response.json(),
      status: response.status,
    };
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
}

export default new Controller();
