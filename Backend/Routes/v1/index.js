const express = require('express');
const jobseekerRoutes = require('./jobseekerRoutes');
const authRoutes = require('./authRoutes');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobseeker', jobseekerRoutes);


module.exports = router;

