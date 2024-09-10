import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import resumeApi from '../../../API/resume'

const TailorResume = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tailoredResume, setTailoredResume] = useState('');
  const [similarityIndex, setSimilarityIndex] = useState('');

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = async (event, calculateSimilarity = false) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);
    let response;

    try {
      // Make API call to tailor resume or calculate similarity
      const url = calculateSimilarity
        ? response = await resumeApi.checkSimilarity(formData)
        : response = await resumeApi.tailorResume(formData);

        console.log(response);

      if (calculateSimilarity) {
        setSimilarityIndex(response.data.similarity);
      } else {
        setTailoredResume(response.data.tailored_resume);
      }
    } catch (error) {
      console.error('Error processing request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-40 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-primary">Tailor Your Resume</h1>
      <p className="text-center text-gray-600 mb-8">
        Upload your job description and resume in PDF format to get a customized resume or calculate similarity.
      </p>
      <form className="space-y-6">
        <div>
          <TextField
            label="Job Description"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={jobDescription}
            onChange={handleUpload}
            placeholder="Paste the job description here..."
            className="shadow-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          <input
            accept="application/pdf"
            className="hidden"
            id="resume-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#E14411',
              }}
              component="span"
              startIcon={<CloudUploadIcon />}
              className=" hover:bg-blue-700 text-white"
            >
              Upload Resume (PDF)
            </Button>
          </label>
          {resumeFile && <p className="text-gray-600">{resumeFile.name}</p>}
        </div>
        <div className="text-center space-x-10 mt-20">
          <Button
            onClick={(e) => handleSubmit(e, false)}
            variant="contained"
            disabled={loading}
            sx={{
              color: 'white',
              backgroundColor: '#E14411',
              '&:hover': {
                backgroundColor: '#E14411',
              },
            }}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : 'Tailor Resume'}
          </Button>

          <Button
            onClick={(e) => handleSubmit(e, true)}
            variant="contained"
            disabled={loading}
            sx={{
              color: 'white',
              backgroundColor: '#E14411',
              '&:hover': {
                backgroundColor: '#E14411',
              },
            }}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : 'Calculate Similarity'}
          </Button>
        </div>
      </form>

      {tailoredResume && (
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Tailored Resume</h2>
          <div className="prose">
            <ReactMarkdown>{tailoredResume}</ReactMarkdown>
          </div>
        </div>
      )}

      {similarityIndex && (
        <div className="mt-6 bg-blue-100 p-6 rounded-lg shadow-inner text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Similarity Index</h2>
          <p className="text-3xl text-blue-600">{similarityIndex} / 100</p>
        </div>
      )}
    </div>
  );
};

export default TailorResume;
