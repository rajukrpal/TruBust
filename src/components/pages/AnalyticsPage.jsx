
import SideNav from '../SideNav/SideNav'
import Navbar from '../Navbar/Navbar';
import { Box } from '@mui/material'
import Analytics from './Analytics';




const AnalyticsPage = () => {


  return (
    <>
    <div className='' >
    <Navbar className="bg-[#c6d6e4]" />
    <Box height={64}  />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box sx={{ minWidth: 240}} className="py-2 ">
        <Analytics />
      </Box>
      </Box>
    </div>
    
      
    </>
  )
}

export default AnalyticsPage;






