const userModel = require('../Models/user.model');

class UserService {
    async createUser(email, password, name, role) {
        // create user
        const user = await userModel.create({ email, password, name, role });
        return  user;

    }

    async emailExists(email) {
        const user = await userModel.findOne({ email });
        return user ? true : false;
    }
}


module.exports = new UserService();