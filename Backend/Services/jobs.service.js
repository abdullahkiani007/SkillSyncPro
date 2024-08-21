const JobModel = require('../Models/job.model');
const ApplicationModel = require('../Models/application.model');
const JobseekerModel = require('../Models/jobseeker.model');
const JobseekerService = require('../Services/jobSeeker.service');
const UserModel = require('../Models/user.model')
const EmployerModel = require('../Models/employer.model')

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
    },
    getApplications: async (id) => {

        try {
            const jobseekerId = await JobseekerService.getJobSeeker(id);
            const jobseeker = await JobseekerModel.findById(jobseekerId._id).populate('applications');
            return {
                status:200,
                jobseeker
            };
        } catch (error) {
            return { status:500, "message":"Internal server error" };
        }
    },

    getAppliedJobs: async (id) => {
        try {
            const jobseekerId = await JobseekerService.getJobSeeker(id);
            const applications = await ApplicationModel.find({jobSeeker:jobseekerId._id}).populate('job');

            const jobs = applications.map((application)=>{
                return application.job;
            });
            return {
                status:200,
                jobs
            };
        } catch (error) {
            return { status:500, "message":"Internal server error" };
        }
    },

    // 
    archiveJobEmployer: async(jobId , userId)=>{
        try{
            const employer = await EmployerModel.findOne({user:userId});
            const job = await JobModel.findOne({_id:jobId});

            if (job.company.toString() !== employer.company.toString()){
                return {
                    "status":401,
                    "message":"Unauthorized"
                }
            }
            await JobModel.findByIdAndUpdate(jobId,{
                $set:{archived:!job.archived}
            });
            return {
                "status":200,
                "message":"Job archived successfully"
            }
        }catch(err){
            console.log(err)
            return {
                "status":500,
                "message":"Internal Server Error"
            }

        }
        },

    deleteJobEmployer: async(jobId , userId)=>{
        try{
            const employer = await EmployerModel.findOne({user:userId});
            const job = await JobModel.findOne({_id:jobId});

            if (job.company.toString() !== employer.company.toString()){
                return {
                    "status":401,
                    "message":"Unauthorized"
                }
            }
            await JobModel.findByIdAndDelete(jobId);
            return {
                "status":200,
                "message":"Job deleted successfully"
            }
        }catch(err){
            console.log(err)
            return {
                "status":500,
                "message":"Internal Server Error"
            }

        }
    }


    }

module.exports = jobService