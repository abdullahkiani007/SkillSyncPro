const companyService = require('../Services/company.service');

const CompanyController = {
    async register(req,res,next){
        const {_id} = req.user;

        const company = {
            ...req.body,
            createdBy:_id
        }

        const nameExists = await companyService.nameExists(company.name);
        if (nameExists){
            res.status(403).json({
                "message":"Name already exists"
            })
            return ;
        }
        const response = await companyService.register(company);
        if (response.status == 200){
            res.status(200).json({
                "message":"Company registered successfully",
                "data":response.data
            })
            return ;
        }

        res.status(500).json({
            "message":"Internal server error",
        })

    },

    

    

    async getCompany(req,res,next){
        console.log("GET company received");
        const {_id} = req.user;

        const response = await companyService.getCompanybyUserId(_id);
        if (response.status == 200){
            
            res.status(200).json({
                "data":response.data
            })
            return ;
        }else if (response.status == 404){
            res.status(404).json({
                "message":response.message
            })
            return ;
        }

        res.status(404).json({
            "message":"Company not found"
        })
    },
    async getCompanyNames(req,res,next){
        console.log("GET company names received");
        try{
            const companies = await companyService.getCompanyNames();
            res.status(200).json({
                companies
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    ,
    async updateCompany(req,res,next){
        console.log("PUT company received");
        const {_id} = req.user;

        const company = {
            ...req.body,
            createdBy:_id
        }

        const response = await companyService.updateCompany(company);
        if (response.status == 200){
            res.status(200).json({
                "message":"Company updated successfully",
                "data":response.data
            })
            return ;
        }else if (response.status == 404){
            res.status(404).json({
                "message":response.message
            })
            return ;
        }

        res.status(500).json({
            "message":"Internal server error"
        })
    },

    async getEmployees(req,res,next){
        console.log("Get/ employees received")
      const {id} = req.user;
      const {companyId} = req.query;

      try{

      
        const employees = await companyService.getEmployees(companyId);
            res.status(200).json({
                employees
            })
            return ;
      }catch(err){
        console.log(err)
            next(err)
      }
        

    }, async joinCompany(req,res,next){
        const {id} = req.user;
        const companyId = req.query.id;
        const response = await companyService.joinCompany(id,companyId);
        if (response.status == 200){
            res.status(200).json({
                "message":"Joined company successfully",
                "data":response.data
            })
            return ;
        }else if (response.status == 404){
            res.status(404).json({
                "message":response.message
            })
            return ;
        }else if (response.status == 403){
            res.status(403).json({
                "message":response.message
            })
            return ;
        }

        res.status(500).json({
            "message":"Internal server error"
        })
    },
    async authorizeEmployee(req,res,next){
        const {employeeId , companyId} = req.body;
        console.log("Authorize employee received")
        console.log(employeeId,companyId)
        const {id} = req.user;

        try{
            const response = await companyService.authorizeEmployee(employeeId,id,companyId);
            console.log(response)
           return res.status(response.status).json({
                "message":response.message
            })
        }catch(err){
            console.log(err)
            next(err)
        }


    },
    async revokeEmployee(req,res,next){
        const {employeeId , companyId} = req.body;
        console.log("Revoke employee received")
        console.log(employeeId,companyId)
        const {id} = req.user;

        try{
            const response = await companyService.revokeEmployee(employeeId,id,companyId);
           return res.status(response.status).json({
                "message":response.message
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    },
    async deleteJoinRequest(req,res,next){
        const {employeeId , companyId} = req.body;
        console.log("Delete join request received")
        console.log(employeeId,companyId)
        const {id} = req.user;

        try{
            const response = await companyService.deleteJoinRequest(employeeId,id,companyId);
           return res.status(response.status).json({
                "message":response.message
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    ,
    async getCompanies(req,res,next){
        console.log("GET/ Companies received")
        const response = await companyService.getCompanies();
        if (response.status === 200){
            return (res.status(200).json({
                "data":response.companies
            }))
        }else{
            return (res.status(500).json({
                "message":"Internal Server Error"
            }))
        }
    },

    async getAssessment(req,res,next){
        console.log("GET/ Assessment received")
        const companyId = req.query.companyId;
        const response = await companyService.getAssessment(companyId);
        if (response.status === 200){
            return (res.status(200).json({
                "assessment":response.assessment
            }))
        }
        else if (response.status === 404){
            return (res.status(404).json({
                "message":response.message
            }))
        }
        return (res.status(500).json({
            "message":"Internal Server Error"
        }))
    }
}

module.exports  = CompanyController;