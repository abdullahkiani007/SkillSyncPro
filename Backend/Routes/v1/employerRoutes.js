const express = require('express');

const EmployerRouter = express.Router()
const passport = require('passport');
const employerController = require('../../Controllers/EmployerController');
const companyController = require('../../Controllers/CompanyController');
const JobsController = require('../../Controllers/JobsController');





EmployerRouter.get("/jobs",passport.authenticate('jwt',{session:false}),employerController.getJobs)
EmployerRouter.post("/job",passport.authenticate('jwt',{session:false}),employerController.postJob)
EmployerRouter.get("/job",passport.authenticate('jwt',{session:false}),JobsController.getJob)
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
EmployerRouter.delete("/company/leave",passport.authenticate('jwt',{session:false}),companyController.leaveCompany)
EmployerRouter.put("/company/employee/authorize",passport.authenticate('jwt',{session:false}),companyController.authorizeEmployee)
EmployerRouter.delete("/company/employee/revoke",passport.authenticate('jwt',{session:false}),companyController.revokeEmployee)
EmployerRouter.delete("/company/employee/JoinRequest",passport.authenticate('jwt',{session:false}),companyController.deleteJoinRequest)


EmployerRouter.post("/assessment",passport.authenticate('jwt',{session:false}),employerController.createAssessment)
EmployerRouter.get("/assessments",passport.authenticate('jwt',{session:false}),companyController.getAssessment)
EmployerRouter.get("/assessment",passport.authenticate('jwt',{session:false}),employerController.getAssessmentById)
EmployerRouter.put("/assessment",passport.authenticate('jwt',{session:false}),employerController.editAssessment)
EmployerRouter.delete("/assessment",passport.authenticate('jwt',{session:false}),employerController.deleteAssessment)



// job application routes
EmployerRouter.get("/applicationsStatus",passport.authenticate('jwt',{session:false}),employerController.getApplicationsGrouptedByStatus)
EmployerRouter.get("/candidates",passport.authenticate('jwt',{session:false}),employerController.getAllCandidates)
EmployerRouter.get("/candidates/job",passport.authenticate('jwt',{session:false}),employerController.getCandidatesByJobId)

EmployerRouter.get("/application",
    passport.authenticate('jwt',{session:false}),
    employerController.getApplication)
// EmployerRouter.put("/application",passport.authenticate('jwt',{session:false}),employerController.updateApplication)
EmployerRouter.put("/application/stage",passport.authenticate('jwt',{session:false}),employerController.updateApplicationStage)


// job notes
EmployerRouter.post('/note',passport.authenticate('jwt',{session:false}), employerController.createJobNote);

// Route to get notes for a specific job
EmployerRouter.get('/note/:jobId',passport.authenticate('jwt',{session:false}), employerController.getNotesForJob);

// Route to delete a specific note
EmployerRouter.delete('/note/:noteId',passport.authenticate('jwt',{session:false}), employerController.deleteNote);
module.exports = EmployerRouter;
