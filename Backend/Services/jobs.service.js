const JobModel = require('../Models/job.model')
const ApplicationModel = require('../Models/application.model')
const JobseekerModel = require('../Models/jobseeker.model')
const JobseekerService = require('../Services/jobSeeker.service')
const UserModel = require('../Models/user.model')
const EmployerModel = require('../Models/employer.model')
const JobPerformance = require('../Models/jobPerfomance.model')
const mongoose = require('mongoose')

const jobDTO = require('../DTO/jobsDTO')
const jobseekerService = require('../Services/jobSeeker.service')
const jobService = {
  getJobs: async () => {
    try {
      const jobs = await JobModel.find().populate('company')
      console.log('jobs in service ', jobs)
      const newJobs = jobs.map((job) => {
        return new jobDTO(job)
      })
      return newJobs
    } catch (error) {
      return { status: 500, message: 'Internal server error' }
    }
  },

  // get all jobs for a jobseeker and add an applied field to each job
  getAllJobs: async (id) => {
    try {
      console.log('Getting all the jobs', id)
      const jobseeker = await JobseekerService.getJobSeeker(id)
      console.log('Jobseeker , ', jobseeker)
      const jobs = await JobModel.find().populate('company')
      console.log('jobs', jobs)
      const newJobs = jobs.map((job) => {
        let applied = job.applicants.includes(jobseeker._id)
        let jobDto = new jobDTO(job)
        jobDto.applied = applied
        return jobDto
      })
      return newJobs
    } catch (err) {
      console.log(err)
      return { status: 500, message: 'Internal server error' }
    }
  },

  getJobDescription: async (id) => {
    try {
      const job = await JobModel.findById(id)
      return {
        description: job.description,
        requirements: job.requirements,
      }
    } catch (err) {
      return { status: 500, message: 'Internal server error' }
    }
  },

  getJob: async (id) => {
    try {
      const job = await JobModel.findById(id).populate('company')
      return {
        job,
      }
    } catch (error) {
      return { status: 500, message: 'Internal server error' }
    }
  },
  addJob: async (jobId, userId, resume, coverLetter) => {
    try {
      const jobseeker = await JobseekerService.getJobSeeker(userId)
      const job = await JobModel.findByIdAndUpdate(
        jobId,
        {
          $push: { applicants: jobseeker._id },
        },
        { new: true }
      )

      const newApplication = {
        job: jobId,
        jobSeeker: jobseeker._id,
        resume,
        coverLetter,
      }
      const application = await ApplicationModel.create(newApplication)
      await jobseekerService.addApplication(jobseeker._id, application._id)
      return {
        status: 200,
        application,
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: 'Internal Server Error',
      }
    }
  },
  getApplications: async (id) => {
    try {
      const jobseekerId = await JobseekerService.getJobSeeker(id)
      const jobseeker = await JobseekerModel.findById(jobseekerId._id).populate(
        'applications'
      )
      return {
        status: 200,
        jobseeker,
      }
    } catch (error) {
      return { status: 500, message: 'Internal server error' }
    }
  },

  getAppliedJobs: async (id) => {
    try {
      const jobseekerId = await JobseekerService.getJobSeeker(id)
      const applications = await ApplicationModel.find({
        jobSeeker: jobseekerId._id,
      }).populate('job')

      let jobs = applications.map((application) => {
        return {
          jobId: application.job._id,
          title: application.job.title,
          company: application.job.company,
          location: application.job.location,
          description: application.job.description,
          status: application.status,
          appliedAt: application.createdAt,
          updatedAt: application.updatedAt,
          resume: application.resume,
          videoIntroduction: application.videoIntroduction,
          feedback: application.feedback,
          rating: application.rating,
        }
      })

      jobs = jobs.filter((job) => {
        return job.resume && job.videoIntroduction
      })

      return {
        status: 200,
        jobs,
      }
    } catch (error) {
      return { status: 500, message: 'Internal server error' }
    }
  },

  //
  archiveJobEmployer: async (jobId, userId) => {
    try {
      const employer = await EmployerModel.findOne({ user: userId })
      const job = await JobModel.findOne({ _id: jobId })

      if (job.company.toString() !== employer.company.toString()) {
        return {
          status: 401,
          message: 'Unauthorized',
        }
      }
      await JobModel.findByIdAndUpdate(jobId, {
        $set: { archived: !job.archived },
      })
      return {
        status: 200,
        message: 'Job archived successfully',
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500,
        message: 'Internal Server Error',
      }
    }
  },

  deleteJobEmployer: async (jobId, userId) => {
    try {
      const employer = await EmployerModel.findOne({ user: userId })
      const job = await JobModel.findOne({ _id: jobId })

      if (job.company.toString() !== employer.company.toString()) {
        return {
          status: 401,
          message: 'Unauthorized',
        }
      }
      await JobModel.findByIdAndDelete(jobId)
      return {
        status: 200,
        message: 'Job deleted successfully',
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500,
        message: 'Internal Server Error',
      }
    }
  },

  trackJobView: async (jobId, userId) => {
    console.log('trackJobView')
    console.log('Job viewed by user', userId)
    try {
      // Set to today's date, midnight
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Find or create a performance record for the job on today's date
      let jobPerformance = await JobPerformance.findOne({
        job: jobId,
        date: today,
      })

      if (!jobPerformance) {
        // If no record exists, create a new one
        jobPerformance = new JobPerformance({
          job: jobId,
          date: today,
          views: 1,
          userViews: [userId],
        })
        console.log('Created new job performance record:', jobPerformance)
      } else {
        // Update existing record
        if (!jobPerformance.userViews.includes(userId)) {
          jobPerformance.userViews.push(userId)
          jobPerformance.views += 1
          console.log(
            'Updated existing job performance record:',
            jobPerformance
          )
        } else {
          console.log('User has already viewed the job today.')
        }
      }
      // Save the updated performance record
      await jobPerformance.save()
      console.log('Saved job performance record.')
    } catch (err) {
      console.error('Error tracking job view:', err)
    }
  },

  trackJobApplication: async (jobId) => {
    try {
      const today = new Date().setHours(0, 0, 0, 0)

      await JobPerformance.findOneAndUpdate(
        { job: jobId, date: today },
        { $inc: { applications: 1 } },
        { upsert: true, new: true }
      )
    } catch (err) {
      console.error('Error tracking job application:', err)
    }
  },

  trackJobHire: async (jobId) => {
    try {
      const today = new Date().setHours(0, 0, 0, 0)

      await JobPerformance.findOneAndUpdate(
        { job: jobId, date: today },
        { $inc: { hires: 1 } },
        { upsert: true, new: true }
      )
    } catch (err) {
      console.error('Error tracking job hire:', err)
    }
  },

  getJobPerformance: async (jobId, startDate, endDate) => {
    try {
      return await JobPerformance.find({
        job: jobId,
        date: { $gte: startDate, $lte: endDate },
      }).sort({ date: 1 })
    } catch (err) {
      console.error('Error retrieving job performance:', err)
    }
  },

  getJobPerformanceByDate: async (companyId, jobId, startDate, endDate) => {
    console.log('In service function of getJobPerformanceByDate')
    console.log('state', companyId, startDate, endDate, jobId)

    const matchCriteria = {
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      'job.company': new mongoose.Types.ObjectId(companyId),
    }

    // If a jobId is provided, add it to the match criteria
    if (jobId) {
      matchCriteria['job._id'] = new mongoose.Types.ObjectId(jobId)
    }

    const performances = await JobPerformance.aggregate([
      {
        $match: {
          date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'job',
          foreignField: '_id',
          as: 'job',
        },
      },
      {
        $unwind: '$job',
      },
      {
        $match: matchCriteria,
      },
      {
        $group: {
          _id: {
            job_id: '$job._id',
            date: '$date',
          },
          views: { $sum: '$views' },
          applications: { $sum: '$applications' },
          hires: { $sum: '$hires' },
        },
      },
      {
        $sort: { '_id.date': 1 },
      },
    ])

    return performances
  },
}

module.exports = jobService
