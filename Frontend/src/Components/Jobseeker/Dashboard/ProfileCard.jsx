import React from 'react'

const ProfileCard = ({ userData }) => {
  return (
    <div className='bg-white w-1/3 sm:w-1/4 rounded-lg shadow-md p-5 m-5'>
      <h2 className='text-xl font-semibold mb-3'>Profile Overview</h2>
      <div className='flex flex-col sm:flex-row'>
        <img
          src={
            userData.profileImage ||
            'https://www.w3schools.com/w3images/avatar2.png'
          }
          alt='Profile'
          className='w-24 h-24 rounded-full mr-5'
        />
        <div>
          <p>
            <strong>Name:</strong> {userData.firstName || '-'}{' '}
            {userData.lastName || '-'}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || '-'}
          </p>
          {userData.phone && (
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
          )}
          {userData.location && (
            <p>
              <strong>Location:</strong> {userData.location}
            </p>
          )}
          {userData.bio && (
            <p className='mt-3'>
              <strong>Bio:</strong> {userData.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
