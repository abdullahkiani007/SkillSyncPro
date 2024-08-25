const express = require('express');

const EmployerRouter = express.Router()
const passport = require('passport');
const employerController = require('../../Controllers/EmployerController');
const companyController = require('../../Controllers/CompanyController');





EmployerRouter.get("/jobs",passport.authenticate('jwt',{session:false}),employerController.getJobs)
EmployerRouter.post("/job",passport.authenticate('jwt',{session:false}),employerController.postJob)
EmployerRouter.put("/archiveJob",passport.authenticate('jwt',{session:false}),employerController.archiveJob)
EmployerRouter.delete("/job",passport.authenticate('jwt',{session:false}),employerController.deleteJob)

EmployerRouter.get("/dashboard",passport.authenticate('jwt',{session:false}),employerController.getDashboard)
EmployerRouter.get("/profile",passport.authenticate('jwt', {session:false}), employerController.getEmployer)
EmployerRouter.put("/profile",passport.authenticate("jwt",{session:false}), employerController.updateEmployer)

EmployerRouter.get("/company/employees",passport.authenticate('jwt',{session:false}),companyController.getEmployees)
EmployerRouter.post("/company",passport.authenticate('jwt',{session:false}),companyController.register)
EmployerRouter.get("/company",passport.authenticate('jwt',{session:false}),companyController.getCompany)
EmployerRouter.put("/company",passport.authenticate('jwt',{session:false}),companyController.updateCompany)
EmployerRouter.get("/companies/names",companyController.getCompanyNames)
EmployerRouter.post("/company/join",passport.authenticate('jwt',{session:false}),companyController.joinCompany)
EmployerRouter.put("/company/employee/authorize",passport.authenticate('jwt',{session:false}),companyController.authorizeEmployee)

EmployerRouter.post("/assessment",passport.authenticate('jwt',{session:false}),employerController.createAssessment)
EmployerRouter.get("/assessments",passport.authenticate('jwt',{session:false}),companyController.getAssessment)
EmployerRouter.get("/assessment",passport.authenticate('jwt',{session:false}),employerController.getAssessmentById)
EmployerRouter.put("/assessment",passport.authenticate('jwt',{session:false}),employerController.editAssessment)
EmployerRouter.delete("/assessment",passport.authenticate('jwt',{session:false}),employerController.deleteAssessment)

module.exports = EmployerRouter;
