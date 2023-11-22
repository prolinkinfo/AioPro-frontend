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
import { Autocomplete, Box, Chip, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
// import { apiget, apipost, addmeeting, getsingleuser, allusers } from '../../../service/api';

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

    const [allUser, setAllUser] = useState([]);
    const { id } = JSON.parse(localStorage.getItem('user'));

    // -----------  validationSchema
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        contactNumber: yup.string().required('Contact Number is required'),
        state: yup.string().required('State is required'),
        city: yup.string().required('City is required'),
        address: yup.string().required('Address is required'),
        division: yup.string().required('Division is required'),
        zone: yup.string().required('Zone is required'),
        email: yup.string().required('Email is required'),
        visitDate: yup.string().required('Visit Date is required'),
    });

    const initialValues = {
        adminType: '',
        name: '',
        contactNumber: '',
        state: '',
        city: '',
        address: '',
        division: '',
        zone: '',
        email: '',
        dcrEmail: '',
        alias: '',
        createdBy: id,
    };


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            resetForm();
            console.log(values)
        },
    });


    return (
        <div>
            <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    dividers
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="h6">Add Administrator </Typography>
                        <Typography>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                        </Typography>
                    </div>
                    <Divider />
                    <div style={{ textAlign: 'center', paddingTop: "15px" }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="adminType"
                                value={formik.values.adminType || 'zonal'}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="zonal" control={<Radio />} label="Zonal" />
                                <FormControlLabel value="divisional" control={<Radio />} label="Divisional" />
                                <FormControlLabel value="sales" control={<Radio />} label="Sales" />
                                <FormControlLabel value="hr" control={<Radio />} label="HR" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <form>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                {
                                    formik.values.adminType === "zonal" || formik.values.adminType === "" ?
                                        <>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>Name</FormLabel>
                                                <TextField
                                                    id="name"
                                                    name="name"
                                                    size="small"
                                                    maxRows={10}
                                                    fullWidth
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                                    helperText={formik.touched.name && formik.errors.name}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>Contact Number</FormLabel>
                                                <TextField
                                                    id="contactNumber"
                                                    name="contactNumber"
                                                    size="small"
                                                    maxRows={10}
                                                    fullWidth
                                                    value={formik.values.contactNumber}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                                    helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>State</FormLabel>
                                                <Autocomplete
                                                    disablePortal
                                                    name="state"
                                                    options={top100Films}
                                                    fullWidth
                                                    size='small'
                                                    value={formik.values.state}
                                                    onChange={formik.handleChange}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            placeholder='Select State'
                                                            error={formik.touched.state && Boolean(formik.errors.state)}
                                                            helperText={formik.touched.state && formik.errors.state}
                                                        />}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>City</FormLabel>
                                                <Autocomplete
                                                    disablePortal
                                                    name="city"
                                                    options={top100Films}
                                                    fullWidth
                                                    size='small'
                                                    value={formik.values.city}
                                                    onChange={formik.handleChange}
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
                                                <FormLabel>Address</FormLabel>
                                                <TextField
                                                    id="address"
                                                    name="address"
                                                    size="small"
                                                    rows={2}
                                                    multiline
                                                    fullWidth
                                                    value={formik.values.address}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                                    helperText={formik.touched.address && formik.errors.address}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>Division</FormLabel>
                                                <Autocomplete
                                                    disablePortal
                                                    name="division"
                                                    options={top100Films}
                                                    fullWidth
                                                    size='small'
                                                    value={formik.values.division}
                                                    onChange={formik.handleChange}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            placeholder='Select division'
                                                            error={formik.touched.division && Boolean(formik.errors.division)}
                                                            helperText={formik.touched.division && formik.errors.division}
                                                        />}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>Zone</FormLabel>
                                                <Autocomplete
                                                    disablePortal
                                                    name="zone"
                                                    options={top100Films}
                                                    fullWidth
                                                    size='small'
                                                    value={formik.values.zone}
                                                    onChange={formik.handleChange}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            placeholder='Select Zone'
                                                            error={formik.touched.zone && Boolean(formik.errors.zone)}
                                                            helperText={formik.touched.zone && formik.errors.zone}
                                                        />}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>Email</FormLabel>
                                                <TextField
                                                    id="email"
                                                    name="email"
                                                    size="small"
                                                    maxRows={10}
                                                    fullWidth
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                    helperText={formik.touched.email && formik.errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormLabel>DCR Email </FormLabel>
                                                <TextField
                                                    id="dcrEmail"
                                                    name="dcrEmail"
                                                    size="small"
                                                    maxRows={10}
                                                    fullWidth
                                                    value={formik.values.dcrEmail}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.dcrEmail && Boolean(formik.errors.dcrEmail)}
                                                    helperText={formik.touched.dcrEmail && formik.errors.dcrEmail}
                                                />
                                            </Grid>
                                        </>
                                        : formik.values.adminType === "divisional" ?
                                            <>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>Name</FormLabel>
                                                    <TextField
                                                        id="name"
                                                        name="name"
                                                        size="small"
                                                        maxRows={10}
                                                        fullWidth
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                                        helperText={formik.touched.name && formik.errors.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>Contact Number</FormLabel>
                                                    <TextField
                                                        id="contactNumber"
                                                        name="contactNumber"
                                                        size="small"
                                                        maxRows={10}
                                                        fullWidth
                                                        value={formik.values.contactNumber}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <FormLabel>Address</FormLabel>
                                                    <TextField
                                                        id="address"
                                                        name="address"
                                                        size="small"
                                                        rows={2}
                                                        multiline
                                                        fullWidth
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                                        helperText={formik.touched.address && formik.errors.address}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>Email</FormLabel>
                                                    <TextField
                                                        id="email"
                                                        name="email"
                                                        size="small"
                                                        maxRows={10}
                                                        fullWidth
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                                        helperText={formik.touched.email && formik.errors.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>DCR Email </FormLabel>
                                                    <TextField
                                                        id="dcrEmail"
                                                        name="dcrEmail"
                                                        size="small"
                                                        maxRows={10}
                                                        fullWidth
                                                        value={formik.values.dcrEmail}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.dcrEmail && Boolean(formik.errors.dcrEmail)}
                                                        helperText={formik.touched.dcrEmail && formik.errors.dcrEmail}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>Division</FormLabel>
                                                    <Autocomplete
                                                        disablePortal
                                                        name="division"
                                                        options={top100Films}
                                                        fullWidth
                                                        size='small'
                                                        value={formik.values.division}
                                                        onChange={formik.handleChange}
                                                        renderInput={(params) =>
                                                            <TextField
                                                                {...params}
                                                                placeholder='Select division'
                                                                error={formik.touched.division && Boolean(formik.errors.division)}
                                                                helperText={formik.touched.division && formik.errors.division}
                                                            />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <FormLabel>Alias</FormLabel>
                                                    <TextField
                                                        id="alias"
                                                        name="alias"
                                                        size="small"
                                                        maxRows={10}
                                                        fullWidth
                                                        value={formik.values.alias}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.alias && Boolean(formik.errors.alias)}
                                                        helperText={formik.touched.alias && formik.errors.alias}
                                                    />
                                                </Grid>
                                            </>
                                            :
                                            formik.values.adminType === "sales" ?
                                                <>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <FormLabel>Name</FormLabel>
                                                        <TextField
                                                            id="name"
                                                            name="name"
                                                            size="small"
                                                            maxRows={10}
                                                            fullWidth
                                                            value={formik.values.name}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                                            helperText={formik.touched.name && formik.errors.name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <FormLabel>Contact Number</FormLabel>
                                                        <TextField
                                                            id="contactNumber"
                                                            name="contactNumber"
                                                            size="small"
                                                            maxRows={10}
                                                            fullWidth
                                                            value={formik.values.contactNumber}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                                            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <FormLabel>Address</FormLabel>
                                                        <TextField
                                                            id="address"
                                                            name="address"
                                                            size="small"
                                                            rows={2}
                                                            multiline
                                                            fullWidth
                                                            value={formik.values.address}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                                            helperText={formik.touched.address && formik.errors.address}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <FormLabel>Zone</FormLabel>
                                                        <Autocomplete
                                                            disablePortal
                                                            name="zone"
                                                            options={top100Films}
                                                            fullWidth
                                                            size='small'
                                                            value={formik.values.zone}
                                                            onChange={formik.handleChange}
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
                                                        <FormLabel>Division</FormLabel>
                                                        <Autocomplete
                                                            disablePortal
                                                            name="division"
                                                            options={top100Films}
                                                            fullWidth
                                                            size='small'
                                                            value={formik.values.division}
                                                            onChange={formik.handleChange}
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    {...params}
                                                                    placeholder='Select division'
                                                                    error={formik.touched.division && Boolean(formik.errors.division)}
                                                                    helperText={formik.touched.division && formik.errors.division}
                                                                />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <FormLabel>Email</FormLabel>
                                                        <TextField
                                                            id="email"
                                                            name="email"
                                                            size="small"
                                                            maxRows={10}
                                                            fullWidth
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                                            helperText={formik.touched.email && formik.errors.email}
                                                        />
                                                    </Grid>
                                                </> : formik.values.adminType === "hr" ?
                                                    <>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <FormLabel>Name</FormLabel>
                                                            <TextField
                                                                id="name"
                                                                name="name"
                                                                size="small"
                                                                maxRows={10}
                                                                fullWidth
                                                                value={formik.values.name}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                                helperText={formik.touched.name && formik.errors.name}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <FormLabel>Contact Number</FormLabel>
                                                            <TextField
                                                                id="contactNumber"
                                                                name="contactNumber"
                                                                size="small"
                                                                maxRows={10}
                                                                fullWidth
                                                                value={formik.values.contactNumber}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                                                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12}>
                                                            <FormLabel>Address</FormLabel>
                                                            <TextField
                                                                id="address"
                                                                name="address"
                                                                size="small"
                                                                rows={2}
                                                                multiline
                                                                fullWidth
                                                                value={formik.values.address}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                                helperText={formik.touched.address && formik.errors.address}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <FormLabel>Email</FormLabel>
                                                            <TextField
                                                                id="email"
                                                                name="email"
                                                                size="small"
                                                                maxRows={10}
                                                                fullWidth
                                                                value={formik.values.email}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                                helperText={formik.touched.email && formik.errors.email}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <FormLabel>Alias</FormLabel>
                                                            <TextField
                                                                id="alias"
                                                                name="alias"
                                                                size="small"
                                                                maxRows={10}
                                                                fullWidth
                                                                value={formik.values.alias}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.alias && Boolean(formik.errors.alias)}
                                                                helperText={formik.touched.alias && formik.errors.alias}
                                                            />
                                                        </Grid>
                                                    </> : ''
                                }

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
