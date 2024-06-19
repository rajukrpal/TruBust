


import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { topCompaniesTable } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";

const AnalyticTable = () => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticCompanyTable = await topCompaniesTable();
        setTable(analyticCompanyTable.data.data);
        setFilteredTable(analyticCompanyTable.data.data);
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
    <Box 
    sx={{
      width: "100%",
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.8)",
      borderRadius: "10px",
    }}
    className="">
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, padding: 3 }}>
          Top 5 Companies
        </Typography>
      </Box>
      
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="px-2"><hr/>
          <Table
            sx={{ minWidth: 310, border: "" }}
            aria-labelledby="tableTitle"
          >
            <TableRow className="">
              <TableCell
                className="relative uppercase"
                style={{ width: "25%", padding: "12px 14px",fontWeight:600 ,}}
                onClick={() => handleSort("name")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                Companies {getArrow("name")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "25%", padding: "12px 14px",fontWeight:600 }}
                onClick={() => handleSort("total_internal_requests")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                External/Internal  {getArrow("total_internal_requests")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "25%", padding: "12px 14px" ,fontWeight:600}}
                onClick={() => handleSort("total_users")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                Users {getArrow("total_users")}
              </TableCell>
              <TableCell
                className="uppercase"
                style={{ width: "25%", padding: "12px 14px" ,fontWeight:600}}
                onClick={() => handleSort("total_frauds_requests")}
              >
                Frauds {getArrow("total_frauds_requests")}
              </TableCell>
            </TableRow>

            <TableBody>
              {filteredTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">
                      {row.total_internal_requests}
                    </TableCell>
                    <TableCell align="left">{row.total_users}</TableCell>
                    <TableCell align="left">
                      {row.total_frauds_requests}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AnalyticTable;
