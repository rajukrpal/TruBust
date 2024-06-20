import React, { useEffect, useState } from 'react'
import { getCopmonypageTable } from '../../dataApi/Data';
import CompunyssTable from '../tables/CompunyssTable';


const Company = () => {
  const [tabledata,setTabledata] = useState({
    email:'',
    coumpanyName:'',
    Country:'',
    image:'',
    totalEmployers:'',
    businessActivity:'',
    clients:'',
    product:'',
    provider:'',
    reporting:'',
    msp:'',
    previousAttacks:'',
    securityAssets:'',
    mostUsedPlatforms:'',
  });
  const [coumpanyTable,setCoumpanyTable] = useState([]);


  useEffect(()=>{
    const fetchData = async() =>{
      try {
      const AllCompanys = await getCopmonypageTable();
      setCoumpanyTable(AllCompanys.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{

  },[tabledata])
  return (
    <div className='lg:px-2'>
      <CompunyssTable className="" />
    </div>
  )
}

export default Company