import React from 'react'
import { motion } from 'framer-motion'
import './Backdrop.css'

const Backdrop = ({ children , onClick}) => {
    console.log(children)
  return (
    <motion.div 
// className='absolute top-0 bottom-0 h-full w-full bg-white opacity-20 flex justify-center items-center z-50'   
className='backdrop backdrop-blur-lg bg-white/30 '
 onClick={onClick}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >{children}
    
    </motion.div>
  )
}

export default Backdrop