import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom'
import AssessmentCard from './AssessmentCard'
import employer from '../../../API/employer'
import Loader from '../../Loader/Loader'
import ViewAssessment from './ViewAssessment'
import EditAssessment from './EditAssessment'

const ManageAssessments = () => {
  const [loading, setLoading] = useState(true)
  const [assessments, setAssessments] = useState(null)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const getAssessments = async () => {
      const company = JSON.parse(localStorage.getItem('company'))
      const data = await employer.getAssessments(
        localStorage.getItem('token'),
        company._id
      )
      if (data.status === 200) {
        setAssessments(data.data.assessment)
        setLoading(false)
        console.log(data)
      } else {
        console.log('Error fetching assessments')
      }
    }
    getAssessments()
  }, [])

  const handleView = (assessment) => {
    setSelectedAssessment(assessment)
    setIsEditing(false)
  }

  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment)
    setIsEditing(true)
  }

  const handleSave = async (updatedAssessment) => {
    console.log('Saving updated assessment:', updatedAssessment)

    try {
      const accessToken = localStorage.getItem('accessToken')

      const response = await employer.updateAssessment(
        accessToken,
        updatedAssessment._id,
        updatedAssessment
      )
      console.log(response)
    } catch (err) {
      console.log('err ', err)
    }
    setIsEditing(false)
    setSelectedAssessment(null) // Reset to show the list again
  }

  const handleCancel = () => {
    setSelectedAssessment(null) // Reset selected assessment
    setIsEditing(false) // Ensure editing is turned off
  }

  const onDelete = async (assessment) => {
    console.log('Delete assessment', assessment)
    try {
      const data = await employer.deleteAssessment(
        localStorage.getItem('token'),
        assessment._id
      )
      if (data.status === 200) {
        const updatedAssessments = assessments.filter(
          (a) => a._id !== assessment._id
        )
        setAssessments(updatedAssessments)
        if (selectedAssessment && selectedAssessment._id === assessment._id) {
          setSelectedAssessment(null) // Deselect if the deleted assessment was selected
        }
      } else {
        console.log('Error deleting assessment')
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='py-20 px-10'>
      <nav className='flex justify-between mb-10'>
        <h1 className='font-bold text-4xl text-white'>
          Manage Skill Assessments
        </h1>
        <NavLink to='./create'>
          <Button
            variant='contained'
            sx={{
              fontSize: 14,
              color: 'white',
              padding: 2,
              backgroundColor: '#E14411',

              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            Create New Assessment
          </Button>
        </NavLink>
      </nav>
      <div>
        {selectedAssessment ? (
          isEditing ? (
            <>
              <EditAssessment
                assessment={selectedAssessment}
                onSave={handleSave}
              />
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleCancel}
                sx={{ marginTop: 2 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <ViewAssessment assessment={selectedAssessment} />
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleCancel}
                sx={{ marginTop: 2 }}
              >
                Back to List
              </Button>
            </>
          )
        ) : (
          assessments.map((assessment) => (
            <AssessmentCard
              key={assessment._id}
              assessment={assessment}
              onView={() => handleView(assessment)}
              onEdit={() => handleEdit(assessment)}
              onDelete={() => onDelete(assessment)}
            />
          ))
        )}
        {!selectedAssessment && assessments.length === 0 && (
          <Typography>No assessments available</Typography>
        )}
      </div>
    </div>
  )
}

export default ManageAssessments
