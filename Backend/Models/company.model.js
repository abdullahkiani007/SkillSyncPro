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
  background: {
    type: String,
  }
  ,
  address: {
    type: String,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  authorized:{
    type: Boolean,
    default: false
  }
  ,
  contactPhone: {
    type: String,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
    }
  ],
  unAuthEmployees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
    }
  ]
  ,
  createdBy:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  
  ,
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    }
  ],
  
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
