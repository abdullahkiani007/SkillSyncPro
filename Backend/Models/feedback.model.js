const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  comments: {
    type: String,
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
