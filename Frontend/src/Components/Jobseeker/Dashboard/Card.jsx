// Card.js
import React from 'react'

const Card = ({ title, children }) => {
  return (
    <div className='bg-white p-5 rounded-lg shadow mb-10'>
      <h2 className='text-xl font-semibold mb-3'>{title}</h2>
      {children}
    </div>
  )
}

export default Card
