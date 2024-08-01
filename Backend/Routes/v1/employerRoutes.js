const express = require('express');

const EmployerRouter = express.Router()
const passport = require('passport');
const employerController = require('../../Controllers/EmployerController');
const companyController = require('../../Controllers/CompanyController');



EmployerRouter.get("/jobs",passport.authenticate('jwt',{session:false}),employerController.getJobs)
EmployerRouter.post("/job",passport.authenticate('jwt',{session:false}),employerController.postJob)

EmployerRouter.get("/dashboard",passport.authenticate('jwt',{session:false}),employerController.getDashboard)

EmployerRouter.get("/employees",passport.authenticate('jwt',{session:false}),companyController.getEmployes)
EmployerRouter.post("/company",passport.authenticate('jwt',{session:false}),companyController.register)
EmployerRouter.get("/company",passport.authenticate('jwt',{session:false}),companyController.getCompany)
EmployerRouter.put("/company",passport.authenticate('jwt',{session:false}),companyController.updateCompany)
module.exports = EmployerRouter;
