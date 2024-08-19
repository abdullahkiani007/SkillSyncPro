const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  resume: {
    type: String,
  },
  skills: [
    {
      type: String,
    }
  ],
  experience: [
    {
      companyName: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    }
  ],
  certifications: [
    {
      title: String,
      institution: String,
      date: Date,
    }
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }
  ],
}, { timestamps: true });

const JobseekerModel = mongoose.models.JobSeeker ||  mongoose.model('JobSeeker', jobSeekerSchema)

module.exports = JobseekerModel;
