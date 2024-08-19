const express = require('express');
const jobseekerRoutes = require('./jobseekerRoutes');
const authRoutes = require('./authRoutes');
const employerRoutes = require('./employerRoutes');
const jobRoutes = require('./jobsRoutes');
const fastApiRoutes = require('./fastApiRoutes');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobseeker', jobseekerRoutes);
router.use('/employer',employerRoutes)
router.use('/jobs',jobRoutes)
router.use('/fastapi',(req,res,next)=>{
    console.log("fastapi routes");
    next();
},fastApiRoutes);

module.exports = router;

