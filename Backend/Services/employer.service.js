// const Employer = require('../models/employer.model');
const Job = require('../models/job.model');
const UserService = require('./user.service');
const CompanyService = require('./company.service')

const EmployerServices = {
    async getJobs(Empid){
        let jobs;
        try{
            jobs = await Job.find({postedBy:Empid});

            if (jobs){
            return {
                "status":200,
                "data":jobs
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

    async createJob(_id,title,description,skills,jobType,location){
        let job;
        const user = await UserService.getInfo(_id);
        const company = await CompanyService.getCompanybyUserId(_id);

        if (user.status === 200 && company.status === 200)
            try{
                job = new Job({
                    title,
                    description,
                    requirements:skills,
                    employmentType:jobType,
                    location,
                    postedBy:_id,
                    company:company.data._id
                })
                await job.save();
                CompanyService.addJob(company.data._id,job._id);

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
        }else{
            return {
                "status":404,
                "message":"User or Company not found"
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
    }
}

module.exports = EmployerServices;