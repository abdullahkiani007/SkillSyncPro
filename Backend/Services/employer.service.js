// const Employer = require('../models/employer.model');
const Job = require('../Models/job.model');
const UserService = require('./user.service');
const CompanyService = require('./company.service')
const Employer = require('../Models/employer.model');
const Assessment = require('../Models/companyAssessment.model')
const Company = require('../Models/company.model');
const Application = require('../Models/application.model')

const EmployerServices = {
    async getJobs(id){

        let jobs;
        try{
            // check if user is employer or admin of company
            const company = await CompanyService.getCompanybyUserId(id);


            jobs = await Job.find({company:company.data._id});

            if (jobs){
                console.log(jobs)
            return {
                "status":200,
                jobs
            }}
            else{
                return{
                    "status":404,
                    "message":"No jobs Exists"
                }
            }
        }catch(err){
            console.log(err)
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    },

    async createJob(_id,req){
        const {title,description,employmentType,experienceLevel,requirements,skillAssessment,company,skills,salaryRange,location} = req;

        let job;
        const empID = await Employer.findOne({user:_id});

            try{
                job = new Job({
                    title,
                    description,
                    requirements,
                    employmentType,
                    location,
                    postedBy:empID._id,
                    company,
                    skillAssessment,
                    skills,
                    salaryRange,
                    experienceLevel,
                })
                await job.save();
                CompanyService.addJob(company,job._id);

                return {
                    "status":200,
                    "data":job
                }
            }catch(err){
            console.log(err)
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    },
    async getDashboard(_id){
        let jobs;
        const company = await CompanyService.getCompanybyUserId(_id);
        if (company.status === 200)
            try{
                jobs = await Job.find({company:company.data._id});

                if (jobs){
                return {
                    "status":200,
                    "jobs":jobs,
                    "company":company.data
                }}
                else{
                    return{
                        "status":404,
                        "message":"No jobs Exists"
                    }
                }
            }catch(err){
                console.log(err)
                return {
                    "status":500,
                    "message":"Internal server error"
                }
            }
        else{
            return {
                "status":404,
                "message":"Company not found"
            }
        }
    },

    async getEmployer(id){
        try{
        const employer = await Employer.findOne({user:id}).populate('user');
        
        return {
            status:200,
            employer
        }
    }catch(error){
        console.log(error);
        return {
            status: 500,
            message:"internal server error"
        }
    }
    },

    updateEmployer: async (id, data) => {
        // id is the user id

        console.log("id ", id);
        console.log("data ", data);

        if (data.user) {
            const user = await UserService.updateUser(id, data.user);  
        }
        try{
        const employer = await Employer.findOneAndUpdate({user: id}, data, {
            new: true
        });
        
        return {
            status: 200,
            employer
        };
        } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: "Internal server error"
        };
        }
    },

    createAssessment: async (_id , data) => {
        console.log("data: ", data)
        const {title, description, language,timeLimit, problems} = data;

        try{
            const employer = await Employer.findOne({user:_id});
            const assessment = await Assessment.create({
                title,
                description,
                language,
                timeLimit,
                createdBy: _id,
                company: employer.company,
                problems,
              });
            if (assessment){
                return {
                    status: 200,
                    assessment
                }
            }else{
            return {
                status:500,
                message:"Error creating assessment"
            }
        }
        }catch(err){
            console.log(err);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    },

    deleteAssessment: async (id) => {
        try{
            const assessment = await Assessment.findByIdAndDelete(id);
            if (assessment){
                return {
                    status: 200,
                    message: "Assessment deleted successfully"
                }
            }else{
                return {
                    status: 404,
                    message: "Assessment not found"
                }
            }
        }catch(err){
            console.log(err);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    },

    editAssessment: async (id, data) => {
        try{
            const assessment = await Assessment.findByIdAndUpdate(id, data, {new: true});
            if (assessment){
                return {
                    status: 200,
                    assessment
                }
            }
            return {
                status: 404,
                message: "Assessment not found"
            }
        }catch(err){
            console.log(err);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    },

    getAssessment: async (id) => {
        try{
            const assessment = await Assessment.findById(id);
            if (assessment){
                return {
                    status: 200,
                    assessment
                }
            }
            return {
                status: 404,
                message: "Assessment not found"
            }
        }catch(err){
            console.log(err);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    },

    getAllCandidates: async (userId) => {
        try{
            const company = await CompanyService.getCompanybyUserId(userId);
            
            if (company.status === 200){
                // get all jobs of the company
                const companyJobs = await Job.find({company: company.data._id});

                // CandidateName	jobTitle	Applied Date	address	Contact	Email ID	Stage
                let candidates = [];
                const applications = await Application.find({job: {$in: companyJobs.map(job => job._id)}}).populate('user').populate('job');


                candidates = candidates.map(candidate => {
                    return {
                        candidateName: candidate.user.firstName + " " + candidate.user.lastName,
                        jobTitle: candidate.job.title,
                        appliedDate: candidate.createdAt,
                        address: candidate.user.address,
                        contact: candidate.user.contact,
                        email: candidate.user.email,
                        stage: candidate.status
                    }
                })

                return {
                    status: 200,
                    candidates
                }
            }

            return {
                status: 404,
                message: "Company not found"
            }
            
        }catch(err){
            console.log(err);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
        
    }


}

module.exports = EmployerServices;