const jobSeekerModel = require("../Models/jobseeker.model");
const userModel = require("../Models/user.model");
const UserService = require("../Services/user.service");
const updateUserService = require("../Services/user.service");
const JobModel = require("../Models/job.model");
const ApplicationModel = require("../Models/application.model");
const CandidateAssessmentModel = require("../Models/candidateAssessment.model");
const ApplicationResultModel = require("../Models/applicationResult.model");

const axios = require("axios");

const companyAssessmentModel = require("../Models/companyAssessment.model");

const jobseekerService = {
  getJobSeeker: async (id) => {
    // const user = await userModel.findById(id);

    const jobSeeker = await jobSeekerModel
      .findOne({ user: id })
      .populate("user");
    return jobSeeker;
  },

  addApplication: async (_id, applicationId) => {
    const jobSeeker = await jobSeekerModel.findByIdAndUpdate(
      _id,
      {
        $push: { applications: applicationId },
      },
      { new: true }
    ); // return the updated document

    return jobSeeker;
  },

  updateJobSeeker: async (id, data) => {
    // id is the user id

    console.log("id ", id);
    console.log("data ", data);

    if (data.user) {
      const user = await UserService.updateUser(id, data.user);
    }
    try {
      const jobseeker = await jobSeekerModel.findOneAndUpdate(
        { user: id },
        data,
        {
          new: true,
        }
      );

      return {
        status: 200,
        data: jobseeker,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getAssessmentByJobId: async (id) => {
    console.log("jobseeker service getAssessmentByJobId", id);
    try {
      const job = await JobModel.findOne({ _id: id });
      if (job) {
        const assessment = await companyAssessmentModel.findOne(
          job.skillAssessment
        );

        return {
          status: 200,
          assessment,
        };
      }

      return {
        status: 404,
        message: "No job found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  startJobApplication: async (userId, jobId) => {
    console.log("JobSeeker service startJobApplication", userId, jobId);

    try {
      // Find the job by id
      const job = await JobModel.findOne({ _id: jobId });

      // Find the job seeker by userId
      const jobSeeker = await jobSeekerModel.findOne({ user: userId });

      // Ensure both the job and job seeker exist
      if (!job) {
        return {
          status: 404,
          message: "Job not found",
        };
      }
      if (!jobSeeker) {
        return {
          status: 404,
          message: "Job seeker not found",
        };
      }

      const existingApplication = await ApplicationModel.findOne({
        job: job._id,
        jobSeeker: jobSeeker._id,
      });

      if (existingApplication) {
        console.log("Application already existing");
        if (
          existingApplication.resume &&
          existingApplication.videoIntroduction
        ) {
          return {
            status: 401,
            message: "You have already Applied",
          };
        }
        return {
          status: 200,
          application: existingApplication,
        };
      }

      // Create the application
      const application = await ApplicationModel.create({
        job: job._id,
        jobSeeker: jobSeeker._id,
      });

      const applicationReport = await ApplicationResultModel.create({
        application: application._id,
      });

      return {
        status: 200,
        application,
        applicationReport,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  submitJobApplication: async (userId, data) => {
    const id = data.job;
    console.log("JobSeeker service submitJobApplication", id, data);

    try {
      // Find the job by id
      const job = await JobModel.findOne({ _id: id });

      // Find the job seeker by userId
      const jobSeeker = await jobSeekerModel.findOne({ user: userId });

      // Ensure both the job and job seeker exist
      if (!job) {
        return {
          status: 404,
          message: "Job not found",
        };
      }
      if (!jobSeeker) {
        return {
          status: 404,
          message: "Job seeker not found",
        };
      }

      const application = await ApplicationModel.findOne({
        _id: data.application_id,
      });

      // Create the application
      application.resume = data.resume;
      application.videoIntroduction = data.videoIntroduction;
      application.status = "Under Review";

      await application.save();

      const applicationReport = await ApplicationResultModel.findOne({
        application: data.application_id,
      });

      applicationReport.similaryScore = data.similarityScore;
      await applicationReport.save();

      // If the job has a skill assessment, create the CandidateAssessment
      if (job.skillAssessment) {
        const candidateAssessment = await CandidateAssessmentModel.create({
          application: application._id,
          companyAssessment: data.skillAssessment.assessmentId,
          answers: data.skillAssessment.answers.map(
            (codeSubmission, index) => ({
              problemId: codeSubmission.problemId,
              code: codeSubmission.code,
              actualOutput: codeSubmission.actualOutput,
              passed: codeSubmission.passed,
              timeSpent: codeSubmission.timeSpent,
              keystrokes: codeSubmission.keystrokes,
              error: codeSubmission.error,
            })
          ),
        });

        application.skillAssessment = candidateAssessment._id;
        await application.save();
      }

      // Add the application to the job seeker's applications array
      await jobSeeker.applications.push(application._id);
      await jobSeeker.save();

      // add jobseeker id to the job applications array
      await job.applications.push(application._id);
      await job.applicants.push(jobSeeker._id);
      await job.save();

      // Return success response with the application details
      return {
        status: 200,
        application,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },
  submitFeedback: async (jobSeekerId, jobId, feedback, rating) => {
    try {
      const jobseeker = await jobSeekerModel.findOne({ user: jobSeekerId });

      if (!jobseeker) {
        return {
          status: 404,
          message: "Jobseeker not found",
        };
      }

      const application = await ApplicationModel.findOne({
        jobSeeker: jobseeker._id,
        job: jobId,
      });
      if (!application) {
        return {
          status: 404,
          message: "Application not found",
        };
      }
      application.jobseekerFeedback = feedback;
      application.jobseekerRating = rating;
      await application.save();
      return {
        status: 200,
        application,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  },
};

module.exports = jobseekerService;
