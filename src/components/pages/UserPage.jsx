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
      <Box sx={{ minWidth: 210}} className="py-2 w-full lg:px-2">
        <User />
      </Box>
      </Box>
    </div>
  )
}

export default UserPage
