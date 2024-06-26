

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetInternalRequest } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ViewPage from "../form/ViewPage";
import ExternalChatRequest from "../form/ExternalChatRequest";
import { useMediaQuery } from "@mui/material";


const InternalRequestView = () => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);

  const [rowData, setRowData] = useState(null);
  const [companyData, setCompanyData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const getExternalData = await GetInternalRequest();

        setTable(getExternalData.data.data);
        setFilteredTable(getExternalData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    const sortedData = [...filteredTable].sort((a, b) => {
      if (isAsc) {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setFilteredTable(sortedData);
  };

  const filterTable = (keyword) => {
    const filteredData = table.filter((row) =>
      row.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredTable(filteredData);
  };

  const getArrow = (column) => {
    if (orderBy === column) {
      return order === "asc" ? (
        <ArrowUpwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      ) : (
        <ArrowDownwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      );
    }
    return "";
  };


  const handalAddForm = (row) => {
    setRowData(row)
    setShowForm(true);
  };

  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const truncate = (text, maxLength) => {
    if (!text) {
      return <span className="text-[#EF3E36]"> No Name</span>; // Return "No Name" if text is falsy (null, undefined, empty string)
    }
    
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    
    return text;
  };
  
  
  const truncateText = (text, maxLength) => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return truncate(text, 10); 
    } else if(screenWidth < 1024) {
      return truncate(text, 10); 
    } else{
      return truncate(text, 25);
    }
  };



  return (
    <>
      {viewForm ? (
        <ViewPage /> // bekar hai es ka es me koi use nahi hai
      ) : showForm ? (
        <ExternalChatRequest rowData={rowData} />
      ) : (
        <Box
          sx={{
            width: "100%",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
          className=""
        >
          <Box className="">
            <div className="flex justify-end p-6">
              
            </div>
          </Box>
          <Paper sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
            <TableContainer className="px-2">
              <hr />
              <Table
                sx={{ minWidth: 510, border: "" }}
                aria-labelledby="tableTitle"
              >
                <TableRow className="">
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '70px' : '60px',
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("Date")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    Date {getArrow("Date")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '70px' : '100px',
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("Company_name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    {isSmallScreen ? "Company..." : "Company Name"} {getArrow("Company_name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '70px' : '80px',
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("user_name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "sender..." : "sender name"}{getArrow("user_name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '70px' : '80px',
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("message")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "recever..." : "recever name"} {getArrow("message")}
                  </TableCell>
              
                  
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '100px' : '150px',
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("stutas")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    stutas {getArrow("stutas")}
                  </TableCell>
                </TableRow>

                <TableBody>
                  {filteredTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" padding="none">
                          <div className="flex items-center">
                          {new Date(row.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell align="left">{truncateText(row.company_name)}</TableCell>
                        <TableCell align="left">{truncateText(row.sendername)}</TableCell>
                        <TableCell align="left">{truncateText(row.receivername)}</TableCell>
                        <TableCell sx={{fontWeight: isSmallScreen ? 500 : 600,letterSpacing:"1px"}} align="left">
                        {row.status === 0 && <span>{<button  className={`rounded-lg ${isSmallScreen ? "p-1" : "p-2"} bg-yellow-400` }>Penting</button>}</span>}
                        {row.status === 1 && <span>{<button  className={`rounded-lg ${ isSmallScreen ? "p-1" : "p-2" } bg-green-400`}>Approve</button>}</span>}
                        {row.status === 2 && <span>{<button className={`rounded-lg ${isSmallScreen ? "p-1" : "p-2"}  bg-red-500`}>Decline</button>}</span>}
                        </TableCell>
                       
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[8, 15, 20]}
              component="div"
              count={filteredTable.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
};

export default InternalRequestView;

