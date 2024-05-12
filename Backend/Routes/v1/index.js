const express = require('express');
const jobseekerRoutes = require('./jobseekerRoutes');


const router = express.Router();

router.use('/jobseeker', jobseekerRoutes);


module.exports = router;

