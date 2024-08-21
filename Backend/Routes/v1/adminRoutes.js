const AdminRouter = require("express").Router();
const passport = require('passport');
const adminController = require('../../Controllers/AdminController');


AdminRouter.get("/jobsOverTime",
    // passport.authenticate('jwt',{session:false}),
    adminController.fetchJobsOverTime)

AdminRouter.get("/jobApplications", adminController.fetchJobApplications);
AdminRouter.get("/topComapaniesByJobPosts", adminController.fetchTopCompaniesByJobPostings)
AdminRouter.get("/jobSeekerRegistrations", adminController.fetchJobSeekerRegistrationOverTime)
AdminRouter.get("/EmploymentTypesDistribution", adminController.fetchEmploymentTypesDistribution)

module.exports = AdminRouter