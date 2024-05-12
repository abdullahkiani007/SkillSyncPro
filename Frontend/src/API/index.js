class Controller {
    constructor(){
        this.url = "http://localhost:3000/api/v1/"
    }
    async signUp(data){
        const response = await fetch(this.url + "auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return {
            data: await response.json(),
            status: response.status
        };
    }

    async login(data){
        console.log("/POST login called with data",data)
        const response = await fetch(this.url + "auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return {
            data: await response.json(),
            status: response.status
        };
    }

}

export default new Controller();