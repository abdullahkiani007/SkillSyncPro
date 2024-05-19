const express = require('express');

const router = express.Router()
const passport = require('passport');
const employerController = require('../../Controllers/EmployerController');
const companyController = require('../../Controllers/CompanyController');



router.get("/jobs",passport.authenticate('jwt',{session:false}),employerController.getJobs)
router.post("/job",passport.authenticate('jwt',{session:false}),employerController.postJob)


router.post("/company",passport.authenticate('jwt',{session:false}),companyController.register)
router.get("/company",passport.authenticate('jwt',{session:false}),companyController.getCompany)
router.put("/company",passport.authenticate('jwt',{session:false}),companyController.updateCompany)
module.exports = router;
