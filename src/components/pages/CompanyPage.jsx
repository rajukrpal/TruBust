import Navbar from '../Navbar/Navbar'
import { Box } from '@mui/material'
import SideNav from '../SideNav/SideNav'
import Company from './Company'

const CompanyPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box sx={{ minWidth: 240}} className="lg:p-8 p-5 w-full">
        <Company/>
      </Box>
      </Box>
    </div>
  )
}

export default CompanyPage
