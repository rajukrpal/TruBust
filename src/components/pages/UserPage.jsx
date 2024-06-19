import Navbar from '../Navbar/Navbar'
import { Box } from '@mui/material'
import SideNav from '../SideNav/SideNav'
import User from './User'

const UserPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box className="p-8 w-full lg:px-[72px] ">
        <User />
      </Box>
      </Box>
    </div>
  )
}

export default UserPage
