import React, { useState, useEffect } from 'react'
import ApplicationSummary from './ApplicantsSummary'
import CandidateTable from './CandidatesTables'
import EmployerController from '../../../../API/employer'
import Loader from '../../../../Components/Loader/Loader'

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      const accessToken = localStorage.getItem('accessToken')
      const response = await EmployerController.getAllCandidates(accessToken)
      console.log('Get all candidates', response)
      const data = response.data
      if (response.status === 200) {
        setCandidates(data)
      }
    }
    fetchCandidates()
  }, [])

  return (
    <div className='bg-white min-h-screen bg-gradient-to-r from-secondary-dark to-secondary-dark'>
      <h1 className='py-10 px-6 font-bold text-2xl text-white'>
        Candidates Summary
      </h1>
      <div className='ml-20'>
        <ApplicationSummary />
      </div>
      <h1 className='py-10 px-6 font-bold text-2xl text-white'>
        Candidates List:{' '}
      </h1>
      <div>
        <CandidateTable candidates={candidates} />
      </div>
    </div>
  )
}

export default CandidatesList
