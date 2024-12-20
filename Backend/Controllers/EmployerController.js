const EmployerServices = require("../Services/employer.service");
const jobService = require("../Services/jobs.service");

const EmployerController = {
  async getJobs(req, res, next) {
    console.log("GET emp/jobs received");
    const { _id } = req.user;

    const response = await EmployerServices.getJobs(_id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      data: response.jobs,
    });
  },
  async getEmployer(req, res, next) {
    console.log("Get /Emp received");
    const { _id } = req.user;

    const response = await EmployerServices.getEmployer(_id);
    console.log("employer response", response, _id);

    if (response.status === 200) {
      return res.status(200).json({
        employer: response.employer,
      });
    } else {
      return res.status(500).json({
        message: "internal server error",
      });
    }
  },

  async updateEmployer(req, res, next) {
    const { _id } = req.user;
    const data = req.body;

    const response = await EmployerServices.updateEmployer(_id, data);
    if (response.status === 200) {
      return res.status(200).json({
        data: response.employer,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  async postJob(req, res, next) {
    console.log("POST emp/jobs received");
    const { _id } = req.user;

    const response = await EmployerServices.createJob(_id, req.body);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }

    res.status(200).json({
      data: response.data,
    });
  },

  async getDashboard(req, res, next) {
    console.log("GET emp/dashboard received");
    const { _id } = req.user;

    const response = await EmployerServices.getDashboard(_id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }

    res.status(200).json({
      jobs: response.jobs,
      company: response.company,
    });
  },

  async createAssessment(req, res, next) {
    console.log("POST emp/assessment received");
    const { _id } = req.user;

    if (!req.body.title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    const response = await EmployerServices.createAssessment(_id, req.body);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }

    res.status(200).json({
      response,
    });
  },

  async getAssessmentById(req, res, next) {
    console.log("GET emp/assessments received");
    const id = req.query.id;

    const response = await EmployerServices.getAssessment(id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }

    res.status(200).json({
      data: response.assessment,
    });
  },

  async editAssessment(req, res, next) {
    console.log("PUT emp/assessments received");
    const id = req.query.id;
    const data = req.body;

    const response = await EmployerServices.editAssessment(id, data);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }

    res.status(200).json({
      data: response.assessment,
    });
  },

  async deleteAssessment(req, res, next) {
    console.log("DELETE emp/assessments received");
    const id = req.query.id;

    const response = await EmployerServices.deleteAssessment(id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      message: "Assessment deleted",
    });
  },

  async archiveJob(req, res, next) {
    console.log("PUT emp/jobs/archive received");
    const JobId = req.query.id;
    const { _id } = req.user;

    const response = await jobService.archiveJobEmployer(JobId, _id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      message: "Job archived",
    });
  },

  async deleteJob(req, res, next) {
    console.log("DELETE emp/jobs received");
    const JobId = req.query.id;
    const { _id } = req.user;

    const response = await jobService.deleteJobEmployer(JobId, _id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      message: "Job deleted",
    });
  },

  // Job Application related functions will be added here

  async getApplicationsGrouptedByStatus(req, res, next) {
    console.log("GET emp/applications received");
    const { _id } = req.user;

    const response = await EmployerServices.getApplicationsGroupedByStatus(_id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      data: response.groupedApplications,
    });
  },

  async getAllCandidates(req, res, next) {
    console.log("GET emp/candidates received");
    const { _id } = req.user;

    const response = await EmployerServices.getAllCandidates(_id);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      candidates: response.candidates,
    });
  },

  async getCandidatesByJobId(req, res, next) {
    console.log("GET emp/candidates/job received");

    const { jobId } = req.query;
    const { _id } = req.user;

    const response = await EmployerServices.getCandidatesByJobId(jobId);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      candidates: response.candidates,
    });
  },

  async getApplication(req, res, next) {
    console.log("GET emp/application received");
    const applicationId = req.query.id;
    const { _id } = req.user;

    const response = await EmployerServices.getApplication(applicationId);
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      data: response.application,
    });
  },

  async updateApplicationStage(req, res, next) {
    console.log("PUT emp/application received");
    const applicationId = req.query.id;
    const { _id } = req.user;
    const { stage } = req.body;

    const response = await EmployerServices.updateApplicationStage(
      applicationId,
      stage
    );
    if (response.status === 500) {
      return res.status(500).json({
        message: response.message,
      });
    } else if (response.status == 404) {
      return res.status(404).json({
        message: response.message,
      });
    }
    res.status(200).json({
      data: response.application,
    });
  },
  // job notes functions
  createJobNote: async (req, res) => {
    console.log("Creating note for job");
    const { jobId, text, isPrivate } = req.body;
    console.log("jobId", jobId, "text", text, "isPrivate", isPrivate);
    const authorId = req.user._id; // Assuming you have user auth in place
    console.log("Author id ", authorId);
    try {
      const note = await EmployerServices.addJobNote(
        jobId,
        authorId,
        text,
        isPrivate
      );
      console.log("Noteee", note);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNotesForJob: async (req, res) => {
    console.log("getting notes for job");
    const { jobId } = req.params;
    const userId = req.user._id;

    try {
      const notes = await EmployerServices.getJobNotes(jobId, userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteNote: async (req, res) => {
    const { noteId } = req.params;
    const userId = req.user._id;

    try {
      await EmployerServices.deleteJobNote(noteId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  submitFeedback: async (req, res) => {
    console.log("in submit feedback");
    // applicatoin/?id="applicationId"

    const { id } = req.query;
    const userId = req.user._id;

    try {
      const feedback = await EmployerServices.submitFeedback(
        id,
        req.body.feedback,
        req.body.rating
      );
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getJobFeedback: async (req, res) => {
    const { id } = req.query;
    const userId = req.user._id;
    try {
      const feedback = await EmployerServices.getJobFeedback(id, userId);

      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = EmployerController;
