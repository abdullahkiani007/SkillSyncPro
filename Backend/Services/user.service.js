const userModel = require('../Models/user.model');

const UserService = {
    async createUser(email, password, firstName,lastName, role) {
        // create user
        const user = await userModel.create({ email, password, firstName,lastName, role });
        return  user;

    },
    async updateUser(id, data) {
        const user = await userModel.findOneAndUpdate({ _id: id},
             data, { new: true });
        return user;
    },

    async emailExists(email) {
        const user = await userModel.findOne({ email });
        return user ? true : false;
    },

    async getInfo(id){
        let response;
        try{
            response = await userModel.findById(id);
            if (response){
                return {
                    "status":200,
                    "data":response,
                }
            }else{
                return{
                    "status":404,
                    "message":"User not found",
                }
            }
        }catch(err){
            return {
                "status":500,
                "message":"Internal server error"
            }
        }
    }
}


module.exports = UserService;