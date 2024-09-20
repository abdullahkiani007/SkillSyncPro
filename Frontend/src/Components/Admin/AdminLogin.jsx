import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import auth from '../../API'
import { login } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await auth.login({ email, password, role: 'admin' })
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        dispatch(
          login({
            _id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            auth: true,
            role: response.data.user.role,
          })
        )
        navigate(`/admin/dashboard`)
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <Container
      maxWidth='xs'
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: '40px 30px',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          style={{
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#FF5722',
            textAlign: 'center',
          }}
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity='error' style={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: '25px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            }}
            InputProps={{ style: { borderRadius: '8px' } }}
          />
          <TextField
            label='Password'
            variant='outlined'
            fullWidth
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: '35px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            }}
            InputProps={{ style: { borderRadius: '8px' } }}
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            style={{
              backgroundColor: '#FF5722',
              color: '#fff',
              padding: '12px 0',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '8px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#E64A19')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#FF5722')
            }
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default AdminLoginPage
