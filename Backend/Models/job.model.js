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
  requirements: [
    {
      type: String,
    }
  ],
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
  salaryRange: {
    type: String,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSeeker',
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
