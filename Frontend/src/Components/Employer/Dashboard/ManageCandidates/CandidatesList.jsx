import React, { useEffect, useState } from 'react'
import EmployerController from '../../../../API/employer'
import Loader from '../../../../Components/Loader/Loader'
import ApplicationSummary from './ApplicantsSummary'
import CandidateTable from './CandidatesTables'

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
    <div className=' min-h-screen'>
      <h1 className='py-10 px-6 font-bold text-2xl text-black'>
        Candidates Summary
      </h1>
      <div className='ml-20'>
        <ApplicationSummary />
      </div>
      <h1 className='py-10 px-6 font-bold text-2xl text-black'>
        Candidates List:{' '}
      </h1>
      <div>
        <CandidateTable candidates={candidates} />
      </div>
    </div>
  )
}

export default CandidatesList
