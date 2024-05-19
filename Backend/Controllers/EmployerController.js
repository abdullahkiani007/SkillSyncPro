const EmployerServices = require('../Services/employer.service');


const EmployerController = {
    async getJobs(req,res,next){
        console.log("GET emp/jobs received");
       const {_id} = req.user;

       const response = await EmployerServices.getJobs(_id);
         if(response.status === 500){
              return res.status(500).json({
                "message" : response.message
              })
         }else if (response.status == 404){
            return res.status(404).json({
                "message":response.message
            })
         }

       res.status(200).json({
              "data":response.data
       })

    },

    async postJob(req,res,next){
        console.log("POST emp/jobs received");
        const {_id} = req.user;
        const {title,description,skills,jobType,location} = req.body;

        const response = await EmployerServices.createJob(_id,title,description,skills,jobType,location);
        if(response.status === 500){
            return res.status(500).json({
              "message" : response.message
            })
       }else if (response.status == 404){
          return res.status(404).json({
              "message":response.message
          })
       }

       res.status(200).json({
              "data":response.data
       })
    }
}

module.exports = EmployerController;