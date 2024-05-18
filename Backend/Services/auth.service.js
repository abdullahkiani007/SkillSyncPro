const userModel = require('../Models/user.model');
const userService = require('./user.service');
const generateToken = require('../Utils/jwt');
const jobSeekerModel = require('../Models/jobSeeker.model');
const employerModel = require('../Models/employer.model');

const AuthService = {
    
  async login(email, password,role) {
        const user = await userModel.findOne({ email });
        if (!user) {
            return {
                error: true,
                message: 'User not found'
            };
        }

         if (user.role.toLowerCase() !== role.toLowerCase()) {
            console.log(user.role , role)
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
            user:{firstName: user.firstName,
                lastName:user.lastName,
            email: user.email,
            role: user.role,
            id: user._id},
            token
        }
    }
,
    async signup(email, password, firstName,lastName, role) {
        if (await userService.emailExists(email)) {
            return {
                error: true,
                message: 'Email already exists'
            };
        }
        const user = await userService.createUser( email, password, firstName,lastName, role );
        if (role === "jobseeker") {
            await jobSeekerModel.create({
                user: user._id
            });
        }else if (role === "employer") {
            await employerModel.create({
                user: user._id
            });
        }
        // set up jwt token using passport js
        const token = generateToken(user._id, user.role);

        return {
            error: false,
            user:{
                firstName: user.firstName,
                lastName:user.lastName,
                email: user.email,
                role: user.role,
                id: user._id
            },
            token
        };
    }
}


module.exports = AuthService;