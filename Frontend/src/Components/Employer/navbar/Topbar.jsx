import React from 'react'
import { Button, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import {  MessageOutlined,SearchRounded, NotificationsOutlined} from '@mui/icons-material';



const Topbar = () => {
  return (
    <nav className='bg-white md:ml-4 md:pr-56 py-2  fixed w-full flex justify-between'>
      <div className='pl-10 flex justify-center items-center'>
        <TextField 
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        sx={{
          width:400,
        }} id="outlined-size-small" size='small' label="Search" variant="outlined" />
        <Button variant="contained" color="primary" className='ml-5'>Search</Button>
        </div>
        <div className='flex pr-10 justify-end '>
            <ul className='flex space-x-10 justify-center items-center'> 
                <li><MessageOutlined/></li>
                <li><NotificationsOutlined/></li>
            </ul>
        <div className=''>
        <img src="https://source.unsplash.com/random" alt='profile' className='w-16 h-16 rounded-full '/>
        </div>
        </div>
    </nav>

  )
}

export default Topbar