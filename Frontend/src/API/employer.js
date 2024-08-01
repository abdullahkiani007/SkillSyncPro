class EmployerController {
    constructor(){
        this.url = "http://localhost:3000/api/v1/employer/"
    }

    async postJob(data,token){
        const response = await fetch(this.url + "job", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }   

    async getJobs(token){
        const response = await fetch(this.url + "jobs", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }

    async registerCompany(data,token){
        const response = await fetch(this.url + "company", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }
    async getCompany(token){
        const response = await fetch(this.url + "company", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }

    async updateCompany(data,token){
        const response = await fetch(this.url + "company", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }

    async getDashboard(token){
        const response = await fetch(this.url + "dashboard", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }
}
export default new EmployerController();
