import { ArrowBack } from '@mui/icons-material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Controller from '../../../API/index'
import imageplaceholder from '../../../assets/placeholderImage_person.jpg'
import Loader from '../../Loader/Loader'

const Profile = () => {
  // Get user from redux store
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [userData, setNewUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await Controller.getProfile(token)

        if (response.status === 200) {
          setLoading(false)
          const { response: userData } = response.data

          // Format education dates
          userData.education = userData.education.map((edu) => ({
            ...edu,
            startDate: new Date(edu.startDate).toLocaleDateString('en-GB'),
            endDate: new Date(edu.endDate).toLocaleDateString('en-GB'),
          }))

          // Ensure the correct field for address is used
          setNewUser(userData)
        } else {
          console.log(response)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getUserInfo()
  }, [])

  // Handle broken image by setting to fallback placeholder
  const handleImageError = (e) => {
    e.target.src = imageplaceholder
  }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className='flex items-center mb-5 mt-6'>
        <ArrowBack
          sx={{
            cursor: 'pointer',
            fontSize: '30px',
            color: '#6B7280',
          }}
          onClick={() => navigate(-1)}
        />
        <h1 className='ml-3 flex-grow text-center font-bold text-3xl text-gray-700 bg-black bg-clip-text text-transparent tracking-wide'>
          Profile Management
        </h1>
      </div>

      <div className='min-h-screen bg-white p-10 flex justify-center items-center'>
        {/* Profile Container */}
        <div className='w-full max-w-5xl bg-white rounded-3xl p-10 relative '>
          {/* Profile Picture */}
          <div className='relative flex justify-center'>
            <img
              src={userData?.user?.profilePicture || imageplaceholder}
              alt='profile'
              onError={handleImageError} // Fallback to placeholder on error
              className='w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg hover:scale-110 transform transition-transform duration-300'
            />
          </div>

          {/* Personal Information */}
          <div className='mt-10 text-gray-900 '>
            <div className='border-2 p-4 rounded-lg border-black'>
              <h2 className='text-3xl font-bold mb-5 bg-black text-transparent bg-clip-text'>
                Personal Information
              </h2>
              <div className='bg-gray-50 p-6 rounded-lg '>
                <div className='space-y-4'>
                  {[
                    { label: 'First Name', value: userData?.user?.firstName },
                    { label: 'Last Name', value: userData?.user?.lastName },
                    { label: 'Email', value: userData?.user?.email },
                    {
                      label: 'Phone',
                      value: userData?.user?.phone || 'Not Provided',
                    },
                    {
                      label: 'Address',
                      value: userData?.user?.address || 'Not Provided',
                    }, // Fixed: Correctly accessing userData.user.address
                  ].map((info, index) => (
                    <div key={index}>
                      <h3 className='font-bold text-xl text-black'>
                        {info.label}
                      </h3>
                      <p className='border-2 rounded-lg text-black px-3 py-2 border-gray-200 bg-gray-100'>
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className='mt-10'>
              <h2 className='text-3xl font-bold mb-5 bg-black text-transparent bg-clip-text'>
                Education
              </h2>
              {userData?.education.length > 0 ? (
                userData.education.map((edu, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 p-6  border-2 rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-2xl hover:scale-105'
                  >
                    <div>
                      <h3 className='font-bold text-lg text-gray-600'>
                        Degree: {edu.degree}
                      </h3>
                      <p className='text-gray-900'>
                        Institution: {edu.institution}
                      </p>
                      <p className='text-gray-700'>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <div className='flex justify-end'>
                      <Button
                        className=' rounded-full shadow-lg ' // Changed to "rounded-full" for an oval-shaped button
                        variant='contained'
                        onClick={() => {
                          localStorage.setItem(
                            'profile',
                            JSON.stringify(userData)
                          )
                          navigate('./edit')
                        }}
                        sx={{
                          backgroundColor: 'black',
                          flexDirection: 'reverse',
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>No Education Provided</p>
              )}
            </div>

            {/* Skills Section */}
            <div className='mt-10'>
              <h2 className='text-3xl font-bold mb-5 bg-black text-transparent bg-clip-text'>
                Skills
              </h2>
              <div className='flex flex-wrap gap-3'>
                {userData?.skills.length > 0 ? (
                  userData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className='bg-black text-white px-4 py-2 rounded-full shadow-lg '
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500'>No Skills Provided</p>
                )}
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className='mt-20 flex justify-end'>
            <Button
              className='w-[20%] height-[20%] rounded-full shadow-lg ' // Changed to "rounded-full" for an oval-shaped button
              variant='contained'
              onClick={() => {
                localStorage.setItem('profile', JSON.stringify(userData))
                navigate('./edit')
              }}
              sx={{
                backgroundColor: 'black',
                flexDirection: 'reverse',
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
