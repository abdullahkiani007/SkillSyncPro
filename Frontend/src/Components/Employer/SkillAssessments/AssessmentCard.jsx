import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Modal,
  Box,
  Button,
} from '@mui/material'
import {
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  FileCopyOutlined,
} from '@mui/icons-material'

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

const AssessmentCard = ({ assessment, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false)

  // Handle open/close modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Confirm delete action
  const handleConfirmDelete = () => {
    onDelete(assessment)
    handleClose()
  }

  return (
    <>
      <Card
        sx={{
          marginBottom: 2,
          borderRadius: 2,
          // Slight shadow
          transition: 'transform 0.3s ease-in-out', // Smooth transition for hover
          '&:hover': {
            transform: 'scale(1.03)', // Slightly scale up on hover
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
          },
        }}
      >
        <CardContent>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              marginBottom: 1,
              color: 'text.primary',
            }}
          >
            {assessment.title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{
              marginBottom: 2,
              color: 'text.secondary',
            }}
          >
            {assessment.description.substring(0, 100)}...
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton
                color='dark'
                onClick={() => onView(assessment)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)', // Blue hover effect
                  },
                }}
              >
                <VisibilityOutlined />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color='dark'
                onClick={() => onEdit(assessment)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)', // Blue hover effect
                  },
                }}
              >
                <EditOutlined />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color='error'
                onClick={handleOpen} // Open modal on delete icon click
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.1)', // Red hover effect
                  },
                }}
              >
                <DeleteOutline />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color='secondary'
                onClick={() => console.log('Duplicated')}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(156, 39, 176, 0.1)', // Purple hover effect
                  },
                }}
              ></IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant='h6' component='h2'>
            Confirm Deletion
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this assessment?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant='contained'
              color='error'
              onClick={handleConfirmDelete}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AssessmentCard
