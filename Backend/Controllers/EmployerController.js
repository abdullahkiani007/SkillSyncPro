const EmployerServices = require('../Services/employer.service');
const jobService = require('../Services/jobs.service');


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
              "data":response.jobs
       })

    },
    async getEmployer(req,res,next){
      console.log("Get /Emp received")
      const id = req.user;

    
      const response = await EmployerServices.getEmployer(id);
      console.log(response)

      if (response.status === 200){
        return res.status(200).json({
          "employer" : response.employer
        })
      }else{
        return res.status(500).json({
          "message":"internal server error"
        })
      } 
    },

    async updateEmployer(req,res,next){
      const id = req.user;
      const data = req.body;

      const response = await EmployerServices.updateEmployer(id,data);
      if (response.status === 200){
        return (res.status(200).json({
          "data":response.employer
        }
        ))
      }else{
        return res.status(500).json({
          "message":"Internal Server Error"
        })
      }

    },

    async postJob(req,res,next){
        console.log("POST emp/jobs received");
        const {_id} = req.user;

        const response = await EmployerServices.createJob(_id,req.body);
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

    async getDashboard(req,res,next){
        console.log("GET emp/dashboard received");
        const {_id} = req.user;

        const response = await EmployerServices.getDashboard(_id);
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
              "jobs":response.jobs,
              "company":response.company
       })
    },

    async createAssessment(req,res,next){
        console.log("POST emp/assessment received");
        const {_id} = req.user;

        if (!req.body.title ){
            return res.status(400).json({
                "message":"Title is required"
            })
        }
        const response = await EmployerServices.createAssessment(_id,req.body);
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
            response
        })
    },

    async getAssessmentById(req,res,next){
        console.log("GET emp/assessments received");
        const id = req.query.id

        const response = await EmployerServices.getAssessment(id);
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
              "data":response.assessment
       })
    },

    async editAssessment(req,res,next){
        console.log("PUT emp/assessments received");
        const id = req.query.id;
        const data = req.body;

        const response = await EmployerServices.editAssessment(id,data);
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
              "data":response.assessment
       })
    },

    async deleteAssessment(req,res,next){
        console.log("DELETE emp/assessments received");
        const id = req.query.id;

        const response = await EmployerServices.deleteAssessment(id);
        if(response.status === 500){
            return res.status(500).json({
              "message" : response.message
            })
          }
          else if (response.status == 404){
            return res.status(404).json({
                "message":response.message
            })
          }
          res.status(200).json({
            "message":"Assessment deleted"
          })
    },

    async archiveJob(req,res,next){
        console.log("PUT emp/jobs/archive received");
        const JobId = req.query.id;
        const {_id} = req.user;

        const response = await jobService.archiveJobEmployer(JobId,_id);
        if(response.status === 500){
            return res.status(500).json({
              "message" : response.message
            })
          }
          else if (response.status == 404){
            return res.status(404).json({
                "message":response.message
            })
          }
          res.status(200).json({
            "message":"Job archived"
          })
    },

    async deleteJob(req,res,next){
        console.log("DELETE emp/jobs received");
        const JobId = req.query.id;
        const {_id} = req.user;

        const response = await jobService.deleteJobEmployer(JobId,_id);
        if(response.status === 500){
            return res.status(500).json({
              "message" : response.message
            })
          }
          else if (response.status == 404){
            return res.status(404).json({
                "message":response.message
            })
          }
          res.status(200).json({
            "message":"Job deleted"
          })
    },


    // Job Application related functions will be added here

    async getApplicationsGrouptedByStatus(req,res,next){
        console.log("GET emp/applications received");
        const {_id} = req.user;

        const response = await EmployerServices.getApplicationsGroupedByStatus(_id);
        if(response.status === 500){
            return res.status(500).json({
              "message" : response.message
            })
          }
          else if (response.status == 404){
            return res.status(404).json({
                "message":response.message
            })
          }
          console.log(response)
          res.status(200).json({
            "data":response.groupedApplications
          })
    },




  


}

module.exports = EmployerController;