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
      },
      score: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  totalScore: {
    type: Number,
  },
  maxScore: {
    type: Number,
  },
  finalScore: {
    type: Number,
  },
}, { timestamps: true });

const ApplicationResultModel = mongoose.models.ApplicationResult || mongoose.model('ApplicationResult', applicationResultSchema);
module.exports = ApplicationResultModel;