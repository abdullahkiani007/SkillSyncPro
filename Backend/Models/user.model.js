// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['Jobseeker', 'Employer', 'Admin'], required: true }

});

userSchema.methods.roleIs = function (role) {
    return this.role === role;
};


const userModel = mongoose.model('Users', userSchema);



module.exports = userModel;
