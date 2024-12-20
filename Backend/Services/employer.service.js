// const Employer = require('../models/employer.model');
const Job = require("../Models/job.model");
const UserService = require("./user.service");
const CompanyService = require("./company.service");
const Employer = require("../Models/employer.model");
const Assessment = require("../Models/companyAssessment.model");
const Company = require("../Models/company.model");
const CandidateAssessment = require("../Models/candidateAssessment.model");
const Application = require("../Models/application.model");
const ApplicationResultModel = require("../Models/applicationResult.model");
const JobNote = require("../Models/jobNote.model");

const EmployerServices = {
  async getJobs(id) {
    let jobs;
    try {
      // check if user is employer or admin of company
      const company = await CompanyService.getCompanybyUserId(id);

      jobs = await Job.find({ company: company.data._id });

      if (jobs) {
        // Calculate cumulative rating for each job
        const jobsWithRatings = await Promise.all(
          jobs.map(async (job) => {
            const applications = await Application.find({ job: job._id });
            const totalRating = applications.reduce(
              (acc, application) => acc + (application.rating || 0),
              0
            );
            const averageRating = applications.length
              ? totalRating / applications.length
              : 0;
            return {
              ...job.toObject(),
              averageRating,
            };
          })
        );

        console.log(jobsWithRatings);
        return {
          status: 200,
          jobs: jobsWithRatings,
        };
      } else {
        return {
          status: 404,
          message: "No jobs Exists",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  async createJob(_id, req) {
    const {
      title,
      description,
      employmentType,
      experienceLevel,
      requirements,
      skillAssessment,
      company,
      skills,
      salaryRange,
      location,
      generateRandomProblem,
    } = req;

    let job;
    const empID = await Employer.findOne({ user: _id });

    try {
      job = new Job({
        title,
        description,
        requirements,
        employmentType,
        location,
        postedBy: empID._id,
        company,
        skillAssessment,
        skills,
        salaryRange,
        experienceLevel,
        generateRandomProblem,
      });
      await job.save();
      CompanyService.addJob(company, job._id);

      return {
        status: 200,
        data: job,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },
  async getDashboard(_id) {
    let jobs;
    const company = await CompanyService.getCompanybyUserId(_id);
    if (company.status === 200)
      try {
        jobs = await Job.find({ company: company.data._id });

        if (jobs) {
          return {
            status: 200,
            jobs: jobs,
            company: company.data,
          };
        } else {
          return {
            status: 404,
            message: "No jobs Exists",
          };
        }
      } catch (err) {
        console.log(err);
        return {
          status: 500,
          message: "Internal server error",
        };
      }
    else {
      return {
        status: 404,
        message: "Company not found",
      };
    }
  },

  async getEmployer(id) {
    try {
      const employer = await Employer.findOne({ user: id }).populate("user");
      if (employer) {
        return {
          status: 200,
          employer,
        };
      } else {
        return {
          status: 404,
          message: "Employer not found",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  updateEmployer: async (id, data) => {
    // id is the user id

    console.log("id ", id);
    console.log("data ", data);

    if (data.user) {
      const user = await UserService.updateUser(id, data.user);
    }
    try {
      const employer = await Employer.findOneAndUpdate({ user: id }, data, {
        new: true,
      });

      return {
        status: 200,
        employer,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  createAssessment: async (_id, data) => {
    console.log("data: ", data);
    const { title, description, language, timeLimit, problems } = data;

    try {
      const employer = await Employer.findOne({ user: _id });
      const assessment = await Assessment.create({
        title,
        description,
        language,
        timeLimit,
        createdBy: _id,
        company: employer.company,
        problems,
      });
      if (assessment) {
        return {
          status: 200,
          assessment,
        };
      } else {
        return {
          status: 500,
          message: "Error creating assessment",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  deleteAssessment: async (id) => {
    try {
      const assessment = await Assessment.findByIdAndDelete(id);
      if (assessment) {
        return {
          status: 200,
          message: "Assessment deleted successfully",
        };
      } else {
        return {
          status: 404,
          message: "Assessment not found",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  editAssessment: async (id, data) => {
    try {
      const assessment = await Assessment.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (assessment) {
        return {
          status: 200,
          assessment,
        };
      }
      return {
        status: 404,
        message: "Assessment not found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getAssessment: async (id) => {
    try {
      const assessment = await Assessment.findById(id);
      if (assessment) {
        return {
          status: 200,
          assessment,
        };
      }
      return {
        status: 404,
        message: "Assessment not found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },
  async getApplicationsGroupedByStatus(userId) {
    try {
      const company = await CompanyService.getCompanybyUserId(userId);

      if (company.status === 200) {
        // Get all jobs of the company
        const companyJobs = await Job.find({ company: company.data._id });

        // Fetch all applications for the company's jobs
        const applications = await Application.find({
          job: { $in: companyJobs.map((job) => job._id) },
        });

        if (!applications || applications.length === 0) {
          return {
            status: 404,
            message: "No applications found",
          };
        }

        const applicationStatuses = [
          "Applied",
          "Under Review",
          "Interview Scheduled",
          "Rejected",
          "Accepted",
        ];

        // Initialize groupedApplications with all statuses set to 0
        const groupedApplications = applicationStatuses.reduce(
          (acc, status) => {
            acc[status] = 0;
            return acc;
          },
          {}
        );

        // Group applications by status and count them
        applications.forEach((application) => {
          const status = application.status;
          if (groupedApplications[status] !== undefined) {
            groupedApplications[status]++;
          }
        });

        return {
          status: 200,
          groupedApplications,
        };
      }

      return {
        status: 404,
        message: "Company not found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getJobApplications: async (jobId) => {
    try {
      const applications = await Application.find({ job: jobId })
        .populate("JobSeeker")
        .populate("job");
      if (applications) {
        return {
          status: 200,
          applications,
        };
      }
      return {
        status: 404,
        message: "No applications found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getAllCandidates: async (userId) => {
    try {
      const company = await CompanyService.getCompanybyUserId(userId);

      if (company.status === 200) {
        // Get all jobs of the company
        const companyJobs = await Job.find({ company: company.data._id });

        // Fetch all applications for the company's jobs
        let applications = await Application.find({
          job: { $in: companyJobs.map((job) => job._id) },
        })
          .populate({
            path: "jobSeeker",
            populate: {
              path: "user",
            },
          })
          .populate("job");

        console.log(applications);

        // CandidateName	jobTitle	Applied Date	address	Contact	Email ID	Stage
        const candidates = applications.map((application) => {
          return {
            _id: application._id,
            candidateName:
              application.jobSeeker.user.firstName +
              " " +
              application.jobSeeker.user.lastName,
            jobTitle: application.job.title,
            appliedDate: application.createdAt,
            location: application.job.location,
            contact: application.jobSeeker.user.phone,
            email: application.jobSeeker.user.email,
            stage: application.status,
          };
        });

        return {
          status: 200,
          candidates,
        };
      }

      return {
        status: 404,
        message: "Company not found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getCandidatesByJobId: async (jobId) => {
    try {
      const applications = await Application.find({ job: jobId })
        .populate({
          path: "jobSeeker",
          populate: {
            path: "user",
          },
        })
        .populate("job");

      if (applications) {
        const candidates = await Promise.all(
          applications.map(async (application) => {
            // Fetch the application result for the current application
            const applicationResult = await ApplicationResultModel.findOne({
              application: application._id,
            });
            console.log("application result", applicationResult);

            return {
              _id: application._id,
              candidateName: `${application.jobSeeker.user.firstName} ${application.jobSeeker.user.lastName}`,
              jobTitle: application.job.title,
              appliedDate: application.createdAt,
              location: application.job.location,
              contact: application.jobSeeker.user.phone,
              email: application.jobSeeker.user.email,
              stage: application.status,
              recommendationScore: applicationResult?.recommendationScore || 0, // Default to 0 if not found
              similarityScore: applicationResult?.similarityScore || 0, // Default to 0 if not found
            };
          })
        );

        return {
          status: 200,
          candidates,
        };
      } else {
        return {
          status: 404,
          message: "No applications found for the given job",
        };
      }
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getApplication: async (applicationId) => {
    try {
      const application = await Application.findById(applicationId)
        .populate({
          path: "jobSeeker",
          populate: {
            path: "user",
          },
        })
        .populate("job");

      const candidateAssessment = await CandidateAssessment.findOne({
        application: applicationId,
      }).populate({
        path: "companyAssessment",
        populate: {
          path: "problems", // Populate the embedded problems array
          select: "title description", // Select specific fields from problem
        },
      });

      if (application) {
        return {
          status: 200,
          application: {
            _id: application._id,
            candidateName:
              application.jobSeeker.user.firstName +
              " " +
              application.jobSeeker.user.lastName,
            jobTitle: application.job.title,
            jobDescription: application.job.description,
            appliedDate: application.createdAt,
            location: application.job.location,
            contact: application.jobSeeker.user.phone,
            email: application.jobSeeker.user.email,
            stage: application.status,
            resume: application.resume, // Resume link
            videoIntroduction: application.videoIntroduction, // Video introduction link
            candidateAssessment: candidateAssessment
              ? {
                  _id: candidateAssessment._id,
                  answers: candidateAssessment.answers.map((answer) => {
                    const problem =
                      candidateAssessment.companyAssessment.problems.find((p) =>
                        p._id.equals(answer.problemId)
                      );
                    return {
                      problemTitle: problem
                        ? problem.title
                        : "Problem not found",
                      code: answer.code,
                      passed: answer.passed,
                      timeSpent: answer.timeSpent,
                      keystrokes: answer.keystrokes,
                      error: answer.error,
                    };
                  }),
                  score: candidateAssessment.score,
                  feedback: candidateAssessment.feedback,
                  createdAt: candidateAssessment.createdAt,
                  updatedAt: candidateAssessment.updatedAt,
                }
              : null,
          },
        };
      }

      return {
        status: 404,
        message: "Application not found",
      };
    } catch (err) {
      console.error("Error fetching application:", err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  updateApplicationStage: async (applicationId, stage) => {
    try {
      const application = await Application.findByIdAndUpdate(
        applicationId,
        { status: stage },
        { new: true }
      );
      if (application) {
        return {
          status: 200,
          application,
        };
      }
      return {
        status: 404,
        message: "Application not found",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  // job notes
  addJobNote: async (jobId, authorId, text, isPrivate) => {
    try {
      const note = new JobNote({
        job: jobId,
        author: authorId,
        text,
        isPrivate,
      });

      console.log(
        "note created",
        note.populate("author", "firstName lastName email role profilePicture")
      );

      return await note.save();
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  getJobNotes: async (jobId, userId, showPrivate = false) => {
    const filter = { job: jobId };

    // Filter out private notes unless the current user is the author
    if (!showPrivate) {
      filter.$or = [{ isPrivate: false }, { author: userId }];
    }
    try {
      let notes = await JobNote.find(filter).populate(
        "author",
        "firstName lastName email role profilePicture"
      );
      // console.log("notes ->>" , notes)
      return notes;
    } catch (err) {
      console.log("error", err);
      return {
        message: "internal server error",
      };
    }
  },

  deleteJobNote: async (noteId, userId) => {
    const note = await JobNote.findOne({ _id: noteId, author: userId });
    if (!note) throw new Error("Note not found or unauthorized");
    return await JobNote.deleteOne({ _id: noteId });
  },

  submitFeedback: async (applicationId, feedback, rating) => {
    console.log("feedback", feedback);
    console.log("rating", rating);
    console.log("applicationId", applicationId);

    try {
      if (!feedback || !rating) {
        return {
          status: 400,
          message: "Feedback and rating are required",
        };
      }

      const application = await Application.findById(applicationId);
      if (!application) {
        return {
          status: 404,
          message: "Application not found",
        };
      }

      application.feedback = feedback;
      application.rating = rating;
      await application.save();

      return {
        status: 200,
        message: "Feedback submitted successfully",
      };
    } catch (err) {
      console.error("Error submitting feedback:", err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },

  getJobFeedback: async (jobId, userId) => {
    console.log("jobId", jobId);
    console.log("userId", userId);
    try {
      const applications = await Application.find({ job: jobId }).populate({
        path: "jobSeeker",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
      });

      console.log("applications", applications);

      // Filter applications to get feedback from the specified user
      const userFeedback = applications
        .filter(
          (application) => application.jobSeeker && application.jobSeeker.user
        )
        .map((application) => ({
          userName:
            application.jobSeeker.user.firstName +
            " " +
            application.jobSeeker.user.lastName,
          jobTitle: application.job.title,
          feedback: application.jobseekerFeedback,
          rating: application.jobseekerRating,
        }));

      return {
        status: 200,
        feedbacks: userFeedback,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  },
};

module.exports = EmployerServices;
