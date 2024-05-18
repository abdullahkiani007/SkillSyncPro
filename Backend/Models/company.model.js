const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  industry: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  address: {
    type: String,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
    }
  ],
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
