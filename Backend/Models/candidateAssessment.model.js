const mongoose = require('mongoose');

const candidateAssessmentSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  companyAssessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyAssessment',
    required: true,
  },
  answers: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyAssessment.Problem', // Ref to the problem in the CompanyAssessment schema
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    passed:{
      type: Boolean,
      required: true,
    },
    timeSpent: {
      type: Number, // Time spent in milliseconds
    },
    keystrokes: {
      type: Number, // Number of keystrokes made by the candidate,
    },
    error: {
      type: String, // Error message
    },

  }],
  score: {
    type: Number,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

const CandidateAssessment = mongoose.model('CandidateAssessment', candidateAssessmentSchema);

module.exports = CandidateAssessment;
