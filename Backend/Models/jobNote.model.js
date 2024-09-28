// models/JobNote.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobNoteSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobNote = mongoose.model('JobNote', jobNoteSchema);
module.exports = JobNote;
