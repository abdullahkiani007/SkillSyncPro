const JobModel = require('../Models/job.model');
const ApplicationModel = require('../Models/application.model');
const JobseekerModel = require('../Models/jobseeker.model');
const JobseekerService = require('../Services/jobSeeker.service');

const jobDTO = require('../DTO/jobsDTO');
const jobseekerService = require('../Services/jobSeeker.service');
const jobService = {
    getJobs : async ()=>{
        try {
            const jobs = await JobModel.find().populate('company');
            const newJobs = jobs.map((job)=>{
                return new jobDTO(job)
            })
            return newJobs;
            
        } catch (error) {
            return { status:500, "message":"Internal server error" };
        }
    },
    addJob: async (jobId , userId, resume, coverLetter)=> {
        try{
            const jobseeker = await JobseekerService.getJobSeeker(userId);
            const job = await JobModel.findByIdAndUpdate(jobId,{
                $push:{ applicants:jobseeker._id}
            },{ new: true });

            const newApplication = {
                job: jobId,
                jobSeeker: jobseeker._id,
                resume,
                coverLetter,
            }
            const application = await ApplicationModel.create(newApplication);
            await jobseekerService.addApplication(jobseeker._id , application._id)
            return {
                "status":200,
                application
            };
            
        }catch(error){
            console.log(error)
            return {
                "status":500,
                "message":"Internal Server Error"
            }
        }
    }
}

module.exports = jobService