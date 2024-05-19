// AdminLoginPage.js
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import auth from '../../API';
import { login } from '../../redux/userSlice';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    try{
    const response = await auth.login({ email, password, role: 'admin' });
    console.log(response);
    if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);

        dispatch(
          login({
            _id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName:response.data.user.lastName,
            email: response.data.user.email,
            auth: true,
            role: response.data.user.role,
          })
        );
        navigate(`/admin/dashboard`);
      }
    }catch(error){
        console.log(error);
        }

  };

  return (
    <Container maxWidth="xs" className="mt-48 ">
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" component="h2" className="mb-20 text-center">
          Admin Login
        </Typography>
        <form onSubmit={handleLogin} className='pt-10'>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;
