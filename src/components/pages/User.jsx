import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GenerateOtpApi, GetUserApi, deleteUserFunction } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ViewPage from "../form/ViewPage";
import AddUserForm from "../form/AddUserForm";

const User = () => {
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
        const userCompanyTable = await GetUserApi();

        setTable(userCompanyTable.data.data);
        setFilteredTable(userCompanyTable.data.data);
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

  // form
  const handalAddForm = () => {
    setShowForm(true);
  };

  const handleEdit = (row) => {
    setRowData(row);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserFunction(id);

      setTable((prevTable) => prevTable.filter((item) => item.id !== id));

      // Remove the deleted item from filteredTable state
      setFilteredTable((prevFilteredTable) =>
        prevFilteredTable.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const genretVerificationCode = async(id) => {  
    try {
      const responsVerification = await GenerateOtpApi(id);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {viewForm ? (
        <ViewPage companyData={companyData} />
      ) : showForm ? (
        <AddUserForm rowData={rowData} />
      ) : (
        <Box
          sx={{
            width: "100%",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
          }}
          className=""
        >
          <Box className="">
            <div className="flex justify-end p-6">
              <Button variant="contained" onClick={handalAddForm}>
                <AddIcon sx={{ fontSize: "20px" }} />
                &nbsp; Add user
              </Button>
            </div>
          </Box>
          <Paper sx={{ width: "100%", mb: 2, borderRadius: "10px" }}  >
            <TableContainer className="px-2 raju" >
              <hr />
              <Table
                sx={{ minWidth: 240, border: "" }}
                aria-labelledby="tableTitle"
              >
                <TableRow className="">
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: "130px",
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("Company_name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    Company name {getArrow("Company_name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: "120px",
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("name")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                    name {getArrow("name")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: "150px",
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("email")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    email {getArrow("email")}
                  </TableCell>
                  <TableCell
                    className="relative uppercase"
                    style={{
                      width: "150px",
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("phone")}
                  >
                    <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                    phone {getArrow("phone")}
                  </TableCell>
                  <TableCell
                    className="uppercase"
                    style={{
                      width: "130px",
                      padding: "12px 14px",
                      fontWeight: 600,
                    }}
                    onClick={() => handleSort("action")}
                  >
                    action {getArrow("action")}
                  </TableCell>
                </TableRow>

                <TableBody>
                  {filteredTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" padding="none">
                          <div className="flex gap-5 items-center">
                            {row.company_name}
                          </div>
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">
                          <div className="flex gap-5 w-full">
                            <div className="w-[10%]" onClick={()=>handleEdit(row)}>
                            <Button sx={{ padding: 0 }}>
                              <EditIcon  />
                            </Button>
                            </div>
                            <div onClick={()=>handleDelete(row.id)} className="w-[10%]">
                            <Button sx={{ padding: 0 }} color="error">
                              <DeleteForeverIcon />
                            </Button>
                            </div>
                            <div onClick={()=>genretVerificationCode(row.id)} className="w-[100%]">
                            <Button variant="outlined"
                              sx={{ padding: 0 }}
                              size="small"
                              color="success"
                            >
                              Genret verification code
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

export default User;
