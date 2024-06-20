


import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {GetExternalApi } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, useMediaQuery } from "@mui/material";
import ViewPage from "../form/ViewPage";
import { PiWechatLogo } from "react-icons/pi";
import ChatsForm from "../form/ChatsForm";
import ExternalChatRequest from "../form/ExternalChatRequest";


const ExternalRequestView = () => {
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
        const getExternalData = await GetExternalApi();

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
      return truncate(text, 1); 
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
                sx={{ minWidth: 610, border: "" }}
                aria-labelledby="tableTitle"
              >
                <TableRow className="">
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("Date")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    {isSmallScreen ? "d.." : "date" } {getArrow("Date")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("Company_name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    {isSmallScreen ? "c.." : "Company name" } {getArrow("Company_name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("user_name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "u.." : "user name" } {getArrow("user_name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("message")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "m.." : "message" } {getArrow("message")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("image")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "i.." : "image" } {getArrow("image")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("request_id")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "r.." : "request id" } {getArrow("request_id")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("stutas")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "s.." : "stutas" } {getArrow("stutas")}
                  </TableCell>
                
                  <TableCell
                    className="uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("action")}
                  >
                    {isSmallScreen ? "a.." : "action" }  {getArrow("action")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: isSmallScreen ? '50px' : '100px',
                      padding: isSmallScreen ? "1px 1px" : "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("replay")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    {isSmallScreen ? "r.." : "replay" } {getArrow("replay")}
                  </TableCell>
                </TableRow>

                <TableBody>
                  {filteredTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" padding="none">
                          <div className="flex items-center">
                          {truncateText(new Date(row.created_at).toLocaleDateString())}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div>{truncateText(row.company_name)}</div></TableCell>
                        <TableCell align="left">{truncateText(row.username)}</TableCell>
                        <TableCell align="left">{truncateText(row.message)}</TableCell>
                        <TableCell align="left"><img className={`${isSmallScreen ? "w-20" : "w-20"} rounded-md`} src={row.image} alt="" /></TableCell>
                        <TableCell align="left">{truncateText(row.requestID)}</TableCell>
                        <TableCell sx={{fontWeight:600,letterSpacing:"1px"}} align="left">
                        {row.status === 0 && <span>{<button className="rounded-lg p-2 border text-[#ACB92D] border-yellow-400 ">{truncateText("Penting")}</button>}</span>}
                        {row.status === 1 && <span>{<button className="rounded-lg p-2 border text-[#6CDC3C] border-green-400">{truncateText("Approve")}</button>}</span>}
                        {row.status === 2 && <span>{<button className="rounded-lg p-2 border text-[#EE381B]  border-red-500">{truncateText("Decline")}</button>}</span>}
                        </TableCell>
                        <TableCell sx={{fontWeight:600 , color:"white", letterSpacing:"1px"}} align="left">
                        {row.status === 0 && <span>{
                          <div className="flex gap-3">
                            <button className="rounded-lg p-2 bg-green-400 " >{truncateText("Approve")}</button> 
                            <button className="rounded-lg p-2 bg-red-500 " >{truncateText("Decline")}</button>
                            </div>}</span>}
                        {row.status === 1 && <span>{null}</span>}
                        {row.status === 2 && <span>{null}</span>}
                      </TableCell>
                        <TableCell align="left">
                          <div className="flex gap-5 w-full">
                            <div className="w-[10%]" 
                            onClick={()=>handalAddForm(row)}
                            >
                            <Button sx={{padding:0}}>
                              <PiWechatLogo className="text-2xl"  />
                            </Button>
                            </div>
                          </div>
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

export default ExternalRequestView;

