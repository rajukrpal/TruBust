import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box } from '@mui/material'
import SideNav from '../SideNav/SideNav'
import ExternalRequestView from './ExternalRequestView'

const ExternalRequestViewPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box className="p-8 w-full lg:px-[72px]">
        <ExternalRequestView />
      </Box>
      </Box>
    </div>
  )
}

export default ExternalRequestViewPage