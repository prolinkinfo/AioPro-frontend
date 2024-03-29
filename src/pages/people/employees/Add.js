import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
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
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Iconify from '../../../components/iconify';
import { allusers, apipost, apiget, apiput } from '../../../service/api';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchQualificationData } from '../../../redux/slice/GetQualificationSlice';
import { fetchCountryData } from '../../../redux/slice/getCountrySlice';
import { fetchStateData } from '../../../redux/slice/GetStateSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchDesignation } from '../../../redux/slice/GetDesignationSlice';

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
  const [employeeList, setEmployeeList] = useState([]);
  const [stateList, setStateList] = useState([]);

  // -----------  validationSchema
  const validationSchema = Yup.object({
    // profileImg: Yup.string(),
    // // employeesCode: Yup.string().required('Employee code is required'),

    // firstName: Yup.string().required('First name is required'),
    // // middleName:Yup.string().required('Employee name is required'),
    // surname: Yup.string().required('Surname  is required'),
    // gender: Yup.string().required('Gender is required'),
    // workType: Yup.string().required('Work type is required'),
    // Dob: Yup.string().required('Date of birth is required'),
    // maritalStatus: Yup.string(),
    // anniversaryDate: Yup.string(),
    // primaryContact: Yup.string()
    //   .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    //   .required('Primary contact is required'),
    // alternateContact: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    // email: Yup.string().email('Invalid email address').required('Employee email address'),
    // country: Yup.string().required('Country is required'),
    // state: Yup.string().required('State is required'),
    // // hq: Yup.string().required('Headquarters is required'),
    // // multipleHq: Yup.string(),
    // division: Yup.string().required('Division is required'),
    // zone: Yup.string().required('Zone is required'),
    // homeLocation: Yup.string().required('Home location is required'),
    // permanentLoction: Yup.string().required('Permanent location is required'),
    // pincode: Yup.string().required('Pincode is required'),
    // additionalDivision: Yup.string(),
    // // exStations: Yup.string().required('Ex stations are required'),
    // // outStations: Yup.string().required('Out stations are required'),
    // designation: Yup.string().required('Designation is required'),
    // // assignedTo: Yup.string().required('Assigned to is required'),
    // // additionalSupervisor: Yup.string(),
    // // Doj: Yup.string().required('Date of joining is required'),
    // endProbationDate: Yup.string(),
    // endConfirmationDate: Yup.string(),
    // dailyWorkHours: Yup.string().required('Daily work hours are required'),
    // showAccompanied: Yup.boolean().required('Please select Show Accompanied field'),
    // accompaniedEmployee: Yup.string(),
    // dateOfResignation: Yup.string(),
    // showInTransit: Yup.boolean().required('Please select Show Accompanied field'),
    // employeeQualification: Yup.string(),
    // aadharNumber: Yup.string().required('Aadhar number is required'),
    // PanNumber: Yup.string().required('Pan number is required'),
    // pfNumber: Yup.string().required('PF number is required'),
    // ESICNumber: Yup.string().required('ESIC number is required'),
    // PfUanNumber: Yup.string().required('PF UAN number is required'),
    // bloodGroup: Yup.string(),
    // Language: Yup.string(),
    // DA_HO: Yup.string(),
    // DA_EX: Yup.string(),
    // DA_OUT: Yup.string(),
    // DA_RHO: Yup.string(),
    // DA_TRANSIT: Yup.string(),
    // DA_OTHER: Yup.string(),
    // accountHolderName: Yup.string().required('Account holder name is required'),
    // accountNumber: Yup.string().required('Account number is required'),
    // IFSCNumber: Yup.string().required('IFSC number is required'),
    // beneficiaryID: Yup.string(),
    // bankName: Yup.string().required('Bank name is required'),
    // branchName: Yup.string().required('Branch name is required'),
    // nomineeName: Yup.string(),
  });
  const params = useParams();

  const dispatch = useDispatch();
  const cityData = useSelector((state) => state?.getCity?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const qualificationList = useSelector((state) => state?.getQualification?.data);
  const country = useSelector((state) => state?.getCountry?.data);
  const state = useSelector((state) => state?.getState?.data);
  const designation = useSelector((state) => state?.getDesignation?.data);

  useEffect(() => {
    dispatch(fetchCityData());
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchQualificationData());
    dispatch(fetchCountryData());
    dispatch(fetchStateData());
    dispatch(fetchDesignation());
  }, [dispatch]);

  async function fetchdata() {
    const result = await apiget(`/api/employees/${params?.id}`);
    if (result && result.status === 200) {
      setEmployeeList(result?.data?.result);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const initialValues = {
    profileImg: employeeList?.basicInformation?.profileImg || '',
    employeesCode: employeeList?.basicInformation?.employeesCode,
    firstName: employeeList?.basicInformation?.firstName || '',
    middleName: employeeList?.basicInformation?.middleName || '',
    surname: employeeList?.basicInformation?.surname || '',
    // employeesName: '',
    gender: employeeList?.basicInformation?.gender || '',
    workType: employeeList?.basicInformation?.workType || '',
    Dob: employeeList?.basicInformation?.Dob || '',
    maritalStatus: employeeList?.basicInformation?.maritalStatus || '',
    anniversaryDate: employeeList?.basicInformation?.anniversaryDate || '',
    // Contact Information
    primaryContact: employeeList?.contactInformation?.primaryContact || '',
    alternateContact: employeeList?.contactInformation?.alternateContact || '',
    email: employeeList?.contactInformation?.email || '',
    country: employeeList?.contactInformation?.country || '',
    state: employeeList?.contactInformation?.state || '',
    hq: employeeList?.contactInformation?.hq || '',
    multipleHq: employeeList?.contactInformation?.multipleHq || '',
    division: employeeList?.contactInformation?.division || '',
    zone: employeeList?.contactInformation?.zone || '',
    homeLocation: employeeList?.contactInformation?.homeLocation || '',
    permanentLoction: employeeList?.contactInformation?.permanentLoction || '',
    pincode: employeeList?.contactInformation?.pincode || '',
    additionalDivision: employeeList?.contactInformation?.additionalDivision || '',
    // Work Information
    exStations: employeeList?.workInformation?.exStations || '',
    outStations: employeeList?.workInformation?.outStations || '',
    designation: employeeList?.workInformation?.designation || '',
    assignedTo: employeeList?.workInformation?.assignedTo || '',
    additionalSupervisor: employeeList?.workInformation?.additionalSupervisor || '',
    Doj: employeeList?.workInformation?.Doj || '',
    endProbationDate: employeeList?.workInformation?.endConfirmationDate || '',
    endConfirmationDate: employeeList?.workInformation?.endConfirmationDate || '',
    dailyWorkHours: employeeList?.workInformation?.dailyWorkHours || '',
    showAccompanied: employeeList?.workInformation?.showAccompanied || false,
    accompaniedEmployee: employeeList?.workInformation?.accompaniedEmployee || '',
    dateOfResignation: employeeList?.workInformation?.dateOfResignation || '',
    showInTransit: employeeList?.workInformation?.showInTransit || false,
    // Other Information
    employeeQualification: employeeList?.otherInformation?.employeeQualification || '',
    aadharNumber: employeeList?.otherInformation?.aadharNumber || '',
    PanNumber: employeeList?.otherInformation?.PanNumber || '',
    pfNumber: employeeList?.otherInformation?.pfNumber || '',
    ESICNumber: employeeList?.otherInformation?.ESICNumber || '',
    PfUanNumber: employeeList?.otherInformation?.PfUanNumber || '',
    bloodGroup: employeeList?.otherInformation?.bloodGroup || '',
    Language: employeeList?.otherInformation?.Language || '',
    driverLicenseNumber: employeeList?.otherInformation?.driverLicenseNumber || '',
    // Daily Allowance Information
    DA_HO: employeeList?.dailyAllowanceInformation?.DA_HO || '',
    DA_EX: employeeList?.dailyAllowanceInformation?.DA_EX || '',
    DA_OUT: employeeList?.dailyAllowanceInformation?.DA_OUT || '',
    DA_RHO: employeeList?.dailyAllowanceInformation?.DA_RHO || '',
    DA_TRANSIT: employeeList?.dailyAllowanceInformation?.DA_TRANSIT || '',
    DA_OTHER: employeeList?.dailyAllowanceInformation?.DA_OTHER || '',
    // Account Information
    accountHolderName: employeeList?.accountInformation?.accountHolderName || '',
    accountNumber: employeeList?.accountInformation?.accountHolderName || '',
    IFSCNumber: employeeList?.accountInformation?.IFSCNumber || '',
    beneficiaryID: employeeList?.accountInformation?.beneficiaryID || '',
    bankName: employeeList?.accountInformation?.bankName || '',
    branchName: employeeList?.accountInformation?.branchName || '',
    nomineeName: employeeList?.accountInformation?.nomineeName || '',
  };

  const AddEmployees = async (values) => {
    console.log('values', values);
    const data = new FormData();
    // Basic Information
    data.append('profileImg', values?.profileImg);
    data.append('employeesCode', employeeList?.basicInformation?.employeesCode);
    data.append('firstName', values?.firstName);
    data.append('middleName', values?.middleName);
    data.append('surname', values?.surname);

    data.append('employeesName', values?.employeesName);
    data.append('gender', values?.gender);
    data.append('workType', values?.workType);
    data.append('Dob', values?.Dob);
    data.append('maritalStatus', values?.maritalStatus);
    data.append('anniversaryDate', values?.anniversaryDate);
    // Contact Information
    data.append('primaryContact', values?.primaryContact);
    data.append('alternateContact', values?.alternateContact);
    data.append('email', values?.email);
    data.append('country', values?.country);
    data.append('state', values?.state);
    data.append('hq', values?.hq);
    data.append('multipleHq', values?.multipleHq);
    data.append('division', values?.division);
    data.append('zone', values?.zone);
    data.append('homeLocation', values?.homeLocation);
    data.append('permanentLoction', values?.permanentLoction);
    data.append('pincode', values?.pincode);
    data.append('additionalDivision', values?.additionalDivision);
    // Work Information
    data.append('exStations', values?.exStations);
    data.append('outStations', values?.outStations);
    data.append('designation', values?.designation);
    data.append('assignedTo', values?.assignedTo);
    data.append('additionalSupervisor', values?.additionalSupervisor);
    data.append('Doj', values?.Doj);
    data.append('endProbationDate', values?.endProbationDate);
    data.append('endConfirmationDate', values?.endConfirmationDate);
    data.append('dailyWorkHours', values?.dailyWorkHours);
    data.append('showAccompanied', values?.showAccompanied);
    data.append('accompaniedEmployee', values?.accompaniedEmployee);
    data.append('dateOfResignation', values?.dateOfResignation);
    data.append('showInTransit', values?.showInTransit);
    // Other Information
    data.append('employeeQualification', values?.employeeQualification);
    data.append('aadharNumber', values?.aadharNumber);
    data.append('PanNumber', values?.PanNumber);
    data.append('pfNumber', values?.pfNumber);
    data.append('ESICNumber', values?.ESICNumber);
    data.append('PfUanNumber', values?.PfUanNumber);
    data.append('driverLicenseNumber', values?.driverLicenseNumber);
    data.append('bloodGroup', values?.bloodGroup);
    data.append('Language', values?.Language);
    // Daily Allowance Information
    data.append('DA_HO', values?.DA_HO);
    data.append('DA_EX', values?.DA_EX);
    data.append('DA_OUT', values?.DA_OUT);
    data.append('DA_RHO', values?.DA_RHO);
    data.append('DA_TRANSIT', values?.DA_TRANSIT);
    data.append('DA_OTHER', values?.DA_OTHER);
    // Account Information
    data.append('accountHolderName', values?.accountHolderName);
    data.append('accountNumber', values?.accountNumber);
    data.append('IFSCNumber', values?.IFSCNumber);
    data.append('beneficiaryID', values?.beneficiaryID);
    data.append('bankName', values?.bankName);
    data.append('branchName', values?.branchName);
    data.append('nomineeName', values?.nomineeName);
    data.append('status', 'pending');
    data.append('_id', values?._id);

    const result = params?.id ? await apiput('/api/employees', data) : await apipost('/api/employees', data);
    if (result && result.status === 200) {
      dispatch(fetchEmployeeData());
      navigate(`/${userRole}/dashboard/people/employees`);
      setSelectedFile(null);
      // navigate('/login');
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      const data = params?.id ? { ...values, _id: params?.id } : values;
      AddEmployees(data);
    },
  });

  const back = () => {
    navigate(`/${userRole}/dashboard/people/employees`);
  };

  const fetchState = (name) => {
    const findState = state?.filter(({ countryName }) => countryName?.toLowerCase() === name?.toLowerCase())
    setStateList(findState)
    console.log(findState,"findState")
  }

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
          <Typography variant="h4"> {params?.id ? 'Edit Employees' : 'Add Employees'}</Typography>
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
              <Grid item xs={12} sm={4} md={4}>
                <Box style={{ textAlign: 'center' }}>
                  {selectedFile || formik?.values?.profileImg ? (
                    <Avatar
                      alt="Avatar"
                      src={selectedFile || formik?.values?.profileImg}
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

              <Grid item xs={12} sm={8} md={8} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12} mt={1}>
                  <FormLabel>
                    First Name <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TextField
                    id="doctorName"
                    name="firstName"
                    size="small"
                    maxRows={10}
                    placeholder="Enter First Name"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} mt={1}>
                  <FormLabel>Middle Name</FormLabel>
                  <TextField
                    id="doctorName"
                    name="middleName"
                    size="small"
                    maxRows={10}
                    placeholder="Enter Middle Name"
                    fullWidth
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                    helperText={formik.touched.middleName && formik.errors.middleName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} mt={1}>
                  <FormLabel>
                    Surname <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TextField
                    id="doctorName"
                    name="surname"
                    size="small"
                    maxRows={10}
                    placeholder="Enter Surname"
                    fullWidth
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                  />
                </Grid>
              </Grid>
              {params?.id ? (
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Employees Code</FormLabel>
                  <TextField
                    id="doctorName"
                    name="employeesCode"
                    size="small"
                    maxRows={10}
                    placeholder="Employees code"
                    fullWidth
                    disabled
                    value={formik.values.employeesCode}
                    onChange={formik.handleChange}
                    error={formik.touched.employeesCode && Boolean(formik.errors.employeesCode)}
                    helperText={formik.touched.employeesCode && formik.errors.employeesCode}
                  />
                </Grid>
              ) : (
                ''
              )}

              <Grid item xs={12} sm={6} md={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
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

              <Grid item xs={12} sm={6} md={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Work Type <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
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
                <FormLabel>
                  Date Of Birth <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  id="dateOfBirth"
                  name="Dob"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={params?.id ? dayjs(formik.values.Dob).format('YYYY-MM-DD') : formik.values.Dob}
                  onChange={formik.handleChange}
                  error={formik.touched.Dob && Boolean(formik.errors.Dob)}
                  helperText={formik.touched.Dob && formik.errors.Dob}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Marital Status </FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    name="maritalStatus"
                    value={formik.values.maritalStatus || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
                    helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
                  >
                    <MenuItem value="">Select Marital Status</MenuItem>
                    <MenuItem value={'married'}>Married</MenuItem>
                    <MenuItem value={'single'}>Single</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Anniversary</FormLabel>
                <TextField
                  id="anniversaryDate"
                  name="anniversaryDate"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={
                    params?.id
                      ? dayjs(formik.values.anniversaryDate).format('YYYY-MM-DD')
                      : formik.values.anniversaryDate
                  }
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
                <FormLabel>
                  Primary Contact Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
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
                <FormLabel>
                  Email <span style={{ color: 'red' }}>*</span>
                </FormLabel>
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
                <FormLabel>
                  Country <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Autocomplete
                  disablePortal
                  name="country"
                  options={country}
                  fullWidth
                  size="small"
                  value={country.find((item) => item.countryName === formik.values.country) || null}
                  onChange={(e, value) => {
                    formik.setFieldValue('country', value ? value?.countryName : '');
                    fetchState(value ? value?.countryName : "")
                  }}
                  getOptionLabel={({ countryName }) => countryName}
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
                <FormLabel>
                  State <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Autocomplete
                  disablePortal
                  name="state"
                  options={stateList}
                  fullWidth
                  size="small"
                  value={stateList.find((item) => item.stateName === formik.values.state) || null}
                  onChange={(e, value) => formik.setFieldValue('state', value ? value.stateName : '')}
                  getOptionLabel={({ stateName }) => stateName}
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
                <FormLabel>Multiple HQ </FormLabel>
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
                <FormLabel>
                  Division <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Autocomplete
                  disablePortal
                  name="division"
                  options={divisionList}
                  fullWidth
                  size="small"
                  value={divisionList.find((division) => division.divisionName === formik.values.division) || null}
                  onChange={(e, value) => formik.setFieldValue('division', value ? value.divisionName : '')}
                  getOptionLabel={({ divisionName }) => divisionName} // Set the label to the 'divisionName' property
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
                <FormLabel>
                  Zones <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Autocomplete
                  disablePortal
                  name="zone"
                  options={zoneList}
                  fullWidth
                  size="small"
                  value={zoneList.find((zone) => zone.zoneName === formik.values.zone) || null}
                  onChange={(e, value) => formik.setFieldValue('zone', value ? value.zoneName : '')}
                  getOptionLabel={({ zoneName }) => zoneName} // Set the label to the 'divisionName' property
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Zone"
                      error={formik.touched.zone && Boolean(formik.errors.zone)}
                      helperText={formik.touched.zone && formik.errors.zone}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>
                  Home Loction <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  id="address"
                  name="homeLocation"
                  size="small"
                  rows={2}
                  multiline
                  fullWidth
                  placeholder="201, Deepkamal mall 1, near Sarthana Nature Park, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat"
                  value={formik.values.homeLocation}
                  onChange={formik.handleChange}
                  error={formik.touched.homeLocation && Boolean(formik.errors.homeLocation)}
                  helperText={formik.touched.homeLocation && formik.errors.homeLocation}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>
                  Permanent Loction <span style={{ color: 'red' }}>*</span>
                </FormLabel>
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
                <FormLabel>
                  Zip/Postal Code <span style={{ color: 'red' }}>*</span>
                </FormLabel>
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
                      placeholder="Select Additional Division"
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
                <FormLabel>
                  Designation <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Autocomplete
                  disablePortal
                  name="designation"
                  options={designation}
                  fullWidth
                  size="small"
                  value={designation.find((item) => item.designation === formik.values.designation) || null}
                  onChange={(e, value) => formik.setFieldValue('designation', value ? value.designation : '')}
                  getOptionLabel={({ designation }) => designation}
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
                  name="assignedTo"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.assignedTo}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Employees"
                      error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                      helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Additional Supervisor</FormLabel>
                <Autocomplete
                  disablePortal
                  name="additionalSupervisor"
                  options={top100Films}
                  fullWidth
                  size="small"
                  value={formik.values.additionalSupervisor}
                  onChange={formik.handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Assigned To"
                      error={formik.touched.additionalSupervisor && Boolean(formik.errors.additionalSupervisor)}
                      helperText={formik.touched.additionalSupervisor && formik.errors.additionalSupervisor}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Joining</FormLabel>
                <TextField
                  name="Doj"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={params?.id ? dayjs(formik.values.Doj).format('YYYY-MM-DD') : formik.values.Doj}
                  onChange={formik.handleChange}
                  error={formik.touched.Doj && Boolean(formik.errors.Doj)}
                  helperText={formik.touched.Doj && formik.errors.Doj}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>End Probation Date</FormLabel>
                <TextField
                  name="endProbationDate"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={
                    params?.id
                      ? dayjs(formik.values.endProbationDate).format('YYYY-MM-DD')
                      : formik.values.endProbationDate
                  }
                  onChange={formik.handleChange}
                  error={formik.touched.endProbationDate && Boolean(formik.errors.endProbationDate)}
                  helperText={formik.touched.endProbationDate && formik.errors.endProbationDate}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>End Confirmation Date</FormLabel>
                <TextField
                  name="endConfirmationDate"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={
                    params?.id
                      ? dayjs(formik.values.endConfirmationDate).format('YYYY-MM-DD')
                      : formik.values.endConfirmationDate
                  }
                  onChange={formik.handleChange}
                  error={formik.touched.endConfirmationDate && Boolean(formik.errors.endConfirmationDate)}
                  helperText={formik.touched.endConfirmationDate && formik.errors.endConfirmationDate}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Daily Work Hours (In numbers) <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="dailyWorkHours"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Working Hours"
                  value={formik.values.dailyWorkHours}
                  onChange={formik.handleChange}
                  error={formik.touched.dailyWorkHours && Boolean(formik.errors.dailyWorkHours)}
                  helperText={formik.touched.dailyWorkHours && formik.errors.dailyWorkHours}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} alignItems="center" justifyContent="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.showAccompanied}
                      onChange={(e) => formik.setFieldValue('showAccompanied', e.target.checked)}
                      name="requiredCheckbox"
                    />
                  }
                  label="Show Accompanied"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Accompanied Employee</FormLabel>
                <TextField
                  name="accompaniedEmployee"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Enter Working Hours"
                  value={formik.values.accompaniedEmployee}
                  onChange={formik.handleChange}
                  error={formik.touched.accompaniedEmployee && Boolean(formik.errors.accompaniedEmployee)}
                  helperText={formik.touched.accompaniedEmployee && formik.errors.accompaniedEmployee}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Resignation</FormLabel>
                <TextField
                  name="dateOfResignation"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  value={
                    params?.id
                      ? dayjs(formik.values.dateOfResignation).format('YYYY-MM-DD')
                      : formik.values.dateOfResignation
                  }
                  onChange={formik.handleChange}
                  error={formik.touched.dateOfResignation && Boolean(formik.errors.dateOfResignation)}
                  helperText={formik.touched.dateOfResignation && formik.errors.dateOfResignation}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.showInTransit}
                      onChange={(e) => formik.setFieldValue('showInTransit', e.target.checked)}
                      name="showInTransit"
                    />
                  }
                  label="Show In Transit"
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
                <FormLabel>
                  Aadhar Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
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
                <FormLabel>
                  PAN Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
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
                <FormLabel>
                  PF Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
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
                <FormLabel>
                  ESIC Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
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
                <FormLabel>
                  PF UAN Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
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
                  getOptionLabel={(option) => option.label} // Specify the label property
                  fullWidth
                  size="small"
                  value={BloodGroup.find((option) => option.label === formik.values.bloodGroup)}
                  onChange={(e, value) => formik.setFieldValue('bloodGroup', value?.label || null)} // Set the label as the value
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
                  name="Language"
                  options={Language}
                  fullWidth
                  size="small"
                  value={Language.find((option) => option.label === formik.values.Language)}
                  onChange={(e, value) => formik.setFieldValue('Language', value?.label || null)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select your Language"
                      error={formik.touched.Language && Boolean(formik.errors.Language)}
                      helperText={formik.touched.Language && formik.errors.Language}
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
                  name="DA_HO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
                  value={formik.values.DA_HO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_HO && Boolean(formik.errors.DA_HO)}
                  helperText={formik.touched.DA_HO && formik.errors.DA_HO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_EX</FormLabel>
                <TextField
                  name="DA_EX"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
                  value={formik.values.DA_EX}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_EX && Boolean(formik.errors.DA_EX)}
                  helperText={formik.touched.DA_EX && formik.errors.DA_EX}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_OUT</FormLabel>
                <TextField
                  name="DA_OUT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
                  value={formik.values.DA_OUT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_OUT && Boolean(formik.errors.DA_OUT)}
                  helperText={formik.touched.DA_OUT && formik.errors.DA_OUT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_RHO</FormLabel>
                <TextField
                  name="DA_RHO"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
                  value={formik.values.DA_RHO}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_RHO && Boolean(formik.errors.DA_RHO)}
                  helperText={formik.touched.DA_RHO && formik.errors.DA_RHO}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_TRANSIT</FormLabel>
                <TextField
                  name="DA_TRANSIT"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
                  value={formik.values.DA_TRANSIT}
                  onChange={formik.handleChange}
                  error={formik.touched.DA_TRANSIT && Boolean(formik.errors.DA_TRANSIT)}
                  helperText={formik.touched.DA_TRANSIT && formik.errors.DA_TRANSIT}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>DA_OTHER</FormLabel>
                <TextField
                  name="DA_OTHER"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="0"
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
                <FormLabel>
                  Account Holder Name <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="accountHolderName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Account Holder Name"
                  value={formik.values.accountHolderName}
                  onChange={formik.handleChange}
                  error={formik.touched.accountHolderName && Boolean(formik.errors.accountHolderName)}
                  helperText={formik.touched.accountHolderName && formik.errors.accountHolderName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Account Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="accountNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Account Number"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                  helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  IFSC Number <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="IFSCNumber"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="IFSC Number"
                  value={formik.values.IFSCNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.IFSCNumber && Boolean(formik.errors.IFSCNumber)}
                  helperText={formik.touched.IFSCNumber && formik.errors.IFSCNumber}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Beneficiary ID </FormLabel>
                <TextField
                  name="beneficiaryID"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Beneficiary ID"
                  value={formik.values.beneficiaryID}
                  onChange={formik.handleChange}
                  error={formik.touched.beneficiaryID && Boolean(formik.errors.beneficiaryID)}
                  helperText={formik.touched.beneficiaryID && formik.errors.beneficiaryID}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Bank Name <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="bankName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Bank Name"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  error={formik.touched.bankName && Boolean(formik.errors.bankName)}
                  helperText={formik.touched.bankName && formik.errors.bankName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Branch Name <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="branchName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Branch Name"
                  value={formik.values.branchName}
                  onChange={formik.handleChange}
                  error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                  helperText={formik.touched.branchName && formik.errors.branchName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Nominee Name</FormLabel>
                <TextField
                  name="nomineeName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Nominee Name"
                  value={formik.values.nomineeName}
                  onChange={formik.handleChange}
                  error={formik.touched.nomineeName && Boolean(formik.errors.nomineeName)}
                  helperText={formik.touched.nomineeName && formik.errors.nomineeName}
                />
              </Grid>
            </Grid>

            <Divider />
            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'end'} style={{ marginTop: '15px' }}>
              <Stack direction={'row'} spacing={2}>
                <Button variant="contained" onClick={formik.handleSubmit}>
                  {params?.id ? 'Edit Employee' : 'Add Employee'}
                </Button>
                <Button variant="outlined" color="error">
                  Cancel
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
