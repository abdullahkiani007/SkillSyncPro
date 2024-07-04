import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import ProfileForm from './ProfileForm';
import Controller from "../../../API/index"
import Loader from '../../Loader/Loader';

const Profile = () => {

    // get user from redux store
    const user = useSelector((state) => state.user);
    const [readMode, setreadMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(null); // Add this line

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await Controller.getProfile(token)

                if (response.status === 200) {
                    setLoading(false)
                    const { response: userData } = response.data
                    console.log("data", userData)
                    const newUser = {
                        firstName: userData.user.firstName,
                        lastName: userData.user.lastName,
                        email: userData.user.email,
                        phone: userData.user.phone,
                        address: userData.user.address,
                        skills: userData.skills,
                        education: userData.education,
                        experience: userData.experience
                    }
                    setNewUser(newUser); // Add this line
                    console.log(newUser)
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.log(err)
            }
        };
        getUserInfo();
    }, [])

    // Use newUser in your component
    // ...

    return loading ? <Loader /> : (
        <div className="w-full  bg-gray-100 p-20 mt-20 flex flex-col items-center">
            <img src="https://source.unsplash.com/random" alt='profile' className='w-24 h-24 rounded-full mb-5' />
            <h1 className='font-bold text-2xl mb-5'>Profile management</h1>
            {readMode ? (
                <div className="mt-5 w-full h-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <p className="text-lg font-bold">First Name:</p>
                            <p className="text-lg font-bold">Last Name:</p>
                            <p className="text-lg font-bold">Email:</p>
                            <p className="text-lg font-bold">Phone:</p>
                            <p className="text-lg font-bold">Address:</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-lg">{newUser?.firstName || "-"}</p>
                            <p className="text-lg">{newUser?.lastName || "-"}</p>
                            <p className="text-lg">{newUser?.email || "-"}</p>
                            <p className="text-lg">{newUser?.phone || "-"}</p>
                            <p className="text-lg">{newUser?.address || "-"}</p>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h1 className='font-bold text-xl'>Skills</h1>
                        {newUser?.skills?.map((skill, index) => {
                            return <p key={index} className="text-lg">{skill}</p>
                        })
                        }
                        <h1 className='font-bold text-xl'>Education</h1>
                        {newUser?.education?.map((edu, index) => {
                            return <p key={index} className="text-lg">{edu.institution}</p>
                        })
                        }
                        <h1 className='font-bold text-xl'>Experience</h1>
                        {newUser?.experience?.map((exp, index) => {
                            return <p key={index} className="text-lg">{exp}</p>
                        })
                        }
                        </div>
                    <div className=' mt-20'>
                        <Button className='ml-20' variant="contained" onClick={() => setreadMode(false)}>Edit Profile</Button>
                    </div>

                </div>) : (
                <ProfileForm setreadMode={setreadMode} formData={newUser} setFormData={setNewUser} />
            )}
        </div>
    )
}

export default Profile