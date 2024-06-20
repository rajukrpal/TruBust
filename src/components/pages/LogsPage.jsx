import Navbar from '../Navbar/Navbar'
import { Box } from '@mui/material'
import SideNav from '../SideNav/SideNav'
import Logs from './Logs'

const LogsPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box sx={{ minWidth: 240}} className="py-2  w-full lg:px-2">
        <Logs />
      </Box>
      </Box>
    </div>
  )
}

export default LogsPage
