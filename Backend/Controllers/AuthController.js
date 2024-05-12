const userAuth = require('../Services/auth.service')

class AuthController  {
    async login(req, res,next) {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        try{
            const user = await userAuth.login(email);
            if (user.error) {
                const error = {
                    status: 401,
                    message: user.message
                }
                next(error);
            }


        }catch(error){
            next(error);
        }
    }

    async signup(req, res,next) {
        try{
            const {email,password,name,role} = req.body;

            const user = await userAuth.signup(email,password,name,role);
            if (user.error) {
                const error = {
                    status: 401,
                    message: user.message
                }
                next(error);
            }
            res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }
}


module.exports = new AuthController();