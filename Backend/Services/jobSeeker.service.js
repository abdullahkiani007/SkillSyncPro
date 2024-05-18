const jobSeekerModel = require('../Models/jobSeeker.model');
const userModel = require('../Models/user.model');
const updateUserService = require('../Services/user.service');

const jobseekerService = {
    getJobSeeker: async (id) => {
        // const user = await userModel.findById(id);

        const jobSeeker = await jobSeekerModel.findOne({user:id}).populate('user');
        return jobSeeker;
    },
    updateJobSeeker: async (id, data) => {
        const user = await updateUserService.updateUser(id, {firstName: data.firstName, lastName: data.lastName});
        const jobSeeker = await jobSeekerModel.findOneAndUpdate({user:id},
            {
                phone: data.phone,
                address: data.address,
                skills: data.skills,
                education: data.education,
                experience: data.experience,
            }, {new: true});

            console.log("jobSeeker", jobSeeker);
        return {
            status: 200,
            message: "Jobseeker updated successfully",
        }
    }
}

module.exports = jobseekerService;