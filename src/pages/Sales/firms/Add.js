/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
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
import { useDispatch, useSelector } from 'react-redux';
import { apiget, apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchQualificationData } from '../../../redux/slice/GetQualificationSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchStateData } from '../../../redux/slice/GetStateSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';

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

const AddFirms = () => {
  const [cityList, setCityList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cityData = useSelector((state) => state?.getCity?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const doctorCategoryList = useSelector((state) => state?.getDoctorCategory?.data);
  const employeeList = useSelector((state) => state?.getEmployee?.data);
  const firmData = useSelector((state) => state?.geFirmType?.data);

  // -----------  validationSchema
  const validationSchema = yup.object({
    firmName: yup.string().required('Firm Name is required'),
    firmType: yup.string().required('Slect Firma Type'),
    assignedFirmEmail: yup.string().email('Invalid email address').required('Assigned Firm Email is required'),
    // city: yup.string().required('City is required'),
    division: yup.string().required('Division is required'),
    zone: yup.string().required('Zone is required'),
    address: yup.string().required('Address is required'),
    contactNumber: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number'),

    // speciality: yup.string().required('Speciality is required'),
    assignedTo: yup.string().required('Assigned To is required'),
  });

  const initialValues = {
    firmName: '',
    firmType: '',
    date: '',
    firmCode: '',
    contactPersonName: '',
    contactNumber: '',
    email: '',
    category: '',
    assignedTo: '',
    assignedFirmEmail: '',
    employeeAssigned: '',
    firstLevelManager: '',
    secondLevelManager: '',
    thirdLevelManager: '',
    dateOfBirth: '',
    city: '',
    division: '',
    zone: '',
    address: '',
    gstNumber: '',
    drugLicenseNumber: '',
    panNumber: '',
    foodLicenseNumber: '',
    pincode: '',
    bankname: '',
    branchName: '',
    accountNumber: '',
  };

  const addDoctor = async (values) => {
    console.log("values",values)
    const result = await apipost('/api/firm', values);

    if (result && result.status === 200) {
      formik.resetForm();
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      addDoctor(values);
    },
  });

  const fetchCityDatas = async (stateName) => {
    const filtered = cityData?.filter((city) => city?.stateName?.toLowerCase() === stateName?.toLowerCase());
    setCityList(filtered);
  };

  useEffect(() => {
    dispatch(fetchCityData());
    dispatch(fetchDoctorSpecialityData());
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchQualificationData());
    dispatch(fetchTypeData());
    dispatch(fetchStateData());
    dispatch(fetchCategoryData());
    dispatch(fetchEmployeeData());
    dispatch(firmaTypeData());
  }, []);

  const back = () => {
    navigate(`/${userRole}/dashboard/sales/firms`);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Add Firms</Typography>
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
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Firm Name</FormLabel>
                <TextField
                  name="firmName"
                  size="small"
                  maxRows={10}
                  placeholder="Enter Firm Name"
                  fullWidth
                  value={formik.values.firmName}
                  onChange={formik.handleChange}
                  error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                  helperText={formik.touched.firmName && formik.errors.firmName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Firm Type</FormLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    size="small"
                    name="firmType"
                    onChange={(event, newValue) => {
                      formik.setFieldValue('firmType', newValue ? newValue?.firmType : '');
                    }}
                    fullWidth
                    options={firmData}
                    value={firmData.find((item) => item.firmType === formik?.values?.firmType) || null}
                    getOptionLabel={({ firmType }) => firmType}
                    // style={{ textTransform: 'capitalize' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ textTransform: 'capitalize' }}
                        placeholder="Select Firm Type"
                        error={formik.touched.firmType && Boolean(formik.errors.firmType)}
                        helperText={formik.touched.firmType && formik.errors.firmType}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date </FormLabel>
                <TextField
                  name="date"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Fimr Code</FormLabel>
                <TextField
                  name="firmCode"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Firm Code"
                  value={formik.values.firmCode}
                  onChange={formik.handleChange}
                  error={formik.touched.firmCode && Boolean(formik.errors.firmCode)}
                  helperText={formik.touched.firmCode && formik.errors.firmCode}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Contact Person Name</FormLabel>
                <TextField
                  name="contactPersonName"
                  size="small"
                  maxRows={10}
                  placeholder="Enter Contact Person Name"
                  fullWidth
                  value={formik.values.contactPersonName}
                  onChange={formik.handleChange}
                  error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                  helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Contact Number</FormLabel>
                <TextField
                  name="contactNumber"
                  size="small"
                  maxRows={10}
                  placeholder="Enter Contact Number"
                  fullWidth
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                  helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  size="small"
                  placeholder="Enter Email"
                  maxRows={10}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Category</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('category', newValue ? newValue.categoryName : '');
                  }}
                  fullWidth
                  options={doctorCategoryList}
                  value={
                    doctorCategoryList.find((categoryType) => categoryType.categoryName === formik.values.category) ||
                    null
                  }
                  getOptionLabel={(categoryType) => categoryType?.categoryName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Category"
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Assigned To</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('assignedTo', newValue ? newValue.basicInformation?.employeesName : '');
                  }}
                  fullWidth
                  options={employeeList}
                  value={
                    employeeList.find(
                      (employee) => employee?.basicInformation?.employeesName === formik.values.assignedTo
                    ) || null
                  }
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Assigned To"
                      error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                      helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Email of Assigned Firm</FormLabel>
                <TextField
                  id="email"
                  name="assignedFirmEmail"
                  size="small"
                  type='email'
                  placeholder="Enter of Assigned Firm"
                  maxRows={10}
                  fullWidth
                  value={formik.values.assignedFirmEmail}
                  onChange={formik.handleChange}
                  error={formik.touched.assignedFirmEmail && Boolean(formik.errors.assignedFirmEmail)}
                  helperText={formik.touched.assignedFirmEmail && formik.errors.assignedFirmEmail}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Employee Assigned</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('employeeAssigned', newValue ? newValue.basicInformation?.employeesName : '');
                  }}
                  fullWidth
                  options={employeeList}
                  value={
                    employeeList.find(
                      (employee) => employee?.basicInformation?.employeesName === formik.values.employeeAssigned
                    ) || null
                  }
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Employee Assigned"
                      error={formik.touched.employeeAssigned && Boolean(formik.errors.employeeAssigned)}
                      helperText={formik.touched.employeeAssigned && formik.errors.employeeAssigned}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>First Level Manager</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('firstLevelManager', newValue ? newValue.basicInformation?.employeesName : '');
                  }}
                  fullWidth
                  options={employeeList}
                  value={
                    employeeList.find(
                      (employee) => employee?.basicInformation?.employeesName === formik.values.firstLevelManager
                    ) || null
                  }
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select First Level Manager"
                      error={formik.touched.firstLevelManager && Boolean(formik.errors.firstLevelManager)}
                      helperText={formik.touched.firstLevelManager && formik.errors.firstLevelManager}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Second Level Manager</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue(
                      'secondLevelManager',
                      newValue ? newValue.basicInformation?.employeesName : ''
                    );
                  }}
                  fullWidth
                  options={employeeList}
                  value={
                    employeeList.find(
                      (employee) => employee?.basicInformation?.employeesName === formik.values.secondLevelManager
                    ) || null
                  }
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Second Level Manager"
                      error={formik.touched.secondLevelManager && Boolean(formik.errors.secondLevelManager)}
                      helperText={formik.touched.secondLevelManager && formik.errors.secondLevelManager}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel> Third Level Manager</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('thirdLevelManager', newValue ? newValue.basicInformation?.employeesName : '');
                  }}
                  fullWidth
                  options={employeeList}
                  value={
                    employeeList.find(
                      (employee) => employee?.basicInformation?.employeesName === formik.values.thirdLevelManager
                    ) || null
                  }
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Third Level Manager"
                      error={formik.touched.thirdLevelManager && Boolean(formik.errors.thirdLevelManager)}
                      helperText={formik.touched.thirdLevelManager && formik.errors.thirdLevelManager}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Birth</FormLabel>
                <TextField
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
            </Grid>

            <Typography variant="h4" mt={4}>
              Address Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>City</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('city', newValue ? newValue.cityName : '');
                  }}
                  fullWidth
                  options={cityList}
                  value={cityList.find((city) => city.cityName === formik.values.city) || null}
                  getOptionLabel={(city) => city?.cityName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select City"
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Division</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('division', newValue ? newValue.divisionName : '');
                  }}
                  fullWidth
                  options={divisionList}
                  value={divisionList.find((division) => division.divisionName === formik.values.division) || null}
                  getOptionLabel={(division) => division?.divisionName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Division"
                      error={formik.touched.division && Boolean(formik.errors.division)}
                      helperText={formik.touched.division && formik.errors.division}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Zone</FormLabel>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    formik.setFieldValue('zone', newValue ? newValue.zoneName : '');
                  }}
                  fullWidth
                  options={zoneList}
                  value={zoneList.find((zone) => zone.zoneName === formik.values.zone) || null}
                  getOptionLabel={(zone) => zone?.zoneName}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder="Select Zone"
                      error={formik.touched.zone && Boolean(formik.errors.zone)}
                      helperText={formik.touched.zone && formik.errors.zone}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Address</FormLabel>
                <TextField
                  id="address"
                  name="address"
                  size="small"
                  rows={1}
                  multiline
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
            <Typography variant="h4" mt={4}>
              KYC Information
            </Typography>
            <Divider />
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>GST NUmber</FormLabel>
                <TextField
                  name="gstNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter GST Number"
                  value={formik.values.gstNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.gstNumber && Boolean(formik.errors.gstNumber)}
                  helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Drug License Number</FormLabel>
                <TextField
                  name="drugLicenseNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Drug License Number"
                  value={formik.values.drugLicenseNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.drugLicenseNumber && Boolean(formik.errors.drugLicenseNumber)}
                  helperText={formik.touched.drugLicenseNumber && formik.errors.drugLicenseNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>PAN Number</FormLabel>
                <TextField
                  name="panNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter PAN Number"
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
                  helperText={formik.touched.panNumber && formik.errors.panNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Food License Number</FormLabel>
                <TextField
                  name="foodLicenseNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Food License Number"
                  value={formik.values.foodLicenseNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.foodLicenseNumber && Boolean(formik.errors.foodLicenseNumber)}
                  helperText={formik.touched.foodLicenseNumber && formik.errors.foodLicenseNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Pincode</FormLabel>
                <TextField
                  name="pincode"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Bank Name</FormLabel>
                <TextField
                  name="bankname"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Bank Name"
                  value={formik.values.bankname}
                  onChange={formik.handleChange}
                  error={formik.touched.bankname && Boolean(formik.errors.bankname)}
                  helperText={formik.touched.bankname && formik.errors.bankname}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Branch Name</FormLabel>
                <TextField
                  name="branchName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Branch Name"
                  value={formik.values.branchName}
                  onChange={formik.handleChange}
                  error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                  helperText={formik.touched.branchName && formik.errors.branchName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={2}>
                <FormLabel>Account Number</FormLabel>
                <TextField
                  name="accountNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Account Number"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                  helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                />
              </Grid>

              <Divider />
              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'end'}>
                <Stack direction={'row'} spacing={2}>
                  <Button variant="contained" onClick={formik.handleSubmit}>
                    Add Firm
                  </Button>
                  <Button variant="outlined" color="error">
                    Cancle
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default AddFirms;
