import React from 'react'
import { Route, useLocation } from 'react-router-dom'


const GetStarted = () => {
    const location = useLocation()
    const modalStyles = {
        content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '200px',
            backgroundColor: 'primary',
            color: 'white',
            display: location.pathname === '/getstarted' ? 'block' : 'none'
        }
    }

    return (
        <div
            isOpen={location.pathname === '/getstarted'}
            style={modalStyles}
        >
            <h1 className='text-4xl'>Get Started</h1>
        </div>
    )
}

export default GetStarted