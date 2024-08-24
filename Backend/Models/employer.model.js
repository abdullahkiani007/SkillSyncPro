const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'},
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  
  role: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);
