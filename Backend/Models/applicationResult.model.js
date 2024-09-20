const mongoose = require('mongoose');

const applicationResultSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
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
}, { timestamps: true });

const ApplicationResultModel = mongoose.models.ApplicationResult || mongoose.model('ApplicationResult', applicationResultSchema);
module.exports = ApplicationResultModel;
