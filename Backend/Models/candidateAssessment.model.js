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
  }],
  score: {
    type: Number,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('CandidateAssessment', candidateAssessmentSchema);
