


import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteDataFunction, getCopmonypageTable, singleCompany } from "../../dataApi/Data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddForm from "../form/AddForm";
import ViewPage from "../form/ViewPage";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const CompunyssTable = () => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [viewForm,setViewForm] = useState(false)

  const [rowData, setRowData] = useState(null);
  const [companyData,setCompanyData] = useState("");


  const notifyDelete = () => toast.success("Company Deleted SuccessFully");

  useEffect(() => {
    const handleResize = () => {
      setFilteredTable([...filteredTable]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filteredTable]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticCompanyTable = await getCopmonypageTable();
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
        <ArrowUpwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      ) : (
        <ArrowDownwardIcon sx={{ fontSize: 18 }} className="text-[#69676786]" />
      );
    }
    return "";
  };

  // form
  const handalAddForm = () =>{
    setShowForm(true); 
  }

  const handleView = async(row) =>{

    console.log(row.id)
    const companyID = row.id
         const singalPageData = await singleCompany(companyID)
         setCompanyData(singalPageData.data.data);
    setViewForm(true);

  }

const handleEdit = (row)=>{
  // console.log("singlerowdata",row);
setRowData(row);
setShowForm(true);
}

const handleDelete = async (id) => {
  try {
    await deleteDataFunction(id);
    notifyDelete()
    
    setTable((prevTable) => prevTable.filter((item) => item.id !== id));
    
    // Remove the deleted item from filteredTable state
    setFilteredTable((prevFilteredTable) => prevFilteredTable.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

// const truncate = (string,num)=>{
//   return string?.length > num ? string.substr(0,num-1) + '...' : string ;
// }

const truncate = (text, maxLength) => {
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

const isSmallScreen = useMediaQuery('(max-width:768px)');


  return (
  <>
  {viewForm ? (
    <ViewPage companyData={companyData}  />
  ):(
    showForm ? (
      <AddForm rowData={rowData} />
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
          <Button  size={isSmallScreen ? "small" : "medium"} variant="contained" onClick={handalAddForm}>
            <AddIcon sx={{ fontSize: "20px" }} />
            &nbsp; Add Company
          </Button>
        </div>
      </Box>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
        <TableContainer className="px-2">
          <hr />
          <Table
            sx={{ minWidth: 810, border: "" }}
            aria-labelledby="tableTitle"
          >
            <TableRow className="">
              <TableCell
                className="relative uppercase"
                style={{ width: isSmallScreen ? '200px' : '200px', padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("name")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                Company name {getArrow("name")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "180px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("total_internal_requests")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-[''] "></div>
                email {getArrow("total_internal_requests")}
              </TableCell>
              <TableCell
                className="relative uppercase"
                style={{ width: "150px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("total_users")}
              >
                <div className="absolute h-6 w-[1px] bg-gray-300 right-0 containt-['']  "></div>
                country {getArrow("total_users")}
              </TableCell>
              <TableCell
                className="uppercase"
                style={{ width: "100px", padding: "12px 14px", fontWeight: 600 }}
                onClick={() => handleSort("total_frauds_requests")}
              >
                action {getArrow("total_frauds_requests")}
              </TableCell>
            </TableRow>

            <TableBody>
              {filteredTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  
                  <TableRow key={row.id}>
                    <TableCell  component="th" scope="row" padding="none">
                        <div className="flex gap-5 items-center">
                        <img className="h-8 w-8 rounded-full" src={row.companyLogo} alt="" />
                       <span>{truncateText(row.name)}</span>
                        </div>
                    </TableCell>
                    <TableCell align="left">
                    <span>{truncateText(row.email)}</span>
                    </TableCell>
                    <TableCell align="left">{row.country}</TableCell>
                    <TableCell align="left">
                      <div className=" flex gap-2 ">
                        <div onClick={()=>handleEdit(row)}>
                          <Button>
                            <EditIcon  />
                          </Button>
                        </div>
                        <div onClick={()=> handleView(row)}>
                          <Button color="success">
                          <VisibilityIcon />
                          </Button>
                        </div>
                        <div onClick={()=>handleDelete(row.id)} >
                          <Button color="error" >
                            <DeleteForeverIcon />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <ToastContainer position="bottom-right" />
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
    )
  ) }

    </>
  );
};

export default CompunyssTable;


