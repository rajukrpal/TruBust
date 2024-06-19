import React, { useEffect, useState } from "react";
import CompunyssTable from "../tables/CompunyssTable";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { companyPageTable } from "../../dataApi/Data";
// import axios from "axios";

const AddForm = ({ rowData }) => {
  const [showForm, setShowForm] = useState(true);
  const [storeData, setStoreData] = useState("");

  const [formData, setFormData] = useState({
    companyID: 0,
    name: "",
    email: "",
    companyLocations: "",
    companyLogo: "",
    totalEmployers: "",
    bussinessActivity: "",
    serviceAndProduct: "",
    clients: "",
    providers: "",
    reportingOfficer: "",
    msp: "",
    previosAttacks: "",
    securityAssets: "",
    mostUsedPlatforms: "",
    ...rowData,
  });



    useEffect(() => {
    if (rowData) {
      setFormData((prevData) => ({
        ...prevData,
        companyID: rowData.id , 
        name: rowData.name,
        email: rowData.email,
        companyLocations: rowData.companyLocations,
        companyLogo: rowData.companyLogo,
        totalEmployers: rowData.totalEmployers,
        bussinessActivity: rowData.bussinessActivity,
        serviceAndProduct: rowData.serviceAndProduct,
        clients: rowData.clients,
        providers: rowData.providers,
        reportingOfficer: rowData.reportingOfficer,
        msp: rowData.msp,
        previosAttacks: rowData.previosAttacks,
        securityAssets: rowData.securityAssets,
        mostUsedPlatforms: rowData.mostUsedPlatforms,
      }));
    }
  }, [rowData]);

  // State variables for validation
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    companyLocations: "",
    companyLogo: "",
    totalEmployers: "",
    bussinessActivity: "",
    serviceAndProduct: "",
    clients: "",
    providers: "",
    reportingOfficer: "",
    msp: "",
    previosAttacks: "",
    securityAssets: "",
    mostUsedPlatforms: "",
  });

  const countries = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UN", label: "UN" },
    { value: "India,USA", label: "India,USA" },
  ];

  const handalCloseButton = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  



  const handalImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        companyLogo: event.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handalSubmitForm = async (e) => {
    e.preventDefault();

    const nameError = formData.name === "" ? "Name is required" : "";
    const emailError = formData.email === "" ? "Email is required" : "";
    const companyLocationsError =
      formData.companyLocations === "" ? "Company Locations is required" : "";
    const companyLogoError =
      formData.companyLogo === "" ? "CompanyLogo is required" : "";
    const totalEmployersError =
      formData.totalEmployers === "" ? "Total Employers is required" : "";
    const bussinessActivityError =
      formData.bussinessActivity === "" ? "Business Activity is required" : "";
    const clientsError = formData.clients === "" ? "Clients is required" : "";
    const serviceAndProductError =
      formData.serviceAndProduct === ""
        ? "Value of Service/Product is required"
        : "";
    const providersError =
      formData.providers === "" ? "Providers is required" : "";
    const reportingOfficerError =
      formData.reportingOfficer === "" ? "Reporting Officer is required" : "";
    const mspError = formData.msp === "" ? "MSP is required" : "";
    const previousAttacksError =
      formData.previosAttacks === "" ? "Previous Attacks is required" : "";
    const securityAssetsError =
      formData.securityAssets === "" ? "Security Assets is required" : "";
    const mostUsedPlatformsError =
      formData.mostUsedPlatforms === ""
        ? "Most Used Platforms is required"
        : "";

    setErrors({
      name: nameError,
      email: emailError,
      companyLocations: companyLocationsError,
      companyLogo: companyLogoError,
      totalEmployers: totalEmployersError,
      bussinessActivity: bussinessActivityError,
      clients: clientsError,
      serviceAndProduct: serviceAndProductError,
      providers: providersError,
      reportingOfficer: reportingOfficerError,
      msp: mspError,
      previosAttacks: previousAttacksError,
      securityAssets: securityAssetsError,
      mostUsedPlatforms: mostUsedPlatformsError,
    });

    if (
      nameError ||
      emailError ||
      companyLocationsError ||
      companyLogoError ||
      totalEmployersError ||
      bussinessActivityError ||
      clientsError ||
      serviceAndProductError ||
      providersError ||
      reportingOfficerError ||
      mspError ||
      previousAttacksError ||
      securityAssetsError ||
      mostUsedPlatformsError
    ) {
      return;
    }
    try {
      const postApiData = await companyPageTable(formData, );
      
      setStoreData(postApiData);
      setShowForm(false)
      
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      {showForm ? (
        <>
          <div className="border border-black p-5 rounded-lg">
            <div className="flex items-center px-4 justify-between p-4 pb-6">
              <div>
                <h1 className="py-5 font-semibold md:text-[20px] ">
                  Add Company Name
                </h1>
              </div>
              <div>
                <Button
                  onClick={handalCloseButton}
                  sx={{
                    background: "gray",
                    borderRadius: "50%",
                    height: "30px",
                    width: "30px",
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <CloseIcon sx={{ fontSize: "20px", color: "black" }} />
                </Button>
              </div>
            </div>
            <form onSubmit={ handalSubmitForm } className="space-y-8">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={ handleInputChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={errors.name}
                    helperText={errors.name ? "Name is required" : ""}
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.name}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.email}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="companyLocations"
                    value={formData.companyLocations}
                    onChange={handleInputChange}
                    select
                    label="Country"
                    variant="outlined"
                    fullWidth
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.companyLocations}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className="" htmlFor="companyLogo">
                    Company Logo
                  </label>
                  <input
                    name="companyLogo"
                    id="companyLogo"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="border border-gray-300 rounded-md w-full"
                    style={{ display: "block", marginBottom: "8px" }}
                    // value={ rowData ? rowData.companyLogo : formData.companyLogo}
                    onChange={handalImageChange}
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.companyLogo}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="totalEmployers"
                    value={formData.totalEmployers}
                    onChange={handleInputChange}
                    label="Total Employers"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.totalEmployers}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="bussinessActivity"
                    value={ formData.bussinessActivity}
                    onChange={handleInputChange}
                    label="Business Activity"
                    variant="outlined"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.bussinessActivity}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="clients"
                    value={ formData.clients}
                    onChange={handleInputChange}
                    label="Clients"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.clients}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="serviceAndProduct"
                    value={formData.serviceAndProduct}
                    onChange={handleInputChange}
                    label="Value of Service/ Product"
                    variant="outlined"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.serviceAndProduct}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="providers"
                    value={formData.providers}
                    onChange={handleInputChange}
                    label="Providers"
                    variant="outlined"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.providers}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="reporting-officer-label">
                      Reporting Officer
                    </InputLabel>
                    <Select
                      name="reportingOfficer"
                      labelId="reporting-officer-label"
                      value={formData.reportingOfficer}
                      onChange={handleInputChange}
                      label="Reporting Officer"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.reportingOfficer}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="">MSP</InputLabel>
                    <Select
                      name="msp"
                      labelId="msp"
                      value={formData.msp}
                      onChange={handleInputChange}
                      label="MSP"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                    <span
                      id="nameError"
                      className="text-[12px] text-red-500 tracking-widest font-semibold"
                    >
                      {errors.msp}
                    </span>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="">Previous Attacks</InputLabel>
                    <Select
                      name="previosAttacks"
                      labelId="Previous Attacks"
                      value={formData.previosAttacks}
                      onChange={handleInputChange}
                      label="Previous Attacks"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                    <span
                      id="nameError"
                      className="text-[12px] text-red-500 tracking-widest font-semibold"
                    >
                      {errors.previosAttacks}
                    </span>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="securityAssets"
                    value={formData.securityAssets}
                    onChange={handleInputChange}
                    label="Security Assets"
                    variant="outlined"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.securityAssets}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="mostUsedPlatforms"
                    value={formData.mostUsedPlatforms}
                    onChange={handleInputChange}
                    label="Most Used Platforms"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                  <span
                    id="nameError"
                    className="text-[12px] text-red-500 tracking-widest font-semibold"
                  >
                    {errors.mostUsedPlatforms}
                  </span>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          <CompunyssTable  />
        </>
      )}
    </div>
  );
};

export default AddForm;



