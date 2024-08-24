const JobModel = require("../Models/job.model");
const JobSeekerModel = require("../Models/jobseeker.model");
const ApplicationModel = require("../Models/application.model");
const CompanyModel = require("../Models/company.model");
const EmployerModel = require("../Models/employer.model");
const mongoose = require("mongoose");

const AdminService = {
  fetchJobsOverTime: async (query) => {
    // Assume you have a Job model
    const jobs = await JobModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    // return (jobs.map(job => ({ date: job._id, count: job.count })));

    return [
      {
        _id: "2024-08-04",
        count: 1,
      },
      {
        _id: "2024-08-19",
        count: 1,
      },
      {
        _id: "2024-08-20",
        count: 2,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
    ];
  },

  fetchJobApplications: async () => {
    const jobs = await JobModel.aggregate([
      {
        $project: {
          title: 1,
          applicationsCount: { $size: "$applicants" }, // Assuming 'applications' is an array of applicant IDs
        },
      },
    ]);

    //   return jobs;
    return [
      {
        _id: "66af3090c4fce7cc889728a3",
        title: "Full stack dev",
        applicationsCount: 8,
      },
      {
        _id: "66c382557cd63d7228aba2c7",
        title: "Backend Engineer",
        applicationsCount: 2,
      },
      {
        _id: "66c382557cd63d7228aba2c7",
        title: "devops engineer",
        applicationsCount: 10,
      },
    ];
  },

  fetchTopCompaniesByJobPostings: async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$company", // Group by company
            jobCount: { $sum: 1 }, // Count number of jobs
          },
        },
        {
          $lookup: {
            from: "companies", // Collection name in MongoDB
            localField: "_id",
            foreignField: "_id",
            as: "companyInfo",
          },
        },
        {
          $unwind: "$companyInfo",
        },
        {
          $project: {
            _id: 0,
            companyName: "$companyInfo.name", // Assuming the Company model has a name field
            jobCount: 1,
          },
        },
        {
          $sort: { jobCount: -1 }, // Sort by jobCount in descending order
        },
      ]);

      //   return results;
      return [
        {
          jobCount: 2,
          companyName: "codewar software",
        },
        {
          jobCount: 10,
          companyName: "TeraByte",
        },
        {
          jobCount: 4,
          companyName: "Devsinc",
        },
        {
          jobCount: 3,
          companyName: "ArbiSoft",
        },
      ];
    } catch (error) {
      throw new Error(
        "Error fetching top companies by job postings: " + error.message
      );
    }
  },

  fetchJobseekerRegistrationsOverTime: async (fromDate, toDate) => {
    try {
      const results = await JobSeekerModel.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Format date as string for grouping
            registrationCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date
        },
      ]);

      //   return results;
      return [
        { _id: "2024-05-17", registrationCount: 2 },
        { _id: "2024-05-18", registrationCount: 1 },
        { _id: "2024-05-19", registrationCount: 1 },
        { _id: "2024-04-19", registrationCount: 8 },
        { _id: "2024-03-27", registrationCount: 3 },
        { _id: "2024-05-16", registrationCount: 10 },
      ];
    } catch (error) {
      throw new Error(
        "Error fetching jobseeker registrations data: " + error.message
      );
    }
  },

  fetchEmploymentTypesDistribution: async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$employmentType", // Group by employment type
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 }, // Sort by count in descending order
        },
      ]);

      //   return results;
      return [
        { _id: "Temporary", count: 10 },
        { _id: "Contract", count: 3 },
        {
          _id: "Part-Time",
          count: 10,
        },
        { _id: "Full-Time", count: 30 },
      ];
    } catch (error) {
      throw new Error(
        "Error fetching employment types distribution data: " + error.message
      );
    }
  },

  fetchSalaryRangeDistribution: async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $project: {
            averageSalary: {
              $avg: [
                {
                  $toInt: {
                    $arrayElemAt: [{ $split: ["$salaryRange", "-"] }, 0],
                  },
                }, // Parse the minimum salary
                {
                  $toInt: {
                    $arrayElemAt: [{ $split: ["$salaryRange", "-"] }, 1],
                  },
                }, // Parse the maximum salary
              ],
            },
          },
        },
        {
          $bucket: {
            groupBy: "$averageSalary", // Group by the calculated average salary
            boundaries: [
              0, 30000, 50000, 70000, 90000, 110000, 130000, 150000, 200000,
            ], // Define the bins
            default: "Others", // Bucket for any value not within the boundaries
            output: {
              count: { $sum: 1 },
            },
          },
        },
        {
          $sort: { _id: 1 }, // Sort bins by range
        },
      ]);

      return results;
      //   return [ { _id: 30000, count: 1 }, { _id: 50000, count: 1 } ]
    } catch (error) {
      throw new Error(
        "Error fetching salary range distribution data: " + error.message
      );
    }
  },

  fetchJobPostingsByLocation: async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$location", // Group by the 'location' field
            count: { $sum: 1 }, // Count the number of job postings for each location
          },
        },
        {
          $sort: { count: -1 }, // Sort locations by the number of job postings in descending order
        },
      ]);

      //   return results;
      return [
        {
          _id: "islamabad",
          count: 2,
        },
        {
          _id: "Karachi",
          count: 4,
        },
        {
          _id: "peshawar",
          count: 2,
        },
        {
          _id: "New York",
          count: 40,
        },
      ];
    } catch (error) {
      throw new Error(
        "Error fetching job postings by location: " + error.message
      );
    }
  },
  getJobsForAdmin: async (req, res) => {
    try {
      const jobs = await JobModel.aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
        {
          $unwind: "$companyDetails",
        },
        {
          $lookup: {
            from: "jobseekers",
            localField: "applicants",
            foreignField: "_id",
            as: "applicantDetails",
          },
        },
        {
          $addFields: {
            applicantCount: { $size: "$applicantDetails" },
            companyName: "$companyDetails.name",
            postedBy: "$postedBy",
            postedAt: "$createdAt",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            location: 1,
            experience: 1,
            skills: 1,
            salaryRange: 1,
            employmentType: 1,
            archived: 1,
            applicantCount: 1,
            companyName: 1,
            postedAt: 1,
          },
        },
      ]);

      return jobs;
    } catch (error) {
      throw new Error("Error fetching jobs for admin: " + error.message);
    }
  },
  async getJobSeekersForAdmin() {
    try {
      const jobSeekers = await JobSeekerModel.find()
        .populate("user", "firstName lastName email") // Populate user details
        .populate("applications"); // Populate applications if needed

      return jobSeekers;
    } catch (error) {
      console.error("Error fetching job seekers:", error);
      console.error(error.message);
      throw error;
    }
  },
  getEmployeeDetails: async (employeeId) => {
    try {
      const employee = await EmployerModel.findById(employeeId)
        .populate("user", "firstName lastName email")
        .populate("company", "name");
      if (!employee) {
        return { status: 404, message: "Employee not found" };
      }
      return { status: 200, data: employee };
    } catch (error) {
      return { status: 500, message: "Error fetching employee details", error };
    }
  },

  getAllEmployees: async () => {
    try {
      const employees = await EmployerModel.find()
        .populate("user", "firstName lastName email")
        .populate("company", "name");
      return { status: 200, data: employees };
    } catch (error) {
      return { status: 500, message: "Error fetching employees", error };
    }
  },

  getAllCompanies: async () => {
    try {
      const companies = await CompanyModel.find();
      return { status: 200, data: companies };
    } catch (error) {
      return { status: 500, message: "Error fetching companies", error };
    }
  },
  
  authorizeCompany: async (companyId) => {
    try {
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        return { status: 404, message: "Company not found" };
      }
      company.authorized = true;
      await company.save();
      return { status: 200, message: "Company authorized successfully" };
    } catch (error) {
      console.error("Error authorizing company:", error);
      return { status: 500, message: "Error authorizing company", error };
    }
  },

  deleteCompany: async (companyId) => {
    try {
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
      await company.remove();
      res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete company' });
    }
  },

  getCompanyDetails : async (companyId) => {
    try {
      const company = await CompanyModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(companyId) } },
        {
          $lookup: {
            from: 'users', // Collection name for the User model
            localField: 'createdBy',
            foreignField: '_id',
            as: 'creator',
          },
        },
        { $unwind: { path: '$creator', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'employers', // Collection name for the Employer model
            localField: 'employees',
            foreignField: '_id',
            as: 'employees',
          },
        },
        {
          $lookup: {
            from: 'jobs', // Collection name for the Job model
            localField: 'jobs',
            foreignField: '_id',
            as: 'jobs',
          },
        },
        {
          $lookup: {
            from: 'employers', // Collection name for the Employer model
            localField: 'unAuthEmployees',
            foreignField: '_id',
            as: 'unAuthEmployees',
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            industry: 1,
            website: 1,
            logo: 1,
            background: 1,
            address: 1,
            contactEmail: 1,
            contactPhone: 1,
            authorized: 1,
            createdBy: {
              _id: '$creator._id',
              name: '$creator.name',
              email: '$creator.email',
            },
            employees: 1,
            jobs: 1,
            unAuthEmployees: 1,
          },
        },
      ]);
  
      if (!company || company.length === 0) {
        return { status: 404, message: "Company not found" };
      }
      return { status: 200, data: company[0] };
    } catch (error) {
      console.error("Error fetching company details:", error);
      return { status: 500, message: "Error fetching company details", error };
    }
  }
}

module.exports = AdminService;
