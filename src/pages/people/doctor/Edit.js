import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Card, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Iconify from '../../../components/iconify'
import ClinicAddress from './clinicAddress';
import { apiget, apiput } from '../../../service/api';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchQualificationData } from '../../../redux/slice/GetQualificationSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchStateData } from '../../../redux/slice/GetStateSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const Edit = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase(); const navigate = useNavigate()
    const [specialityList, setSpecialityList] = useState([]);
    const [data, setData] = useState({});
    const dispatch = useDispatch()
    const cityData = useSelector((state) => state?.getCity?.data)
    const stateData = useSelector((state) => state?.getState?.data)
    const doctorSpeciality = useSelector((state) => state?.getDoctorSpeciality?.data)
    const zoneList = useSelector((state) => state?.getZone?.data)
    const divisionList = useSelector((state) => state?.getDivision?.data)
    const qualificationList = useSelector((state) => state?.getQualification?.data)
    const typeList = useSelector((state) => state?.getType?.data)
    const doctorCategoryList = useSelector((state) => state?.getDoctorCategory?.data)
    const employeeList = useSelector((state) => state?.getEmployee?.data)
    const [cityList, setCityList] = useState([]);
    const [addressList, setAddressList] = useState([])
    const [userAction, setUserAction] = useState(null)


    useEffect(() => {
        if (doctorSpeciality) {
            const filteredArray = doctorSpeciality.map(item => item.specialityName);
            setSpecialityList(filteredArray);
        }
    }, [doctorSpeciality]);
    const params = useParams();

    // -----------  validationSchema
    const validationSchema = yup.object({
        doctorName: yup.string().required('Doctor Name is required'),
        email: yup.string().email(),
        contactNumber: yup.string().matches(/^[0-9]{10}$/, 'Contact Number must be 10 digits'),
        pincode: yup.string().matches(/^\d{6}$/, 'Pin code must be exactly 6 digits'),
        state: yup.string().required('State is required'),
        city: yup.string().required('City is required'),
        division: yup.string().required('Division is required'),
        zone: yup.string().required('Zone is required'),
        assignedTo: yup.string().required('Assigned To is required'),
    });

    const initialValues = {
        doctorName: data?.doctorName,
        hospitalName: data?.hospitalName,
        gender: data?.gender,
        contactNumber: data?.contactNumber,
        email: data?.email,
        dateOfBirth: data?.dateOfBirth,
        maritalStatus: data?.maritalStatus,
        anniversaryDate: data?.anniversaryDate,
        qualification: data?.qualification,
        state: data?.addressInformation?.state,
        city: data?.addressInformation?.city,
        division: data?.addressInformation?.division,
        zone: data?.addressInformation?.zone,
        pincode: data?.addressInformation?.pincode,
        speciality: data?.workInformation?.speciality,
        type: data?.workInformation?.type,
        category: data?.workInformation?.category,
        approximatedBusiness: data?.workInformation?.approximatedBusiness,
        assignedTo: data?.workInformation?.assignedTo,
        firmName: data?.workInformation?.firmName,
        registrationNumber: data?.registrationNumber,
        countryName: data?.countryName,
        // createdBy: id,
    };


    const editDoctor = async (values) => {
        const payload = {
            _id: data?._id,
            doctorName: values.doctorName,
            hospitalName: values.hospitalName,
            gender: values.gender,
            contactNumber: values.contactNumber,
            email: values.email,
            dateOfBirth: values.dateOfBirth,
            maritalStatus: values.maritalStatus,
            anniversaryDate: values.anniversaryDate,
            qualification: values.qualification,
            registrationNumber: values.registrationNumber,
            addressInformation: {
                state: values.state,
                city: values.city,
                division: values.division,
                zone: values.zone,
                pincode: values.pincode,
                countryName: values.countryName,
            },
            workInformation: {
                speciality: values.speciality,
                type: values.type,
                category: values.category,
                approximatedBusiness: values.approximatedBusiness,
                assignedTo: values.assignedTo,
                firmName: values.firmName,
            }
        }

        const result = await apiput('/api/doctor', payload);

        if (result && result.status === 200) {
            formik.resetForm();
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            editDoctor(values)
        },
    });

    const fetchCityDatas = async (stateName) => {
        const filtered = cityData?.filter((city) => city?.stateName?.toLowerCase() === stateName?.toLowerCase())
        setCityList(stateName?.length > 0 ? (filtered?.length > 0 ? filtered : []) : cityData);
    };

    const fetchDoctorData = async (e) => {
        const result = await apiget(`/api/doctor/${params?.id}`);
        if (result && result.status === 200) {
            setData(result?.data?.result && result?.data?.result[0])
            setAddressList(result?.data?.result && result?.data?.result[0]?.clinicAddress)
        }
    };


    useEffect(() => {
        fetchDoctorData();
        dispatch(fetchCityData());
        dispatch(fetchDoctorSpecialityData());
        dispatch(fetchZoneData());
        dispatch(fetchDivisionData());
        dispatch(fetchQualificationData());
        dispatch(fetchTypeData());
        dispatch(fetchStateData());
        dispatch(fetchCategoryData());
        dispatch(fetchEmployeeData());
    }, [userAction]);

    useEffect(() => {
        fetchCityDatas()
    }, [cityData]);


    const back = () => {
        navigate(`/${userRole}/dashboard/people/doctor`)
    }

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Update Doctor</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={back}>
                            Back
                        </Button>
                    </Stack>
                </Stack>
                <Box width="100%" pt={3}>
                    <Card style={{ padding: '20px 50px 20px 50px' }}>
                        <Typography variant='h4'>Basic Information</Typography>
                        <Divider />
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Doctor Name</FormLabel>
                                <TextField
                                    id="doctorName"
                                    name="doctorName"
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Doctor Name'
                                    fullWidth
                                    value={formik.values.doctorName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.doctorName && Boolean(formik.errors.doctorName)}
                                    helperText={formik.touched.doctorName && formik.errors.doctorName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Hospital Name</FormLabel>
                                <TextField
                                    id="hospitalName"
                                    name="hospitalName"
                                    size="small"
                                    placeholder='Enter Hospital Name'
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.hospitalName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.hospitalName && Boolean(formik.errors.hospitalName)}
                                    helperText={formik.touched.hospitalName && formik.errors.hospitalName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        value={formik.values.gender || null}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="other"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Contact Number</FormLabel>
                                <TextField
                                    id="contactNumber"
                                    name="contactNumber"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    placeholder='Enter Contact Number'
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
                                    placeholder='Enter Email'
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Date Of Birth</FormLabel>
                                <TextField
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    size="small"
                                    type='date'
                                    maxRows={10}
                                    fullWidth
                                    value={dayjs(formik.values.dateOfBirth).format("YYYY-MM-DD")}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Marital Status</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name='maritalStatus'
                                        placeholder='Select Marital Status'
                                        value={formik.values.maritalStatus || null}
                                        onChange={formik.handleChange}
                                        error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
                                        helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
                                    >
                                        <MenuItem value={"married"}>Married</MenuItem>
                                        <MenuItem value={"single"}>Single</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Anniversary</FormLabel>
                                <TextField
                                    id="anniversaryDate"
                                    name="anniversaryDate"
                                    size="small"
                                    type='date'
                                    maxRows={10}
                                    fullWidth
                                    value={dayjs(formik.values.anniversaryDate).format("YYYY-MM-DD")}
                                    onChange={formik.handleChange}
                                    error={formik.touched.anniversaryDate && Boolean(formik.errors.anniversaryDate)}
                                    helperText={formik.touched.anniversaryDate && formik.errors.anniversaryDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Qualification</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('qualification', newValue ? newValue.qualification : "");
                                        }}
                                        fullWidth
                                        options={qualificationList}
                                        value={qualificationList.find(qualification => qualification.qualification === formik.values.qualification) || null}
                                        getOptionLabel={(qualification) => qualification?.qualification}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Qualification'
                                                error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                                                helperText={formik.touched.qualification && formik.errors.qualification}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Typography variant='h4' mt={4}>Address Information</Typography>
                        <Divider />
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>State</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('state', newValue ? newValue.stateName : "");
                                        formik.setFieldValue('countryName', newValue ? newValue.countryName : "");
                                        fetchCityDatas(newValue ? newValue.stateName : "");
                                    }}
                                    fullWidth
                                    options={stateData}
                                    value={stateData.find(state => state.stateName === formik.values.state) || null}
                                    getOptionLabel={(state) => state?.stateName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select State'
                                            error={formik.touched.state && Boolean(formik.errors.state)}
                                            helperText={formik.touched.state && formik.errors.state}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>City</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('city', newValue ? newValue.cityName : "");
                                    }}
                                    fullWidth
                                    options={cityList}
                                    value={cityList.find(city => city.cityName === formik.values.city) || null}
                                    getOptionLabel={(city) => city?.cityName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select City'
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
                                        formik.setFieldValue('division', newValue ? newValue.divisionName : "");
                                    }}
                                    fullWidth
                                    options={divisionList}
                                    value={divisionList.find(division => division.divisionName === formik.values.division) || null}
                                    getOptionLabel={(division) => division?.divisionName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Division'
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
                                        formik.setFieldValue('zone', newValue ? newValue.zoneName : "");
                                    }}
                                    fullWidth
                                    options={zoneList}
                                    value={zoneList.find(zone => zone.zoneName === formik.values.zone) || null}
                                    getOptionLabel={(zone) => zone?.zoneName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Zone'
                                            error={formik.touched.zone && Boolean(formik.errors.zone)}
                                            helperText={formik.touched.zone && formik.errors.zone}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Pincode</FormLabel>
                                <TextField
                                    id="pincode"
                                    name="pincode"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    placeholder='Fill Area Pincode'
                                    value={formik.values.pincode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                    helperText={formik.touched.pincode && formik.errors.pincode}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='h4' mt={4}>Work Information</Typography>
                        <Divider />
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Speciality</FormLabel>
                                <Autocomplete
                                    multiple
                                    size="small"
                                    onChange={(event, newValue) => {
                                        // Ensure newValue is not null before accessing properties
                                        formik.setFieldValue('speciality', newValue || "");
                                    }}
                                    fullWidth
                                    options={specialityList || []}
                                    value={formik.values.speciality}
                                    getOptionLabel={(speciality) => speciality}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Speciality'
                                            error={formik.touched.speciality && Boolean(formik.errors.speciality)}
                                            helperText={formik.touched.speciality && formik.errors.speciality}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Type</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('type', newValue ? newValue.typeName : "");
                                    }}
                                    fullWidth
                                    options={typeList}
                                    value={typeList.find(type => type.typeName === formik.values.type) || null}
                                    getOptionLabel={(type) => type?.typeName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Type'
                                            error={formik.touched.type && Boolean(formik.errors.type)}
                                            helperText={formik.touched.type && formik.errors.type}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Category</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('category', newValue ? newValue.categoryName
                                            : "");
                                    }}
                                    fullWidth
                                    options={doctorCategoryList}
                                    value={doctorCategoryList.find(categoryType => categoryType.categoryName === formik.values.category) || null}
                                    getOptionLabel={(categoryType) => categoryType?.categoryName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Category'
                                            error={formik.touched.category && Boolean(formik.errors.category)}
                                            helperText={formik.touched.category && formik.errors.category}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Approximated Business</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name="approximatedBusiness"
                                        placeholder='Select Marital Status'
                                        value={formik.values.approximatedBusiness || null}
                                        onChange={formik.handleChange}
                                        error={formik.touched.approximatedBusiness && Boolean(formik.errors.approximatedBusiness)}
                                        helperText={formik.touched.approximatedBusiness && formik.errors.approximatedBusiness}
                                    >
                                        <MenuItem value={"0-5000"}>0-5000</MenuItem>
                                        <MenuItem value={"5000-10000"}>5000-10000</MenuItem>
                                        <MenuItem value={"10000-20000"}>10000-20000</MenuItem>
                                        <MenuItem value={"10000-25000"}>10000-25000</MenuItem>
                                        <MenuItem value={"25000-50000"}>25000-50000</MenuItem>
                                        <MenuItem value={"50000-75000"}>50000-75000</MenuItem>
                                        <MenuItem value={"75000-100000"}>75000-100000</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Assigned To</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('assignedTo', newValue ? `${newValue?.basicInformation?.firstName}${newValue?.basicInformation?.surname}`
                                            : "");
                                    }}
                                    fullWidth
                                    options={employeeList}
                                    value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.assignedTo) || null}
                                    getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Assigned To'
                                            error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                                            helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <FormLabel>Firm Name</FormLabel>
                                <TextField
                                    id="firmName"
                                    name="firmName"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    placeholder='Select Firm Name'
                                    value={formik.values.firmName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                                    helperText={formik.touched.firmName && formik.errors.firmName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} mb={2}>
                                <FormLabel>Registration Number</FormLabel>
                                <TextField
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    placeholder='Enter Registration Number'
                                    value={formik.values.registrationNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                                    helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                                />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={formik.handleSubmit}>Add Doctor</Button>
                                    <Button variant='outlined' color='error'>Cancle</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card style={{ marginTop: "30px" }}>
                        <ClinicAddress data={data} clinicAddress={addressList} setUserAction={setUserAction} />
                    </Card>
                </Box>
            </Container>
        </div>
    )
}

export default Edit
