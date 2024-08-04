const Company = require('../Models/company.model');
const Employer = require('../Models/employer.model');


const companyService = {
    async register(company){
        console.log(company)
        let newCompany;
        try{
            newCompany = new Company(company);
            await newCompany.save();
            
            // Add company to employer
            const employer = await Employer.findOne({user:company.createdBy});
            if (!employer) {
              console.log(`No employer found with id: ${company.createdBy}`);
              return {
                "status": 404,
                "message": "Employer not found"
              };
            }
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
            employer.company = company._id;
            await employer.save();

            company.employees.push(employer._id);
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
    async getEmployees(companyId){
        try{
            const company = await Company.findById(companyId);
            if (!company){
                return {
                    "status":404,
                    "message":"Company not found"
                }
            }
            const employees = await company.populate('employees');
            return {
                "status":200,
                "data":employees
            }
        }catch(err){
            console.log(err);
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }
}

module.exports = companyService;

