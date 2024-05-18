const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['jobseeker', 'employer', 'recruiter', 'admin'], required: true },
    profilePicture: String,
    phone: String,
    address: String,
    bio: String,
    socialMedia: {
        linkedin: String,
        github: String,
        // Add other social media links as needed
    },
  
   
  
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
