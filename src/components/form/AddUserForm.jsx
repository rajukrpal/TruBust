


import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getCopmonypageTable, usersAddForm } from "../../dataApi/Data";
import User from "../pages/User";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddUserForm = ({ rowData }) => {
  const [showForm, setShowForm] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  const [storeData, setStoreData] = useState("");
  const [userFormData, setUserFormData] = useState({
    companyId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    profile_picture: "",
  });

  useEffect(() => {
    if (rowData) {
      setUserFormData((prevData) => ({
        ...prevData,
        userID: rowData.id,
        companyId: rowData.company_id,
        name: rowData.name,
        email: rowData.email,
        phone: rowData.phone,
        department: rowData.department,
        designation: rowData.designation,
        profile_picture: rowData.profile_picture,
      }));
    }
  }, [rowData]);

  const [errors, setErrors] = useState({
    companyId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    profile_picture: "",
  });

  const handalCloseButton = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handalImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setUserFormData((prevData) => ({
        ...prevData,
        profile_picture: event.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handalPhoneChange = (value) => {
    setUserFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handalSubmitForm = async (e) => {
    e.preventDefault();

    const companyIdError =
      userFormData.companyId === "" ? "Company Name is required" : "";
    const nameError = userFormData.name === "" ? "Name is required" : "";
    const emailError = userFormData.email === "" ? "Email is required" : "";
    const phoneError =
      userFormData.phone === "" ? "Phone Number is required" : "";
    const departmentError =
      userFormData.department === "" ? "Department Name is required" : "";
    const designationError =
      userFormData.designation === "" ? "Designation Name is required" : "";
    const profile_pictureError =
      userFormData.profile_picture === "" ? "Profile Photo is required" : "";

    setErrors({
      companyId: companyIdError,
      name: nameError,
      email: emailError,
      phone: phoneError,
      department: departmentError,
      designation: designationError,
      profile_picture: profile_pictureError,
    });

    if (
      companyIdError ||
      nameError ||
      emailError ||
      phoneError ||
      departmentError ||
      designationError ||
      profile_pictureError
    ) {
      return;
    }

    try {
      const postUserFormApi = await usersAddForm(userFormData);
      setStoreData(postUserFormApi);

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const coumpnyDataFunction = async () => {
      const companyData = await getCopmonypageTable();
      setCompanyData(companyData.data.data);
    };
    coumpnyDataFunction();
  }, []);

  useEffect(() => {
    if (rowData && companyData.length > 0) {
      const selectedCompany = companyData.find(
        (company) => company.id === rowData.company_id
      );
      if (selectedCompany) {
        setUserFormData((prevData) => ({
          ...prevData,
          companyId: selectedCompany.id,
        }));
      }
    }
  }, [rowData, companyData]);

  return (
    <div>
      {showForm ? (
        <>
          <div className="border border-black p-5 rounded-lg">
            <div className="flex items-center px-4 justify-between p-4 pb-6">
              <div>
                <h1 className="py-5 font-semibold text-[20px]">
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

            <form onSubmit={handalSubmitForm} className="space-y-8">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="companyID"></InputLabel>
                    <NativeSelect
                      value={userFormData.companyId}
                      onChange={handleInputChange}
                      input={
                        <OutlinedInput name="companyId" id="companyID" />
                      }
                    >
                      <option aria-label="None" value="">
                        Select Company Name
                      </option>
                      {companyData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.companyId}
                  </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    value={userFormData.name}
                    onChange={handleInputChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.name}
                  </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.email}
                  </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <label className="" htmlFor="companyLogo">
                    User Profile
                  </label>
                  <input
                    name="profile_picture"
                    id="companyLogo"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="border border-gray-300 rounded-md w-full"
                    style={{ display: "block", marginBottom: "8px" }}
                    onChange={handalImageChange}
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.profile_picture}
                  </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PhoneInput
                    country={"in"}
                    inputProps={{
                      required: true,
                      autoFocus: true,
                    }}
                    value={userFormData.phone}
                    placeholder="Enter Your Phone No"
                    onKeyDown={(e) => {
                      if (e.keyCode === 8 && userFormData.phone.length <= 3) {
                        e.preventDefault();
                      }
                    }}
                    onChange={handalPhoneChange}
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.phone}
                  </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="department"
                    value={userFormData.department}
                    onChange={handleInputChange}
                    label="Department"
                    variant="outlined"
                    fullWidth
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.department}
                  </span>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="designation"
                    value={userFormData.designation}
                    onChange={handleInputChange}
                    label="Designation"
                    variant="outlined"
                    fullWidth
                  />
                  <span className="text-[12px] text-red-500 tracking-widest font-semibold">
                    {errors.designation}
                  </span>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Add user
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          <User />
        </>
      )}
    </div>
  );
};

export default AddUserForm;



































