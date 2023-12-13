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
import { Field, Formik, useFormik, Form } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Modal, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { MultiInputTimeRangeField, SingleInputTimeRangeField } from '@mui/x-date-pickers-pro';
// import GoogleMap from '../../../../pages/chemist/GoogleMap';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import GoogleMap from './GoogleMap';
import { apipost, apiput } from '../../../../service/api';
import { fetchDoctorData } from '../../../../redux/slice/GetDoctorSlice';

const Add = (props) => {
    const { isOpen, handleClose, fetchOpd, data, setUserAction } = props;


    const { id } = JSON.parse(localStorage.getItem('user'));
    const [findcity, setFindCity] = useState("");
    const [userLocation, setUserLocation] = useState({
        lat: null,
        lng: null,
    });
    const dispatch = useDispatch()

    // -----------  validationSchema
    const validationSchema = yup.object({
        // date: yup.string().required('Date is required'),
        // location: yup.string().required('Location is required'),
    });

    const initialValues = {
        startTime: '',
        endTime: '',
        clinicAddress: '',
        city: '',
        preferredDay: '',
        createdBy: id,
    };

    const addAddress = async (values) => {
        const payload = {
            doctorId: data?._id,
            doctorName: data?.doctorName,
            startTime: values.startTime,
            endTime: values.endTime,
            clinicAddress: values.clinicAddress,
            city: values.city,
            preferredDay: values.preferredDay,
            longitude: userLocation?.lat,
            latitude: userLocation?.lng
        }

        const result = await apipost('/api/clinicAddress', payload);
        setUserAction(result)
        if (result && result.status === 200) {
            formik.resetForm();
            handleClose();
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            addAddress(values);
        },
    });

    const onMapClicked = async (newLatLng) => {
        const latLng = newLatLng;

        try {
            const locationData = await getLocationData(latLng.lat, latLng.lng);
            console.log(locationData?.display_name, "locationData")
            formik.values.setFieldValue("clinicAddress", locationData?.display_name)
            const extractedCity = extractCityName(locationData);
            console.log(extractedCity, "LLLLLLLLLLLLLLLLLLLLLLLL");
            setFindCity(extractedCity);
        } catch (error) {
            console.error("Error fetching city:", error);
            setFindCity("City not found");
        }
    };

    const getLocationData = async (latitude, longitude) => {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
                params: {
                    format: "json",
                    lat: latitude,
                    lon: longitude,
                },
            }
        );
        console.log(response, "KKKKKKKKKKKKKKKKKKKK");
        return response.data;
    };

    const extractCityName = (locationData) => {
        // Extract the city name from the Nominatim response
        return (
            locationData.address?.city ||
            locationData.address?.town ||
            "City not found"
        );
    };

    const location = (e) => {
        setUserLocation({
            lat: e?.lat(),
            lng: e?.lng(),
        });
        const newLatLng = {
            lat: e?.lat(),
            lng: e?.lng(),
        };
        onMapClicked(newLatLng);
    };
    useEffect(() => {
        if (findcity) {
            formik.setFieldValue('city', findcity)
        }
    }, [findcity]);
    return (
        <div>
            <div>
                <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                    <DialogTitle
                        id="scroll-dialog-title"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6">Doctor Clinic Address</Typography>
                        <Typography>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                        </Typography>
                    </DialogTitle>

                    <DialogContent dividers >
                        <form>
                            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                    <Grid item xs={12} sm={12} md={12} >
                                        <FormLabel>Clinic Address</FormLabel>
                                        <TextField
                                            name="clinicAddress"
                                            size="small"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            value={formik.values.clinicAddress}
                                            onChange={formik.handleChange}
                                            error={formik.touched.clinicAddress && Boolean(formik.errors.clinicAddress)}
                                            helperText={formik.touched.clinicAddress && formik.errors.clinicAddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>City</FormLabel>
                                        <TextField
                                            id="city"
                                            name="city"
                                            label=""
                                            size="small"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            helperText={formik.touched.city && formik.errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>Preferred Day </FormLabel>
                                        <TextField
                                            id="preferredDay"
                                            name="preferredDay"
                                            label=""
                                            size="small"
                                            value={formik.values.preferredDay}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.preferredDay && Boolean(formik.errors.preferredDay)}
                                            helperText={formik.touched.preferredDay && formik.errors.preferredDay}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>Preferred Visit Time </FormLabel>
                                        <div style={{ display: "flex", width: "55%", justifyContent: "space-between" }} >
                                            <div>
                                                <TextField
                                                    id="startTime"
                                                    name="startTime"
                                                    label=""
                                                    size="small"
                                                    type="time"
                                                    value={formik.values.startTime}
                                                    onChange={formik.handleChange}
                                                    fullWidth

                                                    error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                                    helperText={formik.touched.startTime && formik.errors.startTime}
                                                />
                                            </div>
                                            <div style={{ marginTop: "5px" }}>-</div>
                                            <div >
                                                <TextField
                                                    id="endTime"
                                                    name="endTime"
                                                    label=""
                                                    size="small"
                                                    type="time"
                                                    value={formik.values.endTime}
                                                    onChange={formik.handleChange}
                                                    fullWidth
                                                    error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                                    helperText={formik.touched.endTime && formik.errors.endTime}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <GoogleMap
                                            location={location}
                                            stateLocation={{ lat: "", lng: "" }}
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
        </div>
    );
};

export default Add;
