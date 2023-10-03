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
import { allusers } from '../../service/api';


const View = (props) => {
    const { isOpenView, handleCloseView, opdData } = props;
    const [allUser, setAllUser] = useState([]);

    const { id } = JSON.parse(localStorage.getItem('user'));

    // -----------  validationSchema
    const validationSchema = yup.object({
        date: yup.string().required('Date is required'),
        location: yup.string().required('Location is required'),
    });

    const initialValues = {
        date: opdData?.date,
        location: opdData?.location,
        doctors:opdData?.doctors,
        notes: opdData?.notes,
        createdBy: id,
    };

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize:true,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
        },
    });

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function fetchdata() {
        const result = await allusers('/api/users');
        if (result && result.status === 200) {
            const filterRole = result.data.filter(user => user?.role === "Dr")
            const names = filterRole.map(user => {
                const firstName = capitalize(user?.firstName);
                const lastName = capitalize(user?.lastName);
                return `${firstName} ${lastName}`;
            });
            setAllUser(names)
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <div>
            <Dialog open={isOpenView} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">View Opd </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseView} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date</FormLabel>
                                    <TextField
                                        name="date"
                                        type={'datetime-local'}
                                        size="small"
                                        fullWidth
                                        value={dayjs(formik.values.date).format('YYYY-MM-DD HH:mm')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        helperText={formik.touched.date && formik.errors.date}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Location</FormLabel>
                                    <TextField
                                        id="location"
                                        name="location"
                                        label=""
                                        size="small"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Doctors</FormLabel>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            multiple
                                            size="small"
                                            value={formik.values.doctors}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue('doctors', newValue);
                                            }}
                                            options={allUser}
                                            getOptionLabel={(option) => option}
                                            disableCloseOnSelect
                                            style={{ textTransform: "capitalize" }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={formik.touched.doctors && Boolean(formik.errors.doctors)}
                                                    helperText={formik.touched.doctors && formik.errors.doctors}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Notes</FormLabel>
                                    <TextField
                                        id="notes"
                                        name="notes"
                                        label=""
                                        size="small"
                                        multiline
                                        rows={4}
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.notes && Boolean(formik.errors.notes)}
                                        helperText={formik.touched.notes && formik.errors.notes}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                {/* <DialogActions>
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
                            handleCloseView();
                        }}
                        color="error"
                    >
                        Cancle
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
};

export default View;
