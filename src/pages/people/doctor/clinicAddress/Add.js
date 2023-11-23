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
// import GoogleMap from '../../../../pages/chemist/GoogleMap';

const Add = (props) => {
    const { isOpen, handleClose, fetchOpd } = props;

    const { id } = JSON.parse(localStorage.getItem('user'));

    // -----------  validationSchema
    const validationSchema = yup.object({
        date: yup.string().required('Date is required'),
        location: yup.string().required('Location is required'),
    });

    const initialValues = {
        date: '',
        location: '',
        doctors: [],
        notes: '',
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
                    <Typography variant="h6">Doctor Clinic Address</Typography>
                    <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
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
                                {/* <Grid item xs={12} sm={12} md={12}>
                                    <GoogleMap />
                                </Grid> */}


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
