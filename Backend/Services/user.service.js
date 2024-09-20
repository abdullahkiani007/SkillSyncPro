const userModel = require('../Models/user.model');
const AWS = require('aws-sdk');



  
const s3 = new AWS.S3();


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
    },

    // generate presigned url
    async generatePreSignedUrl(folderName,fileName , fileType){
        console.log("Access key check: ", process.env.S3_ACCESS_KEY);
        const params = {
          Bucket: 'skillsyncprobucket', // Your bucket name
          Key: `${folderName}/${fileName}`,
          Expires: 120, // URL expiration time in seconds
          ContentType: fileType,
        };
      
        try {
          const url = await s3.getSignedUrlPromise('putObject', params);
          const itemUrl = `https://skillsyncprobucket.s3.ap-southeast-2.amazonaws.com/${folderName}/${fileName}`
            console.log('Presigned URL:', url);
            console.log('Item URL:',itemUrl);
          return {
              "status":200,
              "data":url
          }


        } catch (err) {
          console.error(err);
          return {
              "status":500,
              "message":"Internal server error"
          }
        }
      
    }
}


module.exports = UserService;