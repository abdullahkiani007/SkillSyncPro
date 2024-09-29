const mongoose = require('mongoose');

const applicationResultSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
    unique: true,
  },
  recommendationScore: {
    type: Number,
  },
  similarityScore: {
    type: Number,
  },
  voiceSummary: {
    type: String,
  },
  scores: [
    {
      title: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  totalScore: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  finalScore: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const ApplicationResultModel = mongoose.models.ApplicationResult || mongoose.model('ApplicationResult', applicationResultSchema);
module.exports = ApplicationResultModel;