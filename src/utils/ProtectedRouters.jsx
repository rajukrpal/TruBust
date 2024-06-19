

import React, { useEffect } from 'react';
import {useNavigate } from "react-router-dom";



const ProtectedRouters = (props) => {
   const {Component} = props;
   const navigate = useNavigate();

    useEffect(()=>{
        let authToken = localStorage.getItem('authToken') // authToken me authToken key mil rha hai
        if(!authToken){
            navigate('/')
        }
    },[navigate])
  return (
    <>
    <Component />
    </>
  )
}

export default ProtectedRouters;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRouters = (props) => {
//   const { Component } = props;
//   const navigate = useNavigate();
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         let authToken = localStorage.getItem('authToken');
//         if (!authToken) {
//           navigate('/');
//         }
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//         navigate('/');
//       } finally {
//         setAuthChecked(true);
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   if (!authChecked) {
//     return null; // Or render a loading indicator if needed
//   }

//   return <Component />;
// };

// export default ProtectedRouters;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AnalyticsFeatchData } from '../dataApi/Data';

// const ProtectedRouters = ({ Component }) => {
//   const navigate = useNavigate();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [data, setData] = useState(null); // Initialize with null or appropriate initial value


//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//       setAuthenticated(true);
//     } else {
//       navigate('/');
//     }
//   }, [navigate]);




//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await AnalyticsFeatchData();
//         setData(result); // Ensure result is defined before accessing
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();

//   }, []);
  
// console.log("data",data)
//   return   authenticated ? <Component /> : null;
// };

// export default ProtectedRouters;





