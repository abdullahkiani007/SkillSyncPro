const express = require('express');

const router = express.Router();
const jobsController = require('../../Controllers/JobsController');

router.get("/", jobsController.getJobs);

module.exports = router;

