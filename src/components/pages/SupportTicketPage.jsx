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
      <Box sx={{ minWidth: 240}} className="p-5 w-full lg:px-[72px]">
        <SupportTicket />
      </Box>
      </Box>
    </div>
  )
}

export default SupportTicketPage
