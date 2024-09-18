import React, { useState } from 'react'
import { FaPython, FaJsSquare, FaDatabase } from 'react-icons/fa' // Importing icons for skills

const SkillsEndorsement = () => {
  const [openSkill, setOpenSkill] = useState(null)

  const skills = [
    {
      icon: <FaJsSquare className='text-yellow-500 text-3xl mr-3' />,
      name: 'JavaScript',
      level: 'Endorsed',
      levelColor: 'text-green-600',
      progress: 'w-full bg-green-500',
      description: 'Proficient in building dynamic web applications.',
    },
    {
      icon: <FaPython className='text-blue-500 text-3xl mr-3' />,
      name: 'Python',
      level: 'Intermediate',
      levelColor: 'text-yellow-600',
      progress: 'w-2/3 bg-yellow-500',
      description: 'Skilled in data analysis and scripting.',
    },
    {
      icon: <FaDatabase className='text-red-500 text-3xl mr-3' />,
      name: 'SQL',
      level: 'Needs Improvement',
      levelColor: 'text-red-600',
      progress: 'w-1/4 bg-red-500',
      description: 'Basic understanding of SQL for database management.',
    },
  ]

  const handleToggle = (index) => {
    setOpenSkill(openSkill === index ? null : index)
  }

  return (
    <div className='bg-gradient-to-r from-purple-300 via-blue-200 to-green-200 p-6 rounded-xl mb-8 shadow-lg'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800 text-center'>
        Your Skills
      </h2>
      <ul className='space-y-4'>
        {skills.map(
          ({ icon, name, level, levelColor, progress, description }, index) => (
            <li key={name} className='border-b border-gray-300'>
              <div
                className={`flex items-center justify-between p-4 cursor-pointer 
                          transition-transform transform hover:scale-105 
                          rounded-full border-2 border-transparent 
                          duration-300 ease-in-out`}
                onClick={() => handleToggle(index)}
              >
                <div className='flex items-center'>
                  {icon}
                  <span className='text-xl font-medium text-gray-800 ml-2'>
                    {name}
                  </span>
                </div>
                <div className='flex items-center ml-4'>
                  <span className={`${levelColor} font-semibold mr-3`}>
                    {level}
                  </span>
                  <div className='w-32 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div className={`h-full ${progress}`}></div>
                  </div>
                </div>
              </div>
              {openSkill === index && (
                <div className='p-4 text-gray-800 bg-white rounded-lg shadow-md mt-2'>
                  {description}
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default SkillsEndorsement
