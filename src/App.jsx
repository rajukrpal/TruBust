
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Login from "./components/pages/Login"
import AnalyticsPage from "./components/pages/AnalyticsPage"
import CompanyPage from "./components/pages/CompanyPage"
import UserPage from "./components/pages/UserPage"
import SupportTicketPage from "./components/pages/SupportTicketPage"
import ExternalRequestViewPage from "./components/pages/ExternalRequestViewPage"
import InternalRequestViewPage from "./components/pages/InternalRequestViewPage"
import SecureChannelPage from "./components/pages/SecureChannelPage"
import LogsPage from "./components/pages/LogsPage"
import PageNotFound from "./components/pages/PageNotFound"
import ProtectedRouters from "./utils/ProtectedRouters"


const App = () => {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/analytics" element={<ProtectedRouters Component={AnalyticsPage} />} />
          <Route path="/company" element={<ProtectedRouters Component={CompanyPage} />}  />
          <Route path="/user" element={<ProtectedRouters Component={UserPage} />} />
          <Route path="/support-ticket" element={<ProtectedRouters Component={SupportTicketPage} />} />
          <Route path="/external-request-view" element={<ProtectedRouters Component={ExternalRequestViewPage} />} />
          <Route path="/internal-request-view" element={<ProtectedRouters Component={InternalRequestViewPage} />}  />
          <Route path="/secure-channel" element={<ProtectedRouters Component={SecureChannelPage} />}  />
          <Route path="/logs"  element={<ProtectedRouters Component={LogsPage} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;















