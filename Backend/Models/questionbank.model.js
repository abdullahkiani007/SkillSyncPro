const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  testCases: {
    type: String,
    default: "// Write test cases here",
  },
});

const QuestionBankSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  problems: [ProblemSchema],
});

module.exports = mongoose.model("QuestionBank", QuestionBankSchema);
