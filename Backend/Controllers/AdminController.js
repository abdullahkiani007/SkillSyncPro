const AdminService = require("../Services/admin.service");

const AdminController = {
    async fetchJobsOverTime (req, res, next) {
        const { from, to } = req.query;
    const query = {
        createdAt: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lte: new Date(to) }),
        },
    };

        try {
            const jobs = await AdminService.fetchJobsOverTime(query);
            res.status(200).json({
                jobs
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    },

    async fetchJobApplications(req,res,next){

        try{
            const applications = await AdminService.fetchJobApplications();
            res.status(200).json({
                applications
            })
        }catch(err){
            next(err)
            exonsole.log(err)
        }
    },

    async fetchTopCompaniesByJobPostings(req,res,next){
        try{
            const companies = await AdminService.fetchTopCompaniesByJobPostings();
            res.status(200).json({
                companies
            })
        }catch(error){
            next(error);
            console.log(error)
        }
    },

    async fetchJobSeekerRegistrationOverTime(req,res,next){
        const {from , to} = req.query 
        try{
            const jobseekers = await AdminService.fetchJobseekerRegistrationsOverTime(from,to)
            res.status(200).json({
                jobseekers
            })
        }catch(error){
            next(error);
            console.log(error)
        }
    },

    async fetchEmploymentTypesDistribution(req,res,next){

        try{
            const employmentType= await AdminService.fetchEmploymentTypesDistribution()
            console.log(employmentType)
            res.status(200).json({
                employmentType
            })
        }catch(error){
            next(error);
            console.log(error)
        }
    }
}

module.exports = AdminController;