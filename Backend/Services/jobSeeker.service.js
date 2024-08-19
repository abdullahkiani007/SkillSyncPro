const jobSeekerModel = require('../Models/jobseeker.model');
const userModel = require('../Models/user.model');
const UserService = require('../Services/user.service');
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
},

    updateJobSeeker: async (id, data) => {
        // id is the user id

        console.log("id ", id);
        console.log("data ", data);

        if (data.user) {
            const user = await UserService.updateUser(id, data.user);  
        }
        try{
        const jobseeker = await jobSeekerModel.findOneAndUpdate({user: id}, data, {
            new: true
        });
        
        return {
            status: 200,
            data: jobseeker
        };
        } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: "Internal server error"
        };
        }
    }

}

module.exports = jobseekerService;