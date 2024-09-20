const jobseekerService = require('../Services/jobSeeker.service')
const UserService = require('../Services/user.service')

const UserController = {
  async getInfo(req, res, next) {
    console.log('Info route')
    const { _id, role } = req.user
    console.log(_id, role)
    if (role.toLowerCase() === 'jobseeker') {
      const response = await jobseekerService.getJobSeeker(_id)
      console.log('response', response)
      if (response) {
        return res.status(200).json({
          response,
        })
      }
      return res.status(404).json({
        message: 'jobseeker not found',
      })
    }
    res.status(200).json({
      message: 'Employer route',
    })
  },
  async updateInfo(req, res, next) {
    console.log('Update info route')
    const { _id, role } = req.user
    console.log(_id, role)
    if (role.toLowerCase() === 'jobseeker') {
      const response = await jobseekerService.updateJobSeeker(_id, req.body)
      console.log('response', response)
      if (response.status === 200) {
        return res.status(200).json({
          response,
        })
      }
      return res.status(404).json({
        message: 'jobseeker not found',
      })
    }
    res.status(200).json({
      message: 'Employer route',
    })
  },

  async generatePreSignedUrl(req, res, next) {
    console.log('Generate presigned url route')
    const { fileName, fileType, folderName } = req.query
    console.log(fileName, fileType)
    const url = await UserService.generatePreSignedUrl(
      folderName,
      fileName,
      fileType
    )
    if (url.status === 200) {
      return res.status(200).json({
        url,
      })
    }
    return res.status(500).json({
      message: 'Internal server error',
    })
  },
}

module.exports = UserController
