/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Autocomplete, FormLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../../service/api';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchDoctorData } from '../../../redux/slice/GetDoctorSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]

const AddVisit = (props) => {
    const { isOpen, handleClose, fetchDoctorVisitData } = props;

    const { id } = JSON.parse(localStorage.getItem('user'));
    const [doctorList, setDoctorList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const dispatch = useDispatch()
    const zoneList = useSelector((state) => state?.getZone?.data)
    const cityList = useSelector((state) => state?.getCity?.data)
    const doctorData = useSelector((state) => state?.getDoctor?.data)
    const employeeData = useSelector((state) => state?.getEmployee?.data)


    // -----------  validationSchema
    const validationSchema = yup.object({
        zone: yup.string().required('Zone is required'),
        // city: yup.string().required('City is required'),
        // doctor: yup.string().required('Doctor is required'),
        // employee: yup.string().required('Employee is required'),
        // visitDate: yup.string().required('Visit Date is required'),
    });

    const initialValues = {
        zone: '',
        city: '',
        doctorId: '',
        clinicAddress: '',
        doctor: '',
        employee: '',
        visitDate: '',
        createdBy: id,
        visitBy:''
    };

    const addVisit = async (values) => {
        const payload = {
            zoneName: values?.zone,
            cityName: values?.city,
            doctorId: values?.doctorId,
            clinicAddress: values?.clinicAddress,
            doctorName: values?.doctor,
            employeeName: values?.employee,
            visitDate: values?.visitDate,
            visitBy:values?.visitBy
        }

        const result = await apipost('/api/doctorvisit', payload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleClose();
            dispatch(fetchDoctorVisitData());

        }
    }


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            addVisit(values)
        },
    });

    const fetchDoctor = (zoneName) => {
        const filtered = doctorData?.filter((doctor) => doctor?.addressInformation?.zone?.toLowerCase() === zoneName?.toLowerCase())
        setDoctorList(filtered);
    }
    const fetchEmployee = (zoneName) => {
        const filtered = employeeData?.filter((employee) => employee?.contactInformation?.zone?.toLowerCase() === zoneName?.toLowerCase())
        setEmployeeList(filtered);
    }

    useEffect(() => {
        dispatch(fetchDoctorData());
        dispatch(fetchZoneData());
        dispatch(fetchCityData());
        dispatch(fetchEmployeeData());
    }, []);

    return (
        <div>
            <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Add Visits</Typography>
                    <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Zone</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('zone', newValue ? newValue.zoneName : "");
                                            fetchDoctor(newValue ? newValue.zoneName : "")
                                            fetchEmployee(newValue ? newValue.zoneName : "")
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
                                <Grid item xs={12} sm={12} md={12}>
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Doctor</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('doctor', newValue ? newValue?.doctorName : "");
                                            formik.setFieldValue('doctorId', newValue ? newValue?.doctorId : "");
                                            formik.setFieldValue('visitBy', newValue ? newValue?._id : "");
                                            formik.setFieldValue('clinicAddress', newValue && newValue?.clinicAddress?.length > 0 && newValue?.clinicAddress[0]?.clinicAddress);
                                        }}
                                        fullWidth
                                        options={doctorList}
                                        value={doctorList.find(doctor => doctor?.doctorName === formik?.values?.doctor) || null}
                                        getOptionLabel={(doctor) => doctor?.doctorName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Doctor'
                                                error={formik.touched.doctor && Boolean(formik.errors.doctor)}
                                                helperText={formik.touched.doctor && formik.errors.doctor}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('employee', newValue ? newValue?.basicInformation?.employeesName : "");
                                        }}
                                        fullWidth
                                        options={employeeList}
                                        value={employeeList.find(employee => employee?.basicInformation?.employeesName === formik?.values?.employee) || null}
                                        getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Employee'
                                                error={formik.touched.employee && Boolean(formik.errors.employee)}
                                                helperText={formik.touched.employee && formik.errors.employee}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Visit Date</FormLabel>
                                    <TextField
                                        name="visitDate"
                                        type='date'
                                        fullWidth
                                        size='small'
                                        onChange={formik.handleChange}
                                        value={formik.values.visitDate}
                                        error={formik.touched.visitDate && Boolean(formik.errors.visitDate)}
                                        helperText={formik.touched.visitDate && formik.errors.visitDate}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: 'capitalize' }}
                        color="secondary"
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            formik.resetForm();
                            handleClose();
                        }}
                        color="error"
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddVisit;
