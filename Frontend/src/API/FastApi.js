import axios from "axios";

class FastApi {
  constructor() {
    this.url = "http://localhost:3000/api/v1/fastapi";
  }

  async uploadResume(formData) {
    console.log("sending request to ", this.url, "/upload_resume/");
    console.log("FormData content:", formData.get("resume")); // Log the file name or contents
    try {
      const response = await axios.post(
        // `${this.url}/upload_resume/`,
        "http://localhost:3000/api/v1/fastapi/upload_resume/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        return response.data;
        alert("Resume uploaded successfully");
      } else {
        alert("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("An error occurred while uploading the resume.");
    }
  }

  async uploadVideo(formData) {
    console.log("sending request to ", this.url, "/upload_video/");
    console.log("FormData content:", formData.get("video")); // Log the file name or contents
    try {
      const response = await axios.post(
        // `${this.url}/upload_video/`,
        "http://localhost:3000/api/v1/fastapi/upload_video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        return response.data;
        alert("Video uploaded successfully");
      } else {
        alert("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video.");
    }
  }

  async uploadJobDescription(desc) {
    console.log("uploading job description");
    try {
      const response = await axios.post(`${this.url}/upload_job/`, desc, {
        contentType: "application/json",
      });

      if (response.status === 200) {
        console.log(response);
        return response.data;
        alert("Job description uploaded successfully");
      } else {
        alert("Failed to upload job description");
        return null;
      }
    } catch (error) {}
  }
}

export default new FastApi();
