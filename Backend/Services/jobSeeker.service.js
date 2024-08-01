const jobSeekerModel = require('../Models/jobseeker.model');
const userModel = require('../Models/user.model');
const updateUserService = require('../Services/user.service');

const jobseekerService = {
    getJobSeeker: async (id) => {
        // const user = await userModel.findById(id);

        const jobSeeker = await jobSeekerModel.findOne({user:id}).populate('user');
        return jobSeeker;
    },

    addApplication: async(_id, applicationId) => {
    const jobSeeker = await jobSeekerModel.findByIdAndUpdate(_id, {
        $push: { applications: applicationId }
    }, { new: true }); // return the updated document

    return jobSeeker;
}

}

module.exports = jobseekerService;