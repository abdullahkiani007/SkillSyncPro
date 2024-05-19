const jobseekerService = require('../Services/jobSeeker.service')
const jobService = require('../Services/jobs.service')

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
    }
}

module.exports = JobseekerController;