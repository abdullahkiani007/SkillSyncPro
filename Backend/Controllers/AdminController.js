const AdminService = require('../Services/admin.service')

const AdminController = {
  async fetchJobsOverTime(req, res, next) {
    const { from, to } = req.query
    const query = {
      createdAt: {
        ...(from && { $gte: new Date(from) }),
        ...(to && { $lte: new Date(to) }),
      },
    }

    try {
      const jobs = await AdminService.fetchJobsOverTime(query)
      res.status(200).json({ jobs })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async fetchJobApplications(req, res, next) {
    try {
      const applications = await AdminService.fetchJobApplications()
      res.status(200).json({ applications })
    } catch (err) {
      next(err)
      console.log(err)
    }
  },

  async fetchTopCompaniesByJobPostings(req, res, next) {
    try {
      const companies = await AdminService.fetchTopCompaniesByJobPostings()
      res.status(200).json({ companies })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async fetchJobSeekerRegistrationOverTime(req, res, next) {
    const { from, to } = req.query
    try {
      const jobseekers = await AdminService.fetchJobseekerRegistrationsOverTime(
        from,
        to
      )
      res.status(200).json({ jobseekers })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async fetchEmploymentTypesDistribution(req, res, next) {
    try {
      const employmentType =
        await AdminService.fetchEmploymentTypesDistribution()
      res.status(200).json({ employmentType })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async fetchSalaryRangeDistribution(req, res, next) {
    try {
      const salaryRange = await AdminService.fetchSalaryRangeDistribution()
      console.log(salaryRange)
      res.status(200).json({ salaryRange })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async fetchJobPostingsByLocation(req, res, next) {
    try {
      const locations = await AdminService.fetchJobPostingsByLocation()
      console.log(locations)
      res.status(200).json({ locations })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async getJobsForAdmin(req, res, next) {
    try {
      const jobs = await AdminService.getJobsForAdmin()
      res.status(200).json({ jobs })
    } catch (err) {
      next(err)
      console.log(err)
    }
  },

  async getJobSeekersForAdmin(req, res, next) {
    try {
      const jobSeekers = await AdminService.getJobSeekersForAdmin()
      res.status(200).json({ jobSeekers })
    } catch (err) {
      next(err)
      console.log(err)
    }
  },

  async getAllEmployees(req, res, next) {
    try {
      const result = await AdminService.getAllEmployees()
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async getEmployeeDetails(req, res, next) {
    try {
      const result = await AdminService.getEmployeeDetails(req.params.id)
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async archiveEmployee(req, res, next) {
    try {
      const result = await AdminService.archiveEmployee(req.params.id)
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async deleteEmployee(req, res, next) {
    try {
      const result = await AdminService.deleteEmployee(req.params.id)
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async getCompanies(req, res, next) {
    try {
      const result = await AdminService.getAllCompanies()
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async authorizeCompany(req, res, next) {
    const { id } = req.query
    try {
      const result = await AdminService.authorizeCompany(id)
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },

  async getCompanyDetails(req, res, next) {
    console.log('Request received for company details')
    const { id } = req.query
    try {
      const result = await AdminService.getCompanyDetails(id)
      res
        .status(result.status)
        .json(result.data || { message: result.message, error: result.error })
    } catch (error) {
      next(error)
      console.log(error)
    }
  },
}

module.exports = AdminController
