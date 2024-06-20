/* eslint-disable react/prop-types */
import { Box, Button, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CompunyssTable from '../tables/CompunyssTable'
import { TfiCheckBox } from "react-icons/tfi";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa6";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AnalyticTable from '../tables/AnalyticTable';
import { GetRequestApi, companyWithUser, singleCompany } from '../../dataApi/Data';
import ViewsTableEndPointsList from '../tables/tablesPage/ViewsTableEndPointsList';
import ViewTableExternalRequest from '../tables/tablesPage/ViewTableExternalRequest';
import ViewTable from '../tables/tablesPage/ViewTable';




const ViewPage = (props) => {
  const {companyData} = props


  const [viewPageClose,setViewPageClose] = useState(true);
  const [value, setValue] = useState('1');
  const [endPointsList , setEndPointsList] = useState("")
  const [externalRequest,setExternalRequest] = useState("")
  const [requestData , setRequestData] = useState("")
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handaleClose = () =>{
    setViewPageClose(false)
  }

useEffect(()=>{
  const featchData = async() =>{
    try {
      const companyID = companyData.id
  const componyTableData = await companyWithUser(companyID)
  setEndPointsList(componyTableData.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  featchData();
  
},[])


useEffect(()=>{
  try {
    const featchDataRequest = async() =>{
        const getTableData = await GetRequestApi();
        const tableExternal = getTableData.data.data;
        const filterData = tableExternal.filter(item => item.companyID === companyData.id);
        setRequestData(filterData)

    } 
    featchDataRequest()
  } catch (error) {
    console.log(error)
  }
},[])

  return (
    <>
    {viewPageClose ? 
    <div>
      <h1 className='pb-3'>
        <Button variant='contained' onClick={handaleClose}>Close</Button>
      </h1>
      <div>
        <div className='lg:grid grid-cols-12 lg:gap-3 '>
          <div className='col-span-5'>
            <div>
            <Box sx={{
               width: "100%",
               boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
               borderRadius: "10px",
               paddingTop:""
            }}>
          <div className='p-4 '> 
            <div className='flex justify-center items-center '>
              <div className='pt-14'>
                <div className='flex justify-center'>
              <img className='h-20 w-20 rounded-xl' src={companyData.companyLogo} alt="" />
                </div>
              <h1 className='pt-6 pb-2 font-semibold'>{companyData.name}</h1>
              <center className='text-center flex justify-center'>
                <p className=' w-fit p-1 rounded-md text-sm bg-gray-400'>Admin</p>
              </center>
              </div>
            </div>
            <div className='flex justify-between py-5'>
              <div>
                <div className='flex gap-3 w-full items-center'>
                  <div className='text-[30px] bg-[#dcd9fb] p-2 rounded-lg'>
                  <TfiCheckBox className='text-[#7367f0]' />
                  </div>
                  <div className='text-sm'>
                    <p>1,230</p>
                    <p>Task Done</p>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex gap-3 w-full items-center'>
                  <div className='text-[30px] bg-[#dcd9fb] p-2 rounded-lg'>
                  <IoBagHandleOutline className='text-[#7367f0]' />
                  </div>
                  <div className='text-sm'>
                    <p>1,230</p>
                    <p>Task Done</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div>
                <h4 className='py-4'>DETAILS</h4>
              </div>
              <div className='space-y-3'>
                <p className='font-bold'>Username: <span className='font-extralight'>{companyData.name}</span></p>
                <p className='font-bold'>Email: <span className='font-extralight'>{companyData.email}</span></p>
                <p className='font-bold'>Status: <span className='font-extralight'> Active</span></p>
                <p className='font-bold'>Role: <span className='font-extralight'>Admin</span></p>
                <p className='font-bold'>Tax ID: <span className='font-extralight'>Tax-8894</span></p>
                <p className='font-bold'>Contact: <span className='font-extralight'>(829) 537-0057</span></p>
                <p className='font-bold'>Language: <span className='font-extralight'>English</span></p>
                <p className='font-bold'>Country: <span className='font-extralight'>{companyData.country}</span></p>
              </div>
              <div>
                <center className='space-x-5 py-3'>
                  <Button variant='contained'>Edit</Button>
                  <Button variant='contained' color='error'>Suspend</Button>
                </center>
              </div>
            </div>
          </div>
          </Box>
          </div>
          <div className='pt-10'>
          <Box sx={{
             width: "100%",
             boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
             borderRadius: "10px",
             paddingTop:""
          }}>
          <div className=''>
            <div>
              <h2 className='py-4'>User Activity Timeline</h2>
            </div>
            <ul className='pl-16 py-4'> 
            <li className='py-3 relative after:content-[&quot;&quot;] after:absolute after:bg-red-300 after:top-4 after:-left-10 after:w-3 after:h-3 after:rounded-full before:absolute before:top-4 before:-left-[35px] before:w-[1px] before:h-[93px] before:content-[&quot;&quot;] before:bg-[#2f2b3d27]'>
              <div className=''>
                <h5>12 Invoices have been paid</h5>
                <h6>Invoices have been paid to the company</h6>
                <p className='flex gap-2 items-center'> <AiOutlineFilePdf className='text-[red]'/> Invoices.pdf</p>
              </div>
            </li>
            <li className='py-3 relative after:content-[&quot;&quot;] after:absolute after:bg-blue-500 after:top-4 after:-left-10 after:w-3 after:h-3 after:rounded-full before:absolute before:top-4 before:-left-[35px] before:w-[1px] before:h-[120px] before:content-[&quot;&quot;] before:bg-[#2f2b3d27]'>
              <div>
                <h5>12 Invoices have been paid</h5>
                <h6>React Project meeting with john @10:15am</h6>
                <div className='flex items-center gap-3'>
                  <img className='h-10 w-10 rounded-full' src="../../../public/images/user.png" alt="" />
                  <div className='text-sm'>
                    <p>John Doe (Client)</p>
                    <p>CEO of Kelly Group</p>
                  </div>
                </div>
                
              </div>
            </li>
            <li className='py-3 relative after:content-[&quot;&quot;] after:absolute after:bg-cyan-400 after:top-4 after:-left-10 after:w-3 after:h-3 after:rounded-full before:absolute before:top-4 before:-left-[35px] before:w-[1px] before:h-[80px] before:content-[&quot;&quot;] before:bg-[#2f2b3d27]'>
              <div>
                <h5>12 Invoices have been paid</h5>
                <h6>Add files to new design folder</h6>
              </div>
            </li>
            <li className='py-3 relative after:content-[&quot;&quot;] after:absolute after:bg-green-500 after:top-4 after:-left-10 after:w-3 after:h-3 after:rounded-full before:absolute before:top-4 before:-left-[35px] before:w-[1px] before:h-full before:content-[&quot;&quot;] before:bg-[#2f2b3d27]'>
              <div>
                <h5>12 Create invoices for client</h5>
                <h6>Weekly review of freshly prepared design for our new app.</h6>
              </div>
            </li>
            </ul>
          </div>
          </Box>
          </div>
          <div className='pt-10'>
            <Box 
            sx={{
              width: "100%",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              paddingTop:""
            }}
            >
            <ViewTable />
            </Box>
          </div>
          </div>
          <div className='col-span-7 '>

            <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab 
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaUserCheck style={{ marginRight: '4px' }} />
                  &nbsp; Company Info
                </div>
              }
              value="1"
             />
            <Tab label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CiLock style={{ marginRight: '4px' }} />
                  &nbsp; Company Info
                </div>
              } value="2" />
            <Tab label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaDollarSign style={{ marginRight: '4px' }} />
                  &nbsp; Company Info
                </div>
              } value="3" />
            
           
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{gap:20}}>
            <Box sx={{
               width: "100%",
               boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
               borderRadius: "10px",
            }}>
            <div className=' p-3' >
            <div className='space-y-4'>
            <p className='font-bold'>Total Employers : <span className='font-thin'>{companyData.totalEmployers}</span></p>
            <p className='font-bold'>Company Locations : <span className='font-thin'> {companyData.companyLocations}</span></p>
            <p className='font-bold'>Bussiness Activity :  <span className='font-thin'>{companyData.bussinessActivity}</span></p>
            <p className='font-bold'>Clients :<span className='font-thin'>{companyData.clients}</span></p>
            <p className='font-bold'>Value of Service/ Product :  <span className='font-thin'>{companyData.serviceAndProduct}</span></p>
            <p className='font-bold'>Providers :  <span className='font-thin'> {companyData.providers}</span></p>
            <p className='font-bold'>Reporting Officer :  <span className='font-thin'> {companyData.reportingOfficer}</span></p>
            <p className='font-bold'>MSP : <span className='font-thin'>{companyData.msp}</span></p>
            </div>
            <div>
              <div>
              <h2 className='font-extrabold py-4'>RISK INFO</h2>
              </div>
              <div className='space-y-3'>
                <p className='font-bold'>Previos Attacks : <span className='font-extralight'>{companyData.previosAttacks}</span></p>
                <p className='font-bold'>Security Assets :  <span className='font-extralight'>{companyData.securityAssets}</span></p>
                <p className='font-bold'>Most Used platforms :  <span className='font-extralight'>{companyData.mostUsedPlatforms}</span></p>
              </div>
            </div>
            </div>
            </Box>

            <div className=' pt-6'>
              <ViewsTableEndPointsList  endPointsList={endPointsList} />
            </div>
              <div className='  pt-3'>
            <ViewTableExternalRequest externalRequest={externalRequest} requestData={requestData} />
              </div>
           
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <div>
            <h1 className='text-xl'>Reporting</h1>
          </div>
        </TabPanel>
        <TabPanel value="3">
        <div>
            <h1 className='text-xl'>MSP</h1>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <CompunyssTable /> }
    </>
  )
}

export default ViewPage
