const userModel = require('../Models/user.model');
const userService = require('./user.service');
const generateToken = require('../Utils/jwt');

class AuthService {
    
  async login(email, password,userType) {
        const user = await userModel.findOne({ email });
        if (!user) {
            return {
                error: true,
                message: 'User not found'
            };
        }

         if (user.role.toLowerCase() !== userType.toLowerCase()) {
            console.log(user.role , userType)
            return {
                error: true,
                message: 'User not found'
            };
        }

        if (user.password !== password ) {

            return {
                error: true,
                message: 'Incorrect password'
            };
        }

        // set up jwt token using passport js
        const token = generateToken(user._id, user.role);
        return{
            error: false,
            user:{name: user.name,
            email: user.email,
            role: user.role,
            id: user._id},
            token
        }
    }

    async signup(email, password, name, role) {
        if (await userService.emailExists(email)) {
            return {
                error: true,
                message: 'Email already exists'
            };
        }
        const user = await userService.createUser( email, password, name, role );

        // set up jwt token using passport js
        const token = generateToken(user._id, user.role);

        return {
            error: false,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id
            },
            token
        };
    }
}


module.exports = new AuthService();