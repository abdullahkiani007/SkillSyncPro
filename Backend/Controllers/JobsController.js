const Job = require("../Services/jobs.service"); // Ensure the path is correct
const { ObjectId } = require("mongoose").Types;

const JobsController = {
  async getJobs(req, res) {
    console.log("Fetching jobs...");
    let { role } = req.query;
    if (!role) role = "employer"; // Default role is employer
    try {
      const jobs = await Job.getJobs(role);
      return res.status(200).json({ jobs });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAllJobs(req, res) {
    const { id } = req.query;
    try {
      const jobs = await Job.getAllJobs(id);
      return res.status(200).json({ jobs });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getJob(req, res) {
    const { id } = req.query;
    try {
      const job = await Job.getJob(id);
      return res.status(200).json({ job });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getJobDescription(req, res) {
    const { id } = req.query;
    try {
      const job = await Job.getJobDescription(id);
      return res.status(200).json({ job });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAppliedJobs(req, res) {
    const { id } = req.user;
    try {
      const jobs = await Job.getAppliedJobs(id);
      return res.status(200).json({ jobs: jobs.jobs });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getApplications(req, res) {
    const { id } = req.user;
    try {
      const jobs = await Job.getApplications(id);
      return res.status(200).json({ jobs: jobs.jobseeker.applications });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async trackJobView(req, res) {
    const { jobId, userId } = req.query; // Assuming jobId is passed as a URL parameter
    console.log("jobId", jobId, " userId", userId);
    try {
      await Job.trackJobView(jobId, userId);
      return res
        .status(200)
        .json({ message: "Job view tracked successfully." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async trackJobApplication(req, res) {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
      await Job.trackJobApplication(jobId);
      return res
        .status(200)
        .json({ message: "Job application tracked successfully." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async trackJobHire(req, res) {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
      await Job.trackJobHire(jobId);
      return res
        .status(200)
        .json({ message: "Job hire tracked successfully." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getJobPerformance(req, res) {
    console.log("Fetching job performance...");
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    const { startDate, endDate } = req.query; // Assuming startDate and endDate are passed as query parameters
    try {
      const performance = await Job.getJobPerformance(
        jobId,
        new Date(startDate),
        new Date(endDate)
      );
      return res.status(200).json({ performance });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getJobPerformanceByDate(req, res, next) {
    console.log("Fetching job performance by date...");
    const { companyId } = req.params;
    const { startDate, endDate, jobId } = req.query;
    try {
      const performance = await Job.getJobPerformanceByDate(
        companyId,
        jobId,
        startDate,
        endDate
      );
      console.log("performance is ", performance);
      // return res.status(200).json({performance});
      return res.status(200).json({
        performance: [
          {
            _id: {
              job_id: new ObjectId("66c382557cd63d7228aba2c7"),
              date: new Date("2024-08-23T19:00:00.000Z"),
            },
            views: 1,
            applications: 0,
            hires: 0,
          },
          {
            _id: {
              job_id: new ObjectId("66c382557cd63d7228aba2c8"),
              date: new Date("2024-08-24T19:00:00.000Z"),
            },
            views: 5,
            applications: 2,
            hires: 1,
          },
          {
            _id: {
              job_id: new ObjectId("66c382557cd63d7228aba2c9"),
              date: new Date("2024-08-25T19:00:00.000Z"),
            },
            views: 3,
            applications: 1,
            hires: 0,
          },
          {
            _id: {
              job_id: new ObjectId("66c382557cd63d7228aba2ca"),
              date: new Date("2024-08-26T19:00:00.000Z"),
            },
            views: 10,
            applications: 4,
            hires: 2,
          },
          {
            _id: {
              job_id: new ObjectId("66c382557cd63d7228aba2cb"),
              date: new Date("2024-08-27T19:00:00.000Z"),
            },
            views: 7,
            applications: 3,
            hires: 1,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = JobsController;
