const express = require('express');
const resumeController = require('../../Controllers/TailorResumeController');
const path = require('path');
const upload = require('../../Config/multer');


const ResumeRouter = express.Router();

// Route for calculating similarity
ResumeRouter.post('/calculate_similarity',upload.single('resume') , async (req, res) => {
  // receive form data
  const pdfPath = req.file.path;
  const jobDescription = req.body.jobDescription;

  console.log(pdfPath, jobDescription);
  try {
    const similarity = await resumeController.calculateSimilarity(pdfPath, jobDescription);
    res.json(similarity);
  } catch (error) {
    res.status(500).send('Error calculating similarity');
  }
});

// Route for tailoring resume
ResumeRouter.post('/tailor_resume',upload.single('resume'), async (req, res) => {
  const pdfPath = req.file.path;
  const jobDescription = req.body.jobDescription;

  try {
    const tailoredResume = await resumeController.tailorResume(pdfPath, jobDescription);
    res.json(tailoredResume);
  } catch (error) {
    res.status(500).send('Error tailoring resume');
  }
});

// Route for testing audio upload
ResumeRouter.post('/test_audio', async (req, res) => {
  const audioPath = path.resolve(__dirname, '../uploads/audio.mp3'); // Adjust this path

  try {
    const response = await resumeController.testAudioUpload(audioPath);
    res.json(response);
  } catch (error) {
    res.status(500).send('Error uploading audio');
  }
});

module.exports = ResumeRouter;
