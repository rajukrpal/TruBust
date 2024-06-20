import { Box } from "@mui/material"
import Navbar from "../Navbar/Navbar"
import SideNav from "../SideNav/SideNav"
import SupportTicket from "./SupportTicket"


const SupportTicketPage = () => {
  return (
    <div >
    <Navbar />
    <Box height={64} />
      <Box sx={{ display: 'flex' }}  >
      <SideNav/>
      <Box sx={{ minWidth: 210}} className="py-2 w-full lg:px-2">
        <SupportTicket />
      </Box>
      </Box>
    </div>
  )
}

export default SupportTicketPage
