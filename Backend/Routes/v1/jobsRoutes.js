const express = require('express');
const router = express.Router();
const jobsController = require('../../Controllers/JobsController');

// Route to get all jobs
router.get('/', jobsController.getJobs);


// Route to track a job view by a user
router.post('/track-view/', jobsController.trackJobView);

// Route to track a job application
router.post('/track-application/:jobId', jobsController.trackJobApplication);

// Route to track a job hire
router.post('/track-hire/:jobId', jobsController.trackJobHire);

// Route to get job performance data
router.get('/performance/:jobId', jobsController.getJobPerformance);
router.get("/performancebyDate/:companyId", jobsController.getJobPerformanceByDate)


module.exports = router;
