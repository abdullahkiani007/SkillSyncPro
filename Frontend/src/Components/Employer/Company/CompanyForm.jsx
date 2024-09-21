import React, { useState, useEffect } from 'react'
import {
  Container,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  MenuItem,
  Select,
} from '@mui/material'

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
    <Container maxWidth='md' className='mt-20 p-20 bg-gray-100'>
      <Typography variant='h4' component='h1' className='font-bold mb-8'>
        Employer Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Choose an option</FormLabel>
          <RadioGroup row value={option} onChange={handleOptionChange}>
            <FormControlLabel
              value='join'
              control={<Radio />}
              label='Join a Company'
            />
            <FormControlLabel
              value='register'
              control={<Radio />}
              label='Register a Company'
            />
          </RadioGroup>
        </FormControl>

        {option === 'join' ? (
          <FormControl fullWidth margin='normal'>
            <InputLabel>Select Company</InputLabel>
            <Select value={selectedCompany} onChange={handleCompanyChange}>
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <TextField
              fullWidth
              margin='normal'
              label='Company Name'
              name='name'
              value={newCompany.name}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Description'
              name='description'
              value={newCompany.description}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Industry'
              name='industry'
              value={newCompany.industry}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Website'
              name='website'
              value={newCompany.website}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Logo URL'
              name='logo'
              value={newCompany.logo}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Address'
              name='address'
              value={newCompany.address}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Contact Email'
              name='contactEmail'
              value={newCompany.contactEmail}
              onChange={handleNewCompanyChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Contact Phone'
              name='contactPhone'
              value={newCompany.contactPhone}
              onChange={handleNewCompanyChange}
            />
          </>
        )}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='mt-4'
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Signup
