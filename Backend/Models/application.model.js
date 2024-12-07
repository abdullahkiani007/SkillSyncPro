const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Interview Scheduled",
        "Rejected",
        "Accepted",
      ],
      default: "Applied",
    },
    feedback: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    jobseekerRating: {
      type: Number,
      default: 0,
    },
    jobseekerFeedback: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    videoIntroduction: {
      type: String,
      default: "",
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
    skillAssessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateAssessment",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ jobSeeker: 1, job: 1 }, { unique: true });

const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
module.exports = ApplicationModel;
