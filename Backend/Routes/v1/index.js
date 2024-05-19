const express = require('express');
const jobseekerRoutes = require('./jobseekerRoutes');
const authRoutes = require('./authRoutes');
const employerRoutes = require('./employerRoutes');
const jobRoutes = require('./jobsRoutes');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobseeker', jobseekerRoutes);
router.use('/employer',employerRoutes)
router.use('/jobs',jobRoutes)

module.exports = router;

