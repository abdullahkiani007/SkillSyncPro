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
    testResults: [{
      testCase: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
      actualOutput: {
        type: String,
        required: true,
      },
      passed: {
        type: Boolean,
        required: true,
      },
    }],
    timeSpent: {
      type: Number, // Time spent in milliseconds
    },
    keystrokes: {
      type: Number, // Number of keystrokes made by the candidate
    },
  }],
  score: {
    type: Number,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });
