const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// FastAPI server URL
const BASE_URL = 'http://localhost:8000';

/**
 * Communicates with the FastAPI route to calculate similarity between resume and job description.
 * @param {String} pdfPath - The path to the resume PDF file.
 * @param {String} jobDescription - The job description string.
 * @returns {Object} - The similarity response from FastAPI.
 */
async function calculateSimilarity(pdfPath, jobDescription) {
  try {
    console.log('Calculating similarity:', pdfPath, jobDescription);
    const formData = new FormData();
    formData.append('pdf', fs.createReadStream(pdfPath));
    formData.append('job_description', jobDescription);

    const response = await axios.post(`${BASE_URL}/calculate_similarity/`, formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error('Error calculating similarity:', error);
    throw error;
  }
}

/**
 * Communicates with the FastAPI route to tailor a resume based on a job description.
 * @param {String} pdfPath - The path to the resume PDF file.
 * @param {String} jobDescription - The job description string.
 * @returns {Object} - The tailored resume response from FastAPI.
 */
async function tailorResume(pdfPath, jobDescription) {
  try {
    const formData = new FormData();
    formData.append('pdf', fs.createReadStream(pdfPath));
    formData.append('job_description', jobDescription);

    const response = await axios.post(`${BASE_URL}/tailor_resume/`, formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error('Error tailoring resume:', error);
    throw error;
  }
}

/**
 * Communicates with the FastAPI route to test audio file upload.
 * @param {String} audioPath - The path to the audio file.
 * @returns {Object} - The response from FastAPI.
 */
async function testAudioUpload(audioPath) {
  try {
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(audioPath));

    const response = await axios.post(`${BASE_URL}/test_audio/`, formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
}

module.exports = {
  calculateSimilarity,
  tailorResume,
  testAudioUpload,
};
