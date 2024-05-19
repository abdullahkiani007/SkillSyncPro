
class JobseekerController{
    constructor(){
        this.jobUrl = "http://localhost:3000/api/v1/jobs",
        this.jobSeekerUrl = "http://localhost:3000/api/v1/jobseeker"
    }
    async getJobs(){
       try {
           const response = await fetch(this.jobUrl);
           const data = await response.json();
           return data;
       }catch(error){
              return { status:500, "message":"Internal server error" };
       }
    }

    async applyJob(data,token){
        try{
            const response = await fetch(this.jobSeekerUrl+"/job/apply",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token,
                },
                body: JSON.stringify(data)
            })

            return {
                data: await response.json(),
                status: response.status
            };

        }catch(error){
            return {
                status:500,
                "message":"Internal Server Error"
            }
        }

    }
}

export default new JobseekerController();