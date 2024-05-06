import React from 'react'
import { motion } from 'framer-motion'
import Backdrop from '../backdrop'
import './Modal.css'
import { Link } from 'react-router-dom'

const Modal = ({ handleClose , text , children}) => {
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
        className='w-full m-2 md:w-auto md:max-w-[90%] h-1/2 md:max-h-[300px] 
        md:m-auto p-8 rounded-lg flex flex-col items-center justify-center bg-primary text-white'
        onClick={(e)=>e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >   
            {children}
        </motion.div>
    </Backdrop>
  )
}

export default Modal