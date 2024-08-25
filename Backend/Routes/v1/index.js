const express = require('express');
const jobseekerRoutes = require('./jobseekerRoutes');
const authRoutes = require('./authRoutes');
const employerRoutes = require('./employerRoutes');
const jobRoutes = require('./jobsRoutes');
const fastApiRoutes = require('./fastApiRoutes');
const AdminRoutes = require('./adminRoutes')
const tokenRoutes = require('./tokenRoutes');

const {generatePreSignedUrl} = require('../../Controllers/UserController');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin',AdminRoutes);
router.use('/admin',AdminRoutes);
router.use('/jobseeker', jobseekerRoutes);
router.use('/employer',employerRoutes)
router.use('/jobs',jobRoutes)
router.use('/fastapi',(req,res,next)=>{
    console.log("fastapi routes");
    next();
},fastApiRoutes);
router.use('/token',tokenRoutes);

router.get("/generate-presigned-url",generatePreSignedUrl);


module.exports = router;

