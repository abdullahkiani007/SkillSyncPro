import React from 'react'
import {Grid} from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
    
    <Grid
  visible={true}
  height="80"
  width="80"
  color="#e14411"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
  )
}

export default Loader