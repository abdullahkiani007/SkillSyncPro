const jobseekerService = require('../Services/jobSeeker.service')
const jobService = require('../Services/jobs.service')

let count = 1;
const JobseekerController = {
    async applyJob(req,res,next){
        const {_id} = req.user;
        const {jobId, resume, coverLetter} = req.body;

        const response = await jobService.addJob(jobId,_id, resume,coverLetter)

        if (response.status === 200){
            res.status(200).json({
                "application": response.application
            })
            return;
        }
        res.status(response.status).json({
            "message":response.message
        })
    },

    async getAssessmentByJobId(req, res, next) {
        console.log("Get assessment by job id");
        try {
            console.log("req", req.query );
            console.log("params", req.params);
            console.log("count", count++);
    
            if (!req.query || !req.query.id) {
                return res.status(400).json({
                    message: "Missing query parameter: id"
                });
            }
    
            const _id = req.query.id;
    
            const response = await jobseekerService.getAssessmentByJobId(_id);
    
            if (response.status === 200) {
                const assessment = response.assessment;
                return res.status(200).json({
                    assessment
                });
            }
    
            return res.status(response.status).json({
                message: response.message
            });
        } catch (error) {
            next(error);
        }
    },

    async submitJobApplication(req, res, next) {
        console.log("Submit job application");
        try {
            const userId = req.user._id;
            const data = req.body;
    
            const response = await jobseekerService.submitJobApplication(userId, data);
    
            if (response.status === 200) {
                return res.status(200).json({
                    application: response.application
                });
            }
    
            return res.status(response.status).json({
                message: response.message
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = JobseekerController;