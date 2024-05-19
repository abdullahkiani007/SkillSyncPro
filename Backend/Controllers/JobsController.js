const Job = require('../Services/jobs.service')

const JobsController = {
    async getJobs (req, res) {
        try {
            const jobs = await Job.getJobs();
            return res.status(200).json({ jobs });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = JobsController;