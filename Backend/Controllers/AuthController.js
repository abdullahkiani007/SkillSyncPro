const userAuth = require('../Services/auth.service')

class AuthController  {
    async login(req, res,next) {
        console.log("POST /login called ")
        const {email,password,userType} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        try{
            const user = await userAuth.login(email,password,userType);
            if (user.error) {
                const error = {
                    status: 401,
                    message: user.message
                }
                return next(error);
            }
            res.status(200).json({
                user : user.user,
                token : user.token
            });


        }catch(error){
            return next(error);
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
                return next(error);
            }
            res.status(201).json({
                user : user.user,
                token : user.token
            });
        }catch(error){
           return next(error);
        }
    }
}


module.exports = new AuthController();