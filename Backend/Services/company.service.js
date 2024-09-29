const Company = require('../Models/company.model');
const Employer = require('../Models/employer.model');
const CompanyAssessment = require("../Models/companyAssessment.model")
const EmployerDTO = require('../DTO/employerDTO');
const ApplicationModel = require('../Models/application.model')

const companyService = {
    async register(company){
        console.log(company)
        let newCompany;
        try{
            
            // Add company to employer
            const employer = await Employer.findOne({user:company.createdBy});
            if (!employer) {
                console.log(`No employer found with id: ${company.createdBy}`);
                return {
                    "status": 404,
                    "message": "Employer not found"
                };
            }
            newCompany = new Company(company);
            await newCompany.save();
            employer.company = newCompany._id;
            await employer.save();

            console.log("new company",newCompany);
            console.log("user ",employer);
            return {
                "status":200,
                "data":newCompany
            }
        }catch(err){
            console.log(err)
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }
,
    async nameExists(name){
        try{
            const company = await Company.findOne({name:name});
            if (company){
                return true;
            }
            return false;
    }catch(err){
        console.log(err);
        return false;
    }
},
    async getCompanybyUserId(id){
        try{
            const company = await Company.findOne({createdBy:id});
            if (company){
                return {
                    "status":200,
                    "data":company
                }
            }else{
                //check if user is an employee

                // fetch employee id
                const employer = await Employer.findOne({user:id});
                if (!employer){
                    return {
                        "status":404,
                        "message":"Employer not found"
                    }
                }

                const company = await Company.findById(employer.company);
                if (company){
                    return {
                        "status":200,
                        "data":company
                    }
                }
            }

            return {
                "status":404,
                "message":"Company not found"
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    },
    async updateCompany(company){
        try{
            const updatedCompany = await Company.findByIdAndUpdate(company._id,company,{new:true});
            if (updatedCompany){
                return {
                    "status":200,
                    "data":updatedCompany
                }
            }
            return {
                "status":404,
                "message":"Company not found"
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }
    ,


    async addJob(companyId,jobId){
        try{
            const company = await Company.findById(companyId);
            if (!company){
                return {
                    "status":404,
                    "message":"Company not found"
                }
            }
            company.jobs.push(jobId);
            await company.save();
            return {
                "status":200,
                "data":company
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }
    ,
    async joinCompany(userId, companyId) {
        try {
            const company = await Company.findById(companyId);
            if (!company) {
                return {
                    "status": 404,
                    "message": "Company not found"
                }
            }
            const employer = await Employer.findOne({ user: userId });
            if (!employer) {
                return {
                    "status": 404,
                    "message": "Employer not found"
                }
            }
            if (company.unAuthEmployees.includes(employer._id)) {
                console.log("Already joined company")
                return {
                    "status": 403,
                    "message": "Already joined company kindly wait for approval"
                }
            }

            company.unAuthEmployees.push(employer._id);
            await company.save();

            return {
                "status": 200,
                "data": company
            }
        } catch (err) {
            console.log(err);
            return {
                "status": 500,
                "message": "Internal server error"
            }
        }
    },
    async leaveCompany(userId) {
        try {
            const employer = await Employer.findOne({ user: userId });
            if (!employer) {
                return {
                    "status": 404,
                    "message": "Employer not found"
                }
            }
            const company = await Company.findById(employer.company);
            if (!company) {
                return {
                    "status": 404,
                    "message": "Company not found"
                }
            }

            if (!company.unAuthEmployees.includes(employer._id) && !company.employees.includes(employer._id)) {
                console.log("Not part of company")
                return {
                    "status": 403,
                    "message": "Not part of company"
                }
            }

            company.unAuthEmployees = company.unAuthEmployees.filter(id => id.toString() !== employer._id.toString());
            company.employees = company.employees.filter(id => id.toString() !== employer._id.toString());
            await company.save();

            employer.company = null;
            await employer.save();

            return {
                "status": 200,
                "data": company
            }
        } catch (err) {
            console.log(err);
            return {
                "status": 500,
                "message": "Internal server error"
            }
        }
    }
    ,
    async getEmployees(companyId){
        try{
            const company = await Company.findById(companyId)
            .populate('employees')
            .populate('unAuthEmployees');

            // console.log("company",company)
            const authEmployees = await Promise.all(company.employees.map(async (employee) => {
                employee = await employee.populate('user');
                return new EmployerDTO(employee);
            }));
            
            const unAuthEmployees = await Promise.all(company.unAuthEmployees.map(async (employee) => {
                employee = await employee.populate('user');
                return new EmployerDTO(employee);
            }));
            console.log("authEmployees", authEmployees);
            console.log("unAuthEmployees", unAuthEmployees);
            // const employees = await Employer.find({company:companyId}).populate('user');
            
            // const employeeDTOs = employees.map((employee)=>{
            //     return new EmployerDTO(employee);
            // })
            return {authEmployees, unAuthEmployees};
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    },
    async getCompanies(){
        try{
            let companies = await Company.find({}).populate('jobs').populate({
                path:"employees",
                populate:{
                    path:'user'
                }
            });
            // companies.employees = companies.employees?.map( (emp)=>{
            //     return emp.populate("employers")
            // })
            companies.forEach((company)=>{
                console.log("employe", company.employees)
            })
            return{
                status:200,
                companies
            }
        }catch(error){
            console.log(error)
            return {
                status: 500,
            }
        }
    },

    async getCompanyNames(){
        try{
            const companies = await Company.find({}).select('name');
            return companies;
        }catch(err){
            console.log(err);
            return [];
        }
    },
    async authorizeEmployee(employeeId, adminId, companyId) {
        console.log("Authorize employer function calledddddd");
        console.log("Employee id", employeeId, "Admin id", adminId, "Company id", companyId);
        try {
            const company = await Company.findById(companyId);
            if (!company) {
                console.log("Company not found");
                return {
                    status: 404,
                    message: "Company not found"
                };
            }

            if (company.createdBy == adminId) {
                
                // Add company field to employee collection
                const employee = await Employer.findOne({ _id: employeeId });
                if (!employee) {
                    return {
                        status: 404,
                        message: "Employee not found"
                    };
                }
                if (employee.company) {
                    return {
                        status: 403,
                        message: "Employee has already joined a company"
                    };
                }
    
                // Remove employee from unauth list and add to employee
                company.unAuthEmployees = company.unAuthEmployees.filter(id => id.toString() !== employeeId);
                company.employees.push(employeeId);
                await company.save();
    
                employee.company = companyId;
                await employee.save();
                console.log("Employee authorized");
    
                return {
                    status: 200,
                    message: "Employee Authorized"
                };
            } else {
                console.log("Unauthorized action");
                console.log("Company created by", company.createdBy);
                console.log("Admin id", adminId);
                return {
                    status: 403,
                    message: "Unauthorized action"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message
            };
        }
    },

    async revokeEmployee(employeeId, adminId, companyId) {
        console.log("Revoke employer function called");
        console.log("Employee id", employeeId);
        try {
            const company = await Company.findById(companyId);
            if (!company) {
                return {
                    status: 404,
                    message: "Company not found"
                };
            }
    
            if (company.createdBy == adminId) {
                // Remove employee from auth list and add to unauth
                company.employees = company.employees.filter(id => id.toString() !== employeeId);
                company.unAuthEmployees.push(employeeId);
                await company.save();
    
                // Remove company field from employee collection
                const employee = await Employer.findOne({ _id: employeeId });
                if (!employee) {
                    return {
                        status: 404,
                        message: "Employee not found"
                    };
                }
    
                employee.company = null;
                await employee.save();
    
                return {
                    status: 200,
                    message: "Employee Revoked"
                };
            } else {
                console.log("Unauthorized action");
                console.log("Company created by", company.createdBy);
                console.log("Admin id", adminId);
                return {
                    status: 403,
                    message: "Unauthorized action"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message
            };
        }
    },

    async deleteJoinRequest(companyId,adminId,employeeId){
        try{
            const company = await Company.findById(companyId);
            if (!company){
                return {
                    "status":404,
                    "message":"Company not found"
                }
            }
            if (company.createdBy.toString() !== adminId){
                return {
                    "status":403,
                    "message":"Unauthorized action"
                }
            }
            company.unAuthEmployees = company.unAuthEmployees.filter((id)=>{
                return id.toString() !== employeeId;
            });
            await company.save();
            return {
                "status":200,
                "data":company
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }

    ,

    async getAssessment(companyId){
        try{
            const assessment = await CompanyAssessment.find({company:companyId});
            console.log("assessment",assessment)
            console.log("company",companyId)
            if (assessment){
                return {
                    "status":200,
                    assessment
                }
            }
            return {
                "status":404,
                "message":"Assessment not found"
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    },
    async getApplicationSummaryForCompany(companyId){
        try {
          const company = await Company.findById(companyId).populate('jobs');
          
          if (!company) {
            throw new Error('Company not found');
          }
      
          const jobIds = company.jobs.map(job => job._id);
      
          const summary = await ApplicationModel.aggregate([
            { $match: { job: { $in: jobIds } } },
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 }
              }
            }
          ]);
      
          return summary;
        } catch (error) {
          console.error("Error fetching application summary for company:", error);
          throw error;
        }
      },      

    
}

module.exports = companyService;

