/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Card, FormControl, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CopyAllOutlined, Label } from '@mui/icons-material';
import Palette from '../../theme/palette';
import { allusers, apiget, apiput, getsingleuser } from '../../service/api';

// eslint-disable-next-line arrow-body-style, react/prop-types
const General = () => {
  const [alluser, setAllUser] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();

  // -----------   initialValues
  const initialValues = {
    avatar: userDetails?.avatar,
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    email: userDetails?.email,
    phoneNumber: userDetails?.phoneNumber,
    address: userDetails?.address,
    country: userDetails?.country,
    state: userDetails?.state,
    city: userDetails?.city,
    zipCode: userDetails?.zipCode,
    role: userDetails?.role,
    about: userDetails?.about,
    parentId: ""
  };
  console.log(userDetails?.role, "userDetails?.role")
  const formik = useFormik({
    initialValues,
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      EditUser(values);
      // fetchdata();

    },
  });

  // edit api
  const EditUser = async (values) => {
    const data = new FormData()
    data.append("_id", id)
    data.append("avatar", values?.avatar)
    data.append("firstName", values?.firstName)
    data.append("lastName", values?.lastName)
    data.append("email", values?.email)
    data.append("phoneNumber", values?.phoneNumber)
    data.append("address", values?.address)
    data.append("country", values?.country)
    data.append("state", values?.state)
    data.append("city", values?.city)
    data.append("zipCode", values?.zipCode)
    data.append("role", values?.role === "Hr" || values?.role === "Admin"
      ? "National Manager"
      : values?.role === "National Manager"
        ? "Branch Manager"
        : values?.role === "Branch Manager"
          ? "Zonal Manager"
          : values?.role === "Zonal Manager"
            ? "Regional Manager"
            : values?.role === "Regional Manager"
              ? "Territory Manager"
              : "",)
    data.append("parentId", values?.parentId)
    data.append("about", values?.about)

    const result = await apiput(`/api/users`, data);
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      // Read the selected file and set it in state.
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);

      // Update the formik field value with the selected file.
    }
    formik.setFieldValue('avatar', file);
  };

  const clear = () => {
    setSelectedFile('')
  }

  // fetch api
  const fetchUserData = async () => {
    const result = await getsingleuser(`/api/users`, id)
    if (result && result.status === 200) {
      setUserDetails(result.data)
    }
  }


  async function fetchdata() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      setAllUser(result?.data);
    }
  }
  console.log(userDetails?.firstName)
  const admin = alluser?.filter(user => user?.role === "Admin");
  const hr = alluser?.filter(user => user?.role === "Hr");
  const nationalManager = alluser?.filter(user => user?.role === "National Manager");
  const branchManager = alluser?.filter(user => user?.role === "Branch Manager");
  const zonalManager = alluser?.filter(user => user?.role === "Zonal Manager");
  const regionalManager = alluser?.filter(user => user?.role === "Regional Manager");
  const territoryManager = alluser?.filter(user => user?.role === "Territory Manager");


  useEffect(() => {
    fetchdata();
    if (id) {
      fetchUserData()
    }
  }, [id]);

  return (
    <div style={{ marginTop: "20px" }}>
      <form>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
          <Grid item xs={12} sm={4} md={4}>
            <Card style={{ padding: "182px 0px 181px 0px" }}>
              <Box style={{ textAlign: 'center' }}>
                {selectedFile ?
                  <Avatar alt="Avatar" src={selectedFile} sx={{ width: 100, height: 100, margin: '16px auto', borderRadius: "50%" }} />
                  :
                  <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} style={{ width: 100, height: 100, margin: '16px auto', borderRadius: "50%" }} />
                }
                <Typography variant="h6">Upload Avatar</Typography>
                <input
                  accept="image/*"
                  type="file"
                  id="avatar-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="avatar-upload">
                  <Button component="span" variant="outlined" color="primary" style={{ marginTop: "20px" }}>
                    Upload
                  </Button>
                </label>
                <Button component="span" variant="outlined" color="error" style={{ marginTop: "20px", marginLeft: "10px" }} onClick={clear}>
                  Clear
                </Button>
                <div style={{ marginTop: "25px" }}>
                  EmployeId : {userDetails?.employeId} <CopyAllOutlined />
                </div>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card style={{ padding: "20px" }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>First Name</FormLabel>
                  <TextField
                    id="firstName"
                    name="firstName"
                    size='small'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Last Name</FormLabel>
                  <TextField
                    id="lastName"
                    name="lastName"
                    size='small'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    size='small'
                    disabled
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    size='small'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    size='small'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Country</FormLabel>
                  <TextField
                    id="country"
                    name="country"
                    size='small'
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>State</FormLabel>
                  <TextField
                    id="state"
                    name="state"
                    size='small'
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>City</FormLabel>
                  <TextField
                    id="city"
                    name="city"
                    size='small'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Zip Code</FormLabel>
                  <TextField
                    id="zipCode"
                    name="zipCode"
                    size='small'
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    fullWidth
                  // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Role</FormLabel>
                    <Select
                      name="role"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.role || null}
                      size='small'
                      fullWidth
                      onChange={formik.handleChange}
                      error={
                        formik.touched.role &&
                        Boolean(formik.errors.role)
                      }
                      helperText={
                        formik.touched.role && formik.errors.role
                      }
                    >
                      <MenuItem value="Hr">Hr</MenuItem>
                      <MenuItem value="Admin">Admin </MenuItem>
                      <MenuItem value="National Manager">National Manager </MenuItem>
                      <MenuItem value="Branch Manager">Branch Manager </MenuItem>
                      <MenuItem value="Zonal Manager">Zonal Manager </MenuItem>
                      <MenuItem value="Regional Manager">Regional Manager </MenuItem>
                      <MenuItem value="Territory Manager">Territory Manager</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.role && formik.errors.role}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Manager</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="parentId"
                      size='small'
                      fullWidth
                      value={formik.values.parentId}
                      onChange={formik.handleChange}
                      style={{ textTransform: "capitalize" }}
                      error={
                        formik.touched.parentId &&
                        Boolean(formik.errors.parentId)
                      }
                      helperText={
                        formik.touched.parentId && formik.errors.parentId
                      }
                    >
                      {
                        formik?.values?.role === "Hr" ?
                          hr?.map((item) => {
                            return (
                              <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                {`${item?.firstName} ${item?.lastName}`}
                              </MenuItem>
                            );
                          }) : formik?.values?.role === "Admin" ?
                            admin?.map((item) => {
                              return (
                                <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                  {`${item?.firstName} ${item?.lastName}`}
                                </MenuItem>
                              );
                            }) : formik?.values?.role === "National Manager" ?
                              nationalManager?.map((item) => {
                                return (
                                  <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                    {`${item?.firstName} ${item?.lastName}`}
                                  </MenuItem>
                                );
                              }) : formik?.values?.role === "Branch Manager" ?
                                branchManager?.map((item) => {
                                  return (
                                    <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                      {`${item?.firstName} ${item?.lastName}`}
                                    </MenuItem>
                                  );
                                }) : formik?.values?.role === "Zonal Manager" ?
                                  zonalManager?.map((item) => {
                                    return (
                                      <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                        {`${item?.firstName} ${item?.lastName}`}
                                      </MenuItem>
                                    );
                                  }) : formik?.values?.role === "Regional Manager" ?
                                    regionalManager?.map((item) => {
                                      return (
                                        <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                          {`${item?.firstName} ${item?.lastName}`}
                                        </MenuItem>
                                      );
                                    }) : formik?.values?.role === "Territory Manager" ?
                                      territoryManager?.map((item) => {
                                        return (
                                          <MenuItem key={item?._id} value={item?._id} style={{ textTransform: "capitalize" }}>
                                            {`${item?.firstName} ${item?.lastName}`}
                                          </MenuItem>
                                        );
                                      }) : ""
                      }
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.parentId && formik.errors.parentId}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>About</FormLabel>
                  <TextField
                    id="about"
                    name="about"
                    size='small'
                    multiline
                    rows={4}
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} textAlign={"right"}>
                  <Button variant='contained' onClick={formik.handleSubmit}>Save Changes</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default General;
