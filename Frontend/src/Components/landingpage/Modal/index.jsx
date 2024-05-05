import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from '../backdrop'
import './Modal.css'

const Modal = ({ handleClose , text}) => {
    console.log("I am the modal")
    const dropIn = {
        hidden:{ 
            y:"-100vh",
            opacity:0,
        },
        visible:{
            y:"0",
            opacity:1,
            transition:{
                duration:0.1,
                type:"spring",
                damping:25,
                stiffness:500
            }
        },
        exit:{
            y:"100vh",
            opacity:0,
        }
    }
  return (
    <Backdrop onClick={handleClose}>
        <motion.div
        className='w-full md:w-auto md:max-w-[90%] h-1/2 md:max-h-[300px] 
        m-auto p-8 rounded-lg flex flex-col items-center bg-primary text-white'
        onClick={(e)=>e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >   
            <h1 className='font-bold text-lg' >SkillSync Pro</h1>
            <div className='flex flex-col justify-center align-center pt-4 pb-10' >
            <motion.button 
            className='bg-secondary-dark p-2 rounded-lg my-2'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
                I'm a Job Seeker
            </motion.button>
            <motion.button 
            className='bg-secondary-dark p-2 rounded-lg my-2'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
                I want to hire
            </motion.button>
            </div>
           <p className='underline hover:cursor-pointer'>
            Already have an account?
           </p>
        </motion.div>
    </Backdrop>
  )
}

export default Modal