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
import { Autocomplete, Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { apiget, apipost, addmeeting, getsingleuser, allusers } from '../../../service/api';

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
    const { isOpen, handleClose, fetchOpd } = props;

    const [doctorList, setDoctorList] = useState([]);
    const { id } = JSON.parse(localStorage.getItem('user'));

    // -----------  validationSchema
    const validationSchema = yup.object({
        zone: yup.string().required('Zone is required'),
        city: yup.string().required('City is required'),
        doctor: yup.string().required('Doctor is required'),
        employee: yup.string().required('Employee is required'),
        visitDate: yup.string().required('Visit Date is required'),
    });

    const initialValues = {
        doctorId: '',
        zone: '',
        city: '',
        doctor: '',
        employee: '',
        visitDate: '',
        createdBy: id,
    };


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
        },
    });

    const fetchDoctorList = async () => {
        const result = await apiget(`/api/doctor`);
        if (result && result.status === 200) {
          setDoctorList(result?.data);
        }
      };

    console.log(doctorList)
      useEffect(() => {
        fetchDoctorList();
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
                    <Typography variant="h6">Add Visits </Typography>
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
                                        disablePortal
                                        name="zone"
                                        options={top100Films}
                                        fullWidth
                                        size='small'
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                placeholder='Select Zone'
                                                error={formik.touched.zone && Boolean(formik.errors.zone)}
                                                helperText={formik.touched.zone && formik.errors.zone}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>City</FormLabel>
                                    <Autocomplete
                                        name="city"
                                        disablePortal
                                        options={top100Films}
                                        fullWidth
                                        size='small'
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                placeholder='Select City'
                                                error={formik.touched.city && Boolean(formik.errors.city)}
                                                helperText={formik.touched.city && formik.errors.city}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Doctor</FormLabel>
                                    <Autocomplete
                                        name="doctor"
                                        disablePortal
                                        options={doctorList}
                                        fullWidth
                                        getOptionLabel={(doctor) => doctor.doctorName}
                                        value={doctorList.find(doctor => doctor._id === formik.values.doctor) || null}
                                        onChange={(event, newValue) => {
                                          formik.setFieldValue("doctor", newValue ? newValue._id : "");
                                          formik.setFieldValue("doctorId", newValue ? newValue.doctorId : "");
                                        }}
                                        size='small'
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                placeholder='Select Doctor'
                                                error={formik.touched.doctor && Boolean(formik.errors.doctor)}
                                                helperText={formik.touched.doctor && formik.errors.doctor}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee</FormLabel>
                                    <Autocomplete
                                        name="employee"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={top100Films}
                                        fullWidth
                                        size='small'
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                placeholder='Select Employee'
                                                error={formik.touched.employee && Boolean(formik.errors.employee)}
                                                helperText={formik.touched.employee && formik.errors.employee}
                                            />}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Visit Date</FormLabel>
                                    <TextField
                                        name="visitDate"
                                        type='date'
                                        fullWidth
                                        size='small'
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
