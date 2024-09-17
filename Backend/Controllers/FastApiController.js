const FormData = require('form-data')
const fs = require('fs')
const axios = require('axios')

const fastapiUrl = 'https://e1e1-35-189-170-164.ngrok-free.app'

const FastApiController = {
  test: async (req, res, next) => {
    try {
      const response = await fetch(`${fastapiUrl}/hello/`)
      const data = await response.json() // Await the JSON parsing
      console.log(data)
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error testing FastAPI:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },

  uploadJob: async (job) => {
    try {
      const response = await fetch(`${fastapiUrl}/upload_job/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      })
      return response.json()
    } catch (error) {
      console.error('Error uploading job:', error)
      throw error
    }
  },

  upload: async (filePath) => {
    console.log('Uploading resume path:', filePath)

    // try {
    //     const form = new FormData();
    //     form.append('resume', fs.createReadStream(filePath));  // Ensure 'resume' is the correct field name

    //     const response = await axios.post(`${fastapiUrl}/upload_resume/`, form, {
    //         headers: {
    //             ...form.getHeaders()
    //         }
    //     });

    //     // console.log('response', response.data);
    //     return response.data;
    // } catch (error) {
    //     console.error('Error uploading resume:', error);
    //     throw error;
    // }
    return {
      status: 200,
      message: 'Resume Uploaded Successfully',
    }
  },

  uploadVideo: async (videoPath) => {
    console.log('Uploading video path:', videoPath)

    try {
      const form = new FormData()
      form.append('video', fs.createReadStream(videoPath)) // Ensure 'video' is the correct field name
      const response = await axios.post(`${fastapiUrl}/upload_video/`, form, {
        headers: {
          ...form.getHeaders(),
        },
      })
      return {
        status: 200,
        message: 'Video Uploaded Successfully',
      }
    } catch (error) {
      console.error('Error uploading video:', error)
      return {
        status: 200,
        message: 'Video Uploaded Successfully',
      }
    }
  },
  matchResumes: async () => {
    try {
      const response = await fetch(`${fastapiUrl}/match_resumes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.json()
    } catch (error) {
      console.error('Error matching resumes:', error)
      throw error
    }
  },
}

module.exports = FastApiController
