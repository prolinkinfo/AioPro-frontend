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
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchModeOfTravelData } from '../../../redux/slice/GetModeOfTravelSlice';


const Add = (props) => {
    const { isOpen, handleClose, fetchDoctorVisitData } = props;

    const { id } = JSON.parse(localStorage.getItem('user'));
    const [employeeList, setEmployeeList] = useState([])
    const dispatch = useDispatch()
    const modeList = useSelector((state) => state?.getModeOfTravel?.data);
    const zoneList = useSelector((state) => state?.getZone?.data)
    const divisionList = useSelector((state) => state?.getDivision?.data);
    const employeeData = useSelector((state) => state?.getEmployee?.data)


    // -----------  validationSchema
    const validationSchema = yup.object({
        routeName: yup.string().required('Route Name is required'),
        mode: yup.string().required('Mode of Transport is required'),
        distance: yup.string().required('Distance in KM is required'),
        fare: yup.string().required('Fare is required'),
        zone: yup.string().required('Zone is required'),
        division: yup.string().required('Division is required'),
    });

    const initialValues = {
        routeName: '',
        citiesInRoute: '',
        mode: '',
        designation: '',
        distance: '',
        ratePerKM: '',
        fare: '',
        zone: '',
        division: '',
        employee: '',
        createdBy: id,
    };

    const add = async (values) => {
        const payload = {
            routeName: values?.routeName,
            citiesInRoute: values?.citiesInRoute,
            mode: values?.mode,
            designation: values?.designation,
            distance: values?.distance,
            ratePerKM: values?.ratePerKM,
            fare: values?.fare,
            zone: values?.zone,
            division: values?.division,
            employee: values?.employee,
            createdBy: values?.createdBy,
        }

        // const result = await apipost('/api/doctorvisit', payload);

        // if (result && result.status === 200) {
        //     formik.resetForm();
        //     handleClose();
        //     dispatch(fetchDoctorVisitData());

        // }
    }


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            add(values)
        },
    });

    const fetchEmployee = (divisionName) => {
        const filtered = employeeData?.filter((employee) => employee?.contactInformation?.division?.toLowerCase() === divisionName?.toLowerCase())
        setEmployeeList(filtered);
    }

    useEffect(() => {
        dispatch(fetchModeOfTravelData());
        dispatch(fetchZoneData());
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
                    <Typography variant="h6">Add</Typography>
                    <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Route Name</FormLabel>
                                    <TextField
                                        name="routeName"
                                        fullWidth
                                        size='small'
                                        placeholder='Enter Route Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.routeName}
                                        error={formik.touched.routeName && Boolean(formik.errors.routeName)}
                                        helperText={formik.touched.routeName && formik.errors.routeName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Cities In Route</FormLabel>
                                    <TextField
                                        name="citiesInRoute"
                                        fullWidth
                                        size='small'
                                        placeholder='Enter Cities Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.citiesInRoute}
                                        error={formik.touched.citiesInRoute && Boolean(formik.errors.citiesInRoute)}
                                        helperText={formik.touched.citiesInRoute && formik.errors.citiesInRoute}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Mode of Transport</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('mode', newValue ? newValue.mode : "");
                                        }}
                                        fullWidth
                                        options={modeList?.filter((item) => item?.status === "active")}
                                        value={modeList.find(mode => mode?.mode === formik.values.mode) || null}
                                        getOptionLabel={(mode) => mode?.mode}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Mode'
                                                error={formik.touched.mode && Boolean(formik.errors.mode)}
                                                helperText={formik.touched.mode && formik.errors.mode}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Designation</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('designation', newValue ? newValue.mode : "");
                                        }}
                                        fullWidth
                                        options={modeList}
                                        value={modeList.find(mode => mode?.mode === formik.values.designation) || null}
                                        getOptionLabel={(mode) => mode?.zoneName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Designation'
                                                error={formik.touched.designation && Boolean(formik.errors.designation)}
                                                helperText={formik.touched.designation && formik.errors.designation}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Distance in KM</FormLabel>
                                    <TextField
                                        name="distance"
                                        fullWidth
                                        size='small'
                                        type='number'
                                        placeholder='Enter Distance'
                                        onChange={formik.handleChange}
                                        value={formik.values.distance}
                                        error={formik.touched.distance && Boolean(formik.errors.distance)}
                                        helperText={formik.touched.distance && formik.errors.distance}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Rate Per KM</FormLabel>
                                    <TextField
                                        name="ratePerKM"
                                        fullWidth
                                        size='small'
                                        type='number'
                                        placeholder='Enter Rate Per KM'
                                        onChange={formik.handleChange}
                                        value={formik.values.ratePerKM}
                                        error={formik.touched.ratePerKM && Boolean(formik.errors.ratePerKM)}
                                        helperText={formik.touched.ratePerKM && formik.errors.ratePerKM}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Fare</FormLabel>
                                    <TextField
                                        name="fare"
                                        fullWidth
                                        size='small'
                                        placeholder='Enter Fare'
                                        type='number'
                                        onChange={formik.handleChange}
                                        value={formik.values.fare}
                                        error={formik.touched.fare && Boolean(formik.errors.fare)}
                                        helperText={formik.touched.fare && formik.errors.fare}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Division</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('division', newValue ? newValue.divisionName : "");
                                            fetchEmployee(newValue ?newValue.divisionName : "")
                                        }}
                                        fullWidth
                                        options={divisionList}
                                        value={divisionList.find(division => division?.divisionName === formik.values.division) || null}
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee</FormLabel>
                                    <Autocomplete
                                        disablePortal
                                        name="employee"
                                        id="combo-box-demo"
                                        onChange={(event, newValue) =>
                                            formik.setFieldValue("employee", newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : "")
                                        }
                                        options={employeeList}
                                        value={employeeList.find((employee) => `${employee?.basicInformation?.firstName}${employee?.basicInformation?.surname}` === formik.values.employee) || null}
                                        getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                        size="small"
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Select Employee" style={{ fontSize: '12px' }} />
                                        )}
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

export default Add;
