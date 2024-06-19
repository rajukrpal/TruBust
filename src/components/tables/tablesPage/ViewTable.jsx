



import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { topCompaniesTable } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";

const ViewTable = () => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([
    {
    id:"#5034",
    date:"24/06/2000",
    status:"Approved"},
    {
    id:"#5034",
    date:"05/04/1998",
    status:"Approved"
    },
    {
    id:"#5034",
    date:"09/05/2037",
    status:"Approved"
    }
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");


 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const analyticCompanyTable = await topCompaniesTable();
        // setTable(analyticCompanyTable.data.data);
        // setFilteredTable(analyticCompanyTable.data.data);
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
        <ArrowUpwardIcon sx={{fontSize:18}} className="text-[#69676786]" />
      ) : (
        <ArrowDownwardIcon sx={{fontSize:18}} className="text-[#69676786]" />
      );
    }
    return "";
  };

  return (
    <Box sx={{ width: "100%" }}>
     
      
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="px-2"><hr/>
          <Table
            sx={{ minWidth: 250, border: "" ,padding:""}}
            aria-labelledby="tableTitle"
          >
            <TableRow className="">
              <TableCell
                className="relative uppercase"
                style={{ width: "5px", padding: "12px 14px",fontWeight:600 ,}}
                onClick={() => handleSort("id")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                #ID {getArrow("id")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "5px", padding: "12px 14px",fontWeight:600 }}
                onClick={() => handleSort("Date")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                Date {getArrow("Date")}
              </TableCell>
              <TableCell
                className=""
                style={{ width: "5px", padding: "12px 14px" ,fontWeight:600}}
                onClick={() => handleSort("status")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                status {getArrow("status")}
              </TableCell>
              
            </TableRow>

            <TableBody className="">
              {filteredTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow  key={row.id}>
                    <TableCell sx={{fontWeight:700,color:"#685dd8", paddingLeft:2}} component="th" scope="row" padding="none">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      {row.date}
                    </TableCell>
                    <TableCell align="left">
                      <div className=" text-center rounded-3xl font-semibold text-green-400 bg-green-100 cursor-pointer">

                      {row.status}
                      </div>
                      </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
     
      </Paper>
    </Box>
  );
};

export default ViewTable;
