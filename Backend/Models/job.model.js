const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: 
    {
      type: String,
    }
  ,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  location: {
    type: String,
  },
  generateRandomProblem: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: String,
    enum: ['Fresher', '0-2 years', '2-5 years', '5-10 years', '10+ years'],
  },
  skills: [
    {
      type: String
    }],
  skillAssessment:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"CompanyAssessment"
  }
  ,
  salaryRange: {
    type: String,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
  },
  archived: { type: Boolean, default: false }, // Archived jobs will not be shown to job seekers
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSeeker',
    }
  ],
  hired: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
  },
  rejected: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSeeker',
    }
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }
  ],
}, { timestamps: true });

const JobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);
module.exports = JobModel
