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
import { useDispatch, useSelector } from 'react-redux';
import { apipost, apiput } from '../../../service/api';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';



const Edit = (props) => {
    const { isOpenEdit, handleCloseEdit, fetchHolidayCalendarData, data } = props;

    const { id } = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch()
    const zoneList = useSelector((state) => state?.getZone?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        // zone: yup.string().required('Zone is required'),
        holidayDate: yup.string().required('Holiday Date is required'),
        holidayName: yup.string().required('Holiday Name is required'),
    });

    const initialValues = {
        zone: data?.zone,
        holidayDate: data?.holidayDate,
        holidayName: data?.holidayName,
        createdBy: id,
    };


    const editHoliday = async (values) => {
        const pyload = {
            _id: data?._id,
            zone: values.zone,
            holidayDate: values.holidayDate,
            holidayName: values.holidayName,
            createdBy: values.createdBy
        }
        const result = await apiput('/api/holidaycalendar', pyload)
        if (result && result.status === 200) {
            handleCloseEdit()
            dispatch(fetchHolidayCalendarData());

        }
    }


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            editHoliday(values)
        },
    });

    useEffect(() => {
        dispatch(fetchZoneData());
    }, [])

    return (
        <div>
            <Dialog open={isOpenEdit} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Edit Holiday </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
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
                                        }}
                                        fullWidth
                                        disabled
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
                                    <FormLabel>Holiday Date</FormLabel>
                                    <TextField
                                        id="holidayDate"
                                        name="holidayDate"
                                        disabled
                                        type='date'
                                        size="small"
                                        value={dayjs(formik.values.holidayDate).format("YYYY-MM-DD")}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.holidayDate && Boolean(formik.errors.holidayDate)}
                                        helperText={formik.touched.holidayDate && formik.errors.holidayDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Holiday Name</FormLabel>
                                    <TextField
                                        id="holidayName"
                                        name="holidayName"
                                        label=""
                                        size="small"
                                        value={formik.values.holidayName}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.holidayName && Boolean(formik.errors.holidayName)}
                                        helperText={formik.touched.holidayName && formik.errors.holidayName}
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
                            handleCloseEdit();
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

export default Edit;
