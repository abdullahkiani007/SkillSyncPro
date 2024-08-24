const mongoose = require('mongoose');

const jobPerformanceSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  applications: {
    type: Number,
    default: 0,
  },
  hires: {
    type: Number,
    default: 0,
  },
  userViews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      unique: true
    }
  ],
});

jobPerformanceSchema.index({ job: 1, date: 1 }, { unique: true });

const JobPerformance = mongoose.model('JobPerformance', jobPerformanceSchema);
module.exports = JobPerformance;
