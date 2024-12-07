const AdminRouter = require('express').Router()
const passport = require('passport')
const adminController = require('../../Controllers/AdminController')

AdminRouter.get(
  '/jobsOverTime',
  // passport.authenticate('jwt',{session:false}),
  adminController.fetchJobsOverTime
)

AdminRouter.get('/jobApplications', adminController.fetchJobApplications)
AdminRouter.get(
  '/topComapaniesByJobPosts',
  adminController.fetchTopCompaniesByJobPostings
)
AdminRouter.get(
  '/jobSeekerRegistrations',
  adminController.fetchJobSeekerRegistrationOverTime
)
AdminRouter.get(
  '/EmploymentTypesDistribution',
  adminController.fetchEmploymentTypesDistribution
)
AdminRouter.get('/salaryRange', adminController.fetchSalaryRangeDistribution)
AdminRouter.get('/jobLocations', adminController.fetchJobPostingsByLocation)
AdminRouter.get('/jobs', adminController.getJobsForAdmin)
AdminRouter.get('/jobSeekers', adminController.getJobSeekersForAdmin)
AdminRouter.get('/employees', adminController.getAllEmployees)
AdminRouter.get('/employees/:id', adminController.getEmployeeDetails)
AdminRouter.get('/companies', adminController.getCompanies)
AdminRouter.get('/company', adminController.getCompanyDetails)
AdminRouter.put('/company/authorize', adminController.authorizeCompany)

module.exports = AdminRouter
