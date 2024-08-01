const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  type: {
    type: String,
    enum: ['Technical', 'Aptitude', 'Personality'],
  },
  score: {
    type: Number,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
