import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { approveAndDecline } from "../../../dataApi/Data";

const ViewTableExternalRequest = ({ requestData }) => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
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

  const ApproveOrDecline = async () => {
    const ApprovData = await approveAndDecline();
  };

  const ApproveClick = (rowId, status) => {};

  const DeclinceClick = (rowId, status) => {};

  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, padding: 3 }}>
          External Request
        </Typography>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="px-2 custom-scrollbar">
          <hr />
          <Table
            sx={{ minWidth: 1050, border: "" }}
            aria-labelledby="tableTitle"
          >
            <TableRow className="">
              <TableCell
                className="relative uppercase"
                style={{
                  width: "100px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("date")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                date {getArrow("date")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "150px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("company_name")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                company name {getArrow("company_name")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "120px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("user_name")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                user Name {getArrow("user_name")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "120px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("message")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                message {getArrow("message")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "100px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("image")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                image {getArrow("image")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "120px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("request_id")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                request id {getArrow("request_id")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{
                  width: "100px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("status")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                status {getArrow("status")}
              </TableCell>
              <TableCell
                className="uppercase"
                style={{
                  width: "100px",
                  padding: "12px 14px",
                  fontWeight: 600,
                }}
                onClick={() => handleSort("actions")}
              >
                actions{getArrow("actions")}
              </TableCell>
            </TableRow>

            {requestData.length === 0 ? (
              <TableBody style={{ height: 300 }}>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    style={{ height: "300px", verticalAlign: "middle" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {requestData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" padding="none">
                        {/* {new Date(row.created_at).toLocaleString()} */}
                        {new Date(row.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">{row.company_name}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.message}</TableCell>
                      <TableCell align="left">
                        {" "}
                        <img src={row.image} alt="image" />
                      </TableCell>
                      <TableCell align="left">{row.requestID}</TableCell>
                      <TableCell align="left">
                        {row.status === 0 && (
                          <span>
                            {
                              <button className="rounded-lg p-2 bg-yellow-400 ">
                                penting
                              </button>
                            }
                          </span>
                        )}
                        {row.status === 1 && (
                          <span>
                            {
                              <button className="rounded-lg p-2 bg-green-400">
                                Approve
                              </button>
                            }
                          </span>
                        )}
                        {row.status === 2 && (
                          <span>
                            {
                              <button className="rounded-lg p-2  bg-red-500">
                                decline
                              </button>
                            }
                          </span>
                        )}
                      </TableCell>

                      <TableCell align="left">
                        {row.status === 0 && (
                          <span>
                            {
                              <div className="flex gap-3">
                                <button
                                  className="rounded-lg p-2 bg-green-400 "
                                  onClick={() => ApproveClick(row.id, 1)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="rounded-lg p-2 bg-red-500 "
                                  onClick={() => DeclinceClick(row.id, 2)}
                                >
                                  declince
                                </button>
                              </div>
                            }
                          </span>
                        )}
                        {row.status === 1 && <span>{null}</span>}
                        {row.status === 2 && <span>{null}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
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

export default ViewTableExternalRequest;
