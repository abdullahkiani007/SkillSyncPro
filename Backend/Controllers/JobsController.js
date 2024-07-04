const Job = require('../Services/jobs.service')

const JobsController = {
    async getJobs (req, res) {
        console.log("fetching jobs")
        try {
            const jobs = await Job.getJobs();
            console.log(jobs);
            return res.status(200).json({ jobs });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getAppliedJobs (req, res) {
        const { id } = req.user;
        try {
            const jobs = await Job.getAppliedJobs(id);
            return res.status(200).json({ 
                "jobs":jobs.jobs
             });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getApplications (req, res) {
        const { id } = req.user;
        try {
            const jobs = await Job.getApplications(id);
            return res.status(200).json({ 
                "jobs":jobs.jobseeker.applications
             });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
}

module.exports = JobsController;