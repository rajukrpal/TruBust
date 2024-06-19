import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box } from '@mui/material'
import SideNav from '../SideNav/SideNav'
import SecureChannel from './SecureChannel'

const SecureChannelPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box sx={{ minWidth: 240}} className="p-5 w-full lg:px-[72px]">
        <SecureChannel />
      </Box>
      </Box>
    </div>
  )
}

export default SecureChannelPage
