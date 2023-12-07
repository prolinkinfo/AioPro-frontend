import React, { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import { allusers, apipost } from '../../../service/api';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];
const BloodGroup = [
  { label: 'O+' },
  { label: 'O-' },
  { label: 'A+' },
  { label: 'A-' },
  { label: 'B+' },
  { label: 'B-' },
  { label: 'AB+' },
];

const Language = [{ label: 'Gujrati' }, { label: 'Hindi' }, { label: 'English' }];

const AddEmployees = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // -----------  validationSchema
  const validationSchema = yup.object({
    doctorName: yup.string().required('Doctor Name is required'),
    hospitalName: yup.string().required('Hospital Name is required'),
    gender: yup.string().required('Gender is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    division: yup.string().required('Division is required'),
    zone: yup.string().required('Zone is required'),
    speciality: yup.string().required('Speciality is required'),
    assignedTo: yup.string().required('Assigned To is required'),
  });

  const initialValues = {
    profileImg: '',
    employeesCode: '',
    employeesName: '',
    hospitalName: '',
    gender: '',
    workType: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    maritalStatus: '',
    anniversaryDate: '',
    qualification: '',
    state: '',
    city: '',
    division: '',
    zones: '',
    pincode: '',
    speciality: '',
    type: '',
    category: '',
    address: '',
    approximatedBusiness: '',
    assignedTo: '',
    firmName: '',
    // createdBy: id,
  };

  const AddEmployees = async (values) => {
    const data = new FormData();
    data.append('avatar', values?.avatar);

    // const result = await apipost('/api/auth/signup', data);
    // if (result && result.status === 200) {
    //   navigate('/login');
    // }
    const payload = {
      doctorName: values.doctorName,
      hospitalName: values.hospitalName,
      gender: values.gender,
      contactNumber: values.contactNumber,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      maritalStatus: values.maritalStatus,
      anniversaryDate: values.anniversaryDate,
      qualification: values.qualification,
      addressInformation: {
        state: values.state,
        city: values.city,
        division: values.division,
        zone: values.zone,
        Pincode: values.pincode,
      },
      workInformation: {
        speciality: values.speciality,
        type: values.type,
        category: values.category,
        approximatedBusiness: values.approximatedBusiness,
        assignedTo: values.assignedTo,
        firmName: values.firmName,
      },
    };
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      AddEmployees(values);
    },
  });

  const back = () => {
    navigate(`/${userRole}/dashboard/people/employees`);
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    formik.setFieldValue('profileImg', file);
  };

  const clear = () => {
    setSelectedFile('');
  };

  const FileUploadButton = ({ onChange }) => {
    const handleButtonClick = () => {
      document.getElementById('avatar-upload').click();
    };

    const handleFileChange = (e) => {
      onChange(e);
    };

    return (
      <>
        <Button
          component="span"
          variant="outlined"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleButtonClick}
        >
          Upload
        </Button>

        <input
          accept="image/*"
          type="file"
          id="avatar-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-labelledby="avatar-upload"
        />
      </>
    );
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Add Employees</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={back}>
              Back
            </Button>
          </Stack>
        </Stack>
        <Box width="100%" pt={3}>
          <Card style={{ padding: '20px 50px 20px 50px' }}>
            <Typography variant="h4">Basic Information</Typography>
            <Divider />

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box style={{ textAlign: 'center' }}>
                  {selectedFile ? (
                    <Avatar
                      alt="Avatar"
                      src={selectedFile}
                      sx={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                    />
                  ) : (
                    <img
                      src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      style={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                      alt="profile-img"
                    />
                  )}
                  <Typography variant="h6">Upload Avatar</Typography>

                  <FileUploadButton onChange={handleFileChange} />

                  <Button
                    component="span"
                    variant="outlined"
                    color="error"
                    style={{ marginTop: '20px', marginLeft: '10px' }}
                    onClick={clear}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Employees Code</FormLabel>
                <TextField
                  id="doctorName"
                  name="employeesCode"
                  size="small"
                  maxRows={10}
                  placeholder="Employees code"
                  fullWidth
                  value={formik.values.employeesCode}
                  onChange={formik.handleChange}
                  error={formik.touched.employeesCode && Boolean(formik.errors.employeesCode)}
                  helperText={formik.touched.employeesCode && formik.errors.employeesCode}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Employees Name</FormLabel>
                <TextField
                  id="doctorName"
                  name="employeesName"
                  size="small"
                  maxRows={10}
                  placeholder="Enter Employees Name"
                  fullWidth
                  value={formik.values.employeesName}
                  onChange={formik.handleChange}
                  error={formik.touched.employeesName && Boolean(formik.errors.employeesName)}
                  helperText={formik.touched.employeesName && formik.errors.employeesName}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="disabled" disabled control={<Radio />} label="other" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Work Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="workType"
                    value={formik.values.workType}
                    onChange={formik.handleChange}
                    error={formik.touched.workType && Boolean(formik.errors.workType)}
                    helperText={formik.touched.workType && formik.errors.workType}
                  >
                    <FormControlLabel value="office" control={<Radio />} label="office" />
                    <FormControlLabel value="onField" control={<Radio />} label="on Field" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Date Of Birth</FormLabel>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    name="maritalStatus"
                    placeholder="Select Marital Status"
                    value={formik.values.maritalStatus}
                    onChange={formik.handleChange}
                    error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
                    helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
                  >
                    <MenuItem value={'married'}>Married</MenuItem>
                    <MenuItem value={'single'}>Single</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Anniversary</FormLabel>
                <TextField
                  id="anniversaryDate"
                  name="anniversaryDate"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={formik.values.anniversaryDate}
                  onChange={formik.handleChange}
                  error={formik.touched.anniversaryDate && Boolean(formik.errors.anniversaryDate)}
                  helperText={formik.touched.anniversaryDate && formik.errors.anniversaryDate}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4}>
              Contact Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Primary Contact Number</FormLabel>
                <TextField
                  id="pincode"
                  name="primaryContact"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Primary Contact Number"
                  value={formik.values.primaryContact}
                  onChange={formik.handleChange}
                  error={formik.touched.primaryContact && Boolean(formik.errors.primaryContact)}
                  helperText={formik.touched.primaryContact && formik.errors.primaryContact}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Alternate Contact Number</FormLabel>
                <TextField
                  name="alternateContact"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Alternate Contact Number"
                  value={formik.values.alternateContact}
                  onChange={formik.handleChange}
                  error={formik.touched.alternateContact && Boolean(formik.errors.alternateContact)}
                  helperText={formik.touched.alternateContact && formik.errors.alternateContact}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="pincode"
                  name="email"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Eamil"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Country</FormLabel>
                <Autocomplete
                  disablePortal
                  name="country"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Country"
                      error={formik.touched.country && Boolean(formik.errors.country)}
                      helperText={formik.touched.country && formik.errors.country}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>State</FormLabel>
                <Autocomplete
                  disablePortal
                  name="state"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select State"
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>HQ</FormLabel>
                <Autocomplete
                  disablePortal
                  name="hq"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.hq}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select HQ"
                      error={formik.touched.hq && Boolean(formik.errors.hq)}
                      helperText={formik.touched.hq && formik.errors.hq}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Multiple HQ</FormLabel>
                <Autocomplete
                  disablePortal
                  name="multipleHq"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.multipleHq}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Multiple HQ"
                      error={formik.touched.multipleHq && Boolean(formik.errors.multipleHq)}
                      helperText={formik.touched.multipleHq && formik.errors.multipleHq}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Select Division</FormLabel>
                <Autocomplete
                  disablePortal
                  name="division"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.division}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Division"
                      error={formik.touched.division && Boolean(formik.errors.division)}
                      helperText={formik.touched.division && formik.errors.division}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Zones</FormLabel>
                <Autocomplete
                  disablePortal
                  name="zone"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.zones}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Zone"
                      error={formik.touched.zones && Boolean(formik.errors.zones)}
                      helperText={formik.touched.zones && formik.errors.zones}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Home Loction</FormLabel>
                <TextField
                  id="address"
                  name="homeLocation"
                  size="small"
                  rows={2}
                  multiline
                  fullWidth
                  value={formik.values.homeLocation}
                  onChange={formik.handleChange}
                  error={formik.touched.homeLocation && Boolean(formik.errors.homeLocation)}
                  helperText={formik.touched.homeLocation && formik.errors.homeLocation}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Permanent Loction</FormLabel>
                <TextField
                  id="address"
                  name="permanentLoction"
                  size="small"
                  rows={2}
                  multiline
                  fullWidth
                  value={formik.values.permanentLoction}
                  onChange={formik.handleChange}
                  error={formik.touched.permanentLoction && Boolean(formik.errors.permanentLoction)}
                  helperText={formik.touched.permanentLoction && formik.errors.permanentLoction}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Zip/Postal Code</FormLabel>
                <TextField
                  id="pincode"
                  name="pincode"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Postal Code / Zip Pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Additional Division</FormLabel>
                <Autocomplete
                  disablePortal
                  name="additionalDivision"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.additionalDivision}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Zone"
                      error={formik.touched.additionalDivision && Boolean(formik.errors.additionalDivision)}
                      helperText={formik.touched.additionalDivision && formik.errors.additionalDivision}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4}>
              Work Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Ex-Stations</FormLabel>
                <Autocomplete
                  disablePortal
                  name="exStations"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.exStations}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Ex-Stations"
                      error={formik.touched.exStations && Boolean(formik.errors.exStations)}
                      helperText={formik.touched.exStations && formik.errors.exStations}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Out-Stations</FormLabel>
                <Autocomplete
                  disablePortal
                  name="outStations"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.outStations}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Out-Stations"
                      error={formik.touched.outStations && Boolean(formik.errors.outStations)}
                      helperText={formik.touched.outStations && formik.errors.outStations}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Designation</FormLabel>
                <Autocomplete
                  disablePortal
                  name="designation"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Designation"
                      error={formik.touched.designation && Boolean(formik.errors.designation)}
                      helperText={formik.touched.designation && formik.errors.designation}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Assigned To</FormLabel>
                <Autocomplete
                  disablePortal
                  name="approximatedBusiness"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.approximatedBusiness}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Approximated Business"
                      error={formik.touched.approximatedBusiness && Boolean(formik.errors.approximatedBusiness)}
                      helperText={formik.touched.approximatedBusiness && formik.errors.approximatedBusiness}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Additional Supervisor</FormLabel>
                <Autocomplete
                  disablePortal
                  name="assignedTo"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.assignedTo}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Assigned To"
                      error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                      helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Joining</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Joining</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>End Probation Date</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>End Confirmation Date</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Daily Work Hours (In numbers)</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Show Accompanied</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Accompanied Employee</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Resignation</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Show In Transit</FormLabel>
                <TextField
                  id="firmName"
                  name="firmName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Select Firm Name"
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4}>
              Other Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Employee Qualification</FormLabel>
                <TextField
                  id="firmName"
                  name="employeeQualification"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Employee Qualification"
                  value={formik.values.employeeQualification}
                  onChange={formik.handleChange}
                  error={formik.touched.employeeQualification && Boolean(formik.errors.employeeQualification)}
                  helperText={formik.touched.employeeQualification && formik.errors.employeeQualification}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Aadhar Number</FormLabel>
                <TextField
                  id="firmName"
                  name="aadharNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Aadhar Number"
                  value={formik.values.aadharNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.aadharNumber && Boolean(formik.errors.aadharNumber)}
                  helperText={formik.touched.aadharNumber && formik.errors.aadharNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>PAN Number</FormLabel>
                <TextField
                  id="firmName"
                  name="PanNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="PAN Number"
                  value={formik.values.PanNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.PanNumber && Boolean(formik.errors.PanNumber)}
                  helperText={formik.touched.PanNumber && formik.errors.PanNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>PF Number</FormLabel>
                <TextField
                  id="firmName"
                  name="pfNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="PF Number"
                  value={formik.values.pfNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.pfNumber && Boolean(formik.errors.pfNumber)}
                  helperText={formik.touched.pfNumber && formik.errors.pfNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>ESIC Number</FormLabel>
                <TextField
                  id="firmName"
                  name="ESICNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="ESIC Number"
                  value={formik.values.ESICNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.ESICNumber && Boolean(formik.errors.ESICNumber)}
                  helperText={formik.touched.ESICNumber && formik.errors.ESICNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>PF UAN Number</FormLabel>
                <TextField
                  id="firmName"
                  name="PfUanNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="PF UAN Number"
                  value={formik.values.PfUanNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.PfUanNumber && Boolean(formik.errors.PfUanNumber)}
                  helperText={formik.touched.PfUanNumber && formik.errors.PfUanNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Driver's License Number</FormLabel>
                <TextField
                  id="firmName"
                  name="driverLicenseNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Driver's License Number"
                  value={formik.values.driverLicenseNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.driverLicenseNumber && Boolean(formik.errors.driverLicenseNumber)}
                  helperText={formik.touched.driverLicenseNumber && formik.errors.driverLicenseNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Blood Group</FormLabel>
                <Autocomplete
                  disablePortal
                  name="bloodGroup"
                  options={BloodGroup}
                  fullWidth
                  size="small"
                  value={formik.values.bloodGroup}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Blood Group"
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Language</FormLabel>
                <Autocomplete
                  disablePortal
                  name="bloodGroup"
                  options={Language}
                  fullWidth
                  size="small"
                  value={formik.values.bloodGroup}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Blood Group"
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4}>
              Daily Allowance Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_HO</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_HO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_HO"
                  value={formik.values.DA_HO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_HO && Boolean(formik.errors.DA_HO)}
                  helperText={formik.touched.DA_HO && formik.errors.DA_HO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_EX</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_EX"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_EX"
                  value={formik.values.DA_EX}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_EX && Boolean(formik.errors.DA_EX)}
                  helperText={formik.touched.DA_EX && formik.errors.DA_EX}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_OUT</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_OUT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_OUT"
                  value={formik.values.DA_OUT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OUT && Boolean(formik.errors.DA_OUT)}
                  helperText={formik.touched.DA_OUT && formik.errors.DA_OUT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_RHO</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_RHO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_RHO"
                  value={formik.values.DA_RHO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_RHO && Boolean(formik.errors.DA_RHO)}
                  helperText={formik.touched.DA_RHO && formik.errors.DA_RHO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_TRANSIT</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_TRANSIT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_TRANSIT"
                  value={formik.values.DA_TRANSIT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_TRANSIT && Boolean(formik.errors.DA_TRANSIT)}
                  helperText={formik.touched.DA_TRANSIT && formik.errors.DA_TRANSIT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_OTHER</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_OTHER"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="DA_OTHER"
                  value={formik.values.DA_OTHER}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OTHER && Boolean(formik.errors.DA_OTHER)}
                  helperText={formik.touched.DA_OTHER && formik.errors.DA_OTHER}
                />
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4}>
              Account Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Account Holder Name</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_HO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Account Holder Name"
                  value={formik.values.DA_HO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_HO && Boolean(formik.errors.DA_HO)}
                  helperText={formik.touched.DA_HO && formik.errors.DA_HO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Account Number</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_EX"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Account Number"
                  value={formik.values.DA_EX}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_EX && Boolean(formik.errors.DA_EX)}
                  helperText={formik.touched.DA_EX && formik.errors.DA_EX}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>IFSC Number</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_OUT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="IFSC Number"
                  value={formik.values.DA_OUT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OUT && Boolean(formik.errors.DA_OUT)}
                  helperText={formik.touched.DA_OUT && formik.errors.DA_OUT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Beneficiary ID</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_RHO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Beneficiary ID"
                  value={formik.values.DA_RHO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_RHO && Boolean(formik.errors.DA_RHO)}
                  helperText={formik.touched.DA_RHO && formik.errors.DA_RHO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Bank Name</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_TRANSIT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Bank Name"
                  value={formik.values.DA_TRANSIT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_TRANSIT && Boolean(formik.errors.DA_TRANSIT)}
                  helperText={formik.touched.DA_TRANSIT && formik.errors.DA_TRANSIT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Branch Name</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_OTHER"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Branch Name"
                  value={formik.values.DA_OTHER}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OTHER && Boolean(formik.errors.DA_OTHER)}
                  helperText={formik.touched.DA_OTHER && formik.errors.DA_OTHER}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Nominee Name</FormLabel>
                <TextField
                  id="firmName"
                  name="DA_OTHER"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Nominee Name"
                  value={formik.values.DA_OTHER}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OTHER && Boolean(formik.errors.DA_OTHER)}
                  helperText={formik.touched.DA_OTHER && formik.errors.DA_OTHER}
                />
              </Grid>
            </Grid>

            <Divider />
            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'end'}>
              <Stack direction={'row'} spacing={2}>
                <Button variant="contained" onClick={formik.handleSubmit}>
                  Add Doctor
                </Button>
                <Button variant="outlined" color="error">
                  Cancle
                </Button>
              </Stack>
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default AddEmployees;
