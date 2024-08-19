const mongoose = require('mongoose');

// Define a schema for individual problems
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  initialCode: {
    type: String,
    default: "// Write the initial code here",
  },
  testCases: {
    type: String,
    default: "// Write test cases here",
  },
});

// Define the main company-created assessment schema
const companyAssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'csharp', 'cpp', 'ruby'], // Adjust according to supported languages
  },
  timeLimit: {
    type: Number,
    required: true,
    min: 1, // Minimum time limit of 1 minute
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
  problems: [ProblemSchema], // Array of problems
}, { timestamps: true });

module.exports = mongoose.model('CompanyAssessment', companyAssessmentSchema);
