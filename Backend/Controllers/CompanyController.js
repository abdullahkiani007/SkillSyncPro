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

    async getEmployes(req,res,next){
      const {id} = req.user;
        const response = await companyService.getEmployes(id);

    }
}

module.exports  = CompanyController;