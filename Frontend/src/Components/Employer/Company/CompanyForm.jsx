import React, { useState, useEffect } from 'react'

const Signup = () => {
  const [option, setOption] = useState('join')
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [newCompany, setNewCompany] = useState({
    name: '',
    description: '',
    industry: '',
    website: '',
    logo: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
  })

  useEffect(() => {
    // Fetch companies from backend
    setCompanies([
      {
        name: 'tera',
        description: '23234',
        industry: 'software',
        website: 'www.googe.com',
        logo: 'adf',
        address: 'hostel',
        contactEmail: 'cajda@gmail.com',
        contactPhone: '9329323823',
      },
    ])
  }, [])

  const handleOptionChange = (e) => {
    setOption(e.target.value)
  }

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value)
  }

  const handleNewCompanyChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (option === 'join') {
      console.log('Joining company', selectedCompany)
    } else {
      // Logic to register a new company
      console.log('Registering new company', newCompany)
    }
  }

  return (
    <div className='max-w-[800px] w-full  mx-auto my-10  p-8 bg-primary rounded-lg'>
      <h1 className='font-bold mb-4 text-white text-center text-4xl'>
        Employer Signup
      </h1>
      <form onSubmit={handleSubmit} className='p-8'>
        <fieldset>
          <legend className=' text-2xl text-white mb-4'>
            Choose an option
          </legend>
          <div className='flex space-x-4 mb-4 justify-center'>
            <label className='flex items-center text-xl text-white'>
              <input
                type='radio'
                value='join'
                checked={option === 'join'}
                onChange={handleOptionChange}
                className='mr-3 text-black bg-black'
              />
              Join a Company
            </label>
            <label className='flex  text-xl text-white items-center'>
              <input
                type='radio'
                value='register'
                checked={option === 'register'}
                onChange={handleOptionChange}
                className='mr-2'
              />
              Register a Company
            </label>
          </div>
        </fieldset>

        {option === 'join' ? (
          <div className='mb-4'>
            <label className='block mb-2 text-white'>Select Company</label>
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}
              className='w-full p-2 border rounded'
            >
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <input
              type='text'
              name='name'
              value={newCompany.name}
              onChange={handleNewCompanyChange}
              placeholder='Company Name'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='description'
              value={newCompany.description}
              onChange={handleNewCompanyChange}
              placeholder='Description'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='industry'
              value={newCompany.industry}
              onChange={handleNewCompanyChange}
              placeholder='Industry'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='website'
              value={newCompany.website}
              onChange={handleNewCompanyChange}
              placeholder='Website'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='logo'
              value={newCompany.logo}
              onChange={handleNewCompanyChange}
              placeholder='Logo URL'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='address'
              value={newCompany.address}
              onChange={handleNewCompanyChange}
              placeholder='Address'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='email'
              name='contactEmail'
              value={newCompany.contactEmail}
              onChange={handleNewCompanyChange}
              placeholder='Contact Email'
              className='w-full p-2 border rounded mb-4'
            />
            <input
              type='text'
              name='contactPhone'
              value={newCompany.contactPhone}
              onChange={handleNewCompanyChange}
              placeholder='Contact Phone'
              className='w-full p-2 border rounded mb-4'
            />
          </>
        )}
        <button
          type='submit'
          className='w-full bg-black text-white p-2 rounded mt-4'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
