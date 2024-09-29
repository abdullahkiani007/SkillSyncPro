class JobDTO {
    constructor(job) {
        this._id = job._id;
        this.title = job.title;
        this.description = job.description;
        this.location = job.location;
        this.companyName = job.company.name;
        this.companyWebsite = job.company.website;
        this.skills = job.skills;
        this.salaryRange = job.salaryRange;
        this.employmentType = job.employmentType;
        this.applicants = job.applicants;
        this.createdAt = job.createdAt;
        this.archived = job.archived;
        this.generateRandomProblem = job.generateRandomProblem ;
    }
}

module.exports = JobDTO;