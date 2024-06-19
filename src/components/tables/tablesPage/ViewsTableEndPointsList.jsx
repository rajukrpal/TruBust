import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";

const ViewsTableEndPointsList = ({ endPointsList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

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
  };

  const getArrow = (column) => {
    if (orderBy === column) {
      return order === "asc" ? (
        <ArrowUpwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      ) : (
        <ArrowDownwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      );
    }
    return null;
  };

  return (
    <Box sx={{
      width: "100%",
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.8)",
      borderRadius: "10px",
      padding:""
       }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, padding: 3 }}>
          End-Points List
        </Typography>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="px-2">
          <hr />
          <Table
            sx={{ minWidth: 750, border: "" }}
            aria-labelledby="tableTitle"
          >
            <TableRow className="">
              <TableCell
                className="relative uppercase"
                style={{ width: "100px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("userName")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                userName {getArrow("userName")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "120px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("Total_Request")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                Total Request {getArrow("Total_Request")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "150px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("External_Request")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                External Request {getArrow("External_Request")}
              </TableCell>
              <TableCell
                className="uppercase"
                style={{ width: "120px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("Fraud_Reports")}
              >
                Fraud Reports {getArrow("Fraud_Reports")}
              </TableCell>
            </TableRow>
            <TableBody>
              {Array.isArray(endPointsList) && endPointsList.length > 0 ? (
                endPointsList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row" padding="none">
                        {item.name}
                      </TableCell>
                      <TableCell align="left">{item.totalRequest}</TableCell>
                      <TableCell align="left">
                        {item.percentageExternalRequest ||
                        item.percentageExternalRequestl ? (
                          <>
                            {(isNaN(item.percentageExternalRequest)
                              ? 0
                              : item.percentageExternalRequest) ||
                              (isNaN(item.percentageExternalRequestl)
                                ? 0
                                : item.percentageExternalRequestl)}
                            <span>%</span>
                            <div
                              className={`relative w-full h-2 rounded-md bg-gray-300`}
                            >
                              <div
                                className={`absolute top-0 left-0 h-full rounded-md ${
                                  item.percentageExternalRequest >= 80
                                    ? "bg-[#6f00ff]"
                                    : item.percentageExternalRequest >= 50
                                    ? "bg-yellow-200"
                                    : item.percentageExternalRequest >= 30
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${item.percentageExternalRequest}%`,
                                }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <>
                            0<span>%</span>
                            <div className="w-full h-2 bg-gray-300 rounded-md"></div>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="left">{item.fraudReports}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow style={{ height: 400 }}>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={endPointsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ViewsTableEndPointsList;
