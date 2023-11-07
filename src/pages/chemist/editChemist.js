/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Dialog, Button, Avatar, Box, FormLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { allusers, apiget, apipost, apiput } from '../../service/api';
import GoogleMap from './GoogleMap';

const EditChemist = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, handleClose, chemistData } = props;
  const [tab, setTab] = useState(1);
  const [userLocation, setUserLocation] = useState({});
  //   const [chemistData, setChemistData] = useState({});

  // -----------  validationSchema
  const validationSchema = yup.object({
    doctorName: yup.string().required('Doctor Name is required'),
    doctorMslNumber: yup.string().required('Doctor Msl Number is required'),
    shopName: yup.string().required('Shop Name is required'),
    chemistContactNumber: yup
      .string()
      .matches(/^\d{10}$/, 'Chemist Contact Number must be exactly 10 digits')
      .required('Chemist Contact Number is required'),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
      .required('Pincode is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    chemistArea: yup.string().required('Chemist Area is required'),
    chemistAddress: yup.string().required('Chemist Address is required'),
    chemistLandMark: yup.string().required('Chemist Landmark  is required'),
    contactPersonName: yup.string().required('Contact Person Name is required'),
    contactPersonNumber: yup
      .string()
      .matches(/^\d{10}$/, 'Contact Person Number must be exactly 10 digits')
      .required('Contact Person Number is required'),
  });

  // -----------   initialValues
  const initialValues = {
    doctorName: chemistData?.doctorName,
    doctorMslNumber: chemistData?.doctorMslNumber,
    shopName: chemistData?.shopName,
    chemistContactNumber: chemistData?.chemistContactNumber,
    pincode: chemistData?.pincode,
    state: chemistData?.state,
    city: chemistData?.city,
    chemistArea: chemistData?.chemistArea,
    chemistAddress: chemistData?.chemistAddress,
    chemistLandMark: chemistData?.chemistLandMark,
    contactPersonName: chemistData?.contactPersonName,
    contactPersonNumber: chemistData?.contactPersonNumber,
  };

  // add user api

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setTab(2);
    },
  });

  const onSave = async () => {
    const data = {
      ...chemistData,
      lat: userLocation?.lat,
      lng: userLocation?.lng,
    };

    const result = await apiput(`/api/chemist`, data);
    if (result && result.status === 200) {
      handleClose();
      setTab(1);
    }
  };

  const handleCloseModel = () => {
    handleClose();
    setTab(1);
  };

  const LocationGet = (e) => {
    setUserLocation({ lat: e?.lat() || chemistData?.lat, lng: e?.lng() || chemistData?.lat });
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ overflow: 'hidden' }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {tab === 1 ? (
            <form>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Doctor Name</FormLabel>
                  <TextField
                    name="doctorName"
                    label=""
                    size="small"
                    value={formik.values.doctorName}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.doctorName && Boolean(formik.errors.doctorName)}
                    helperText={formik.touched.doctorName && formik.errors.doctorName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Doctor Msl Number</FormLabel>
                  <TextField
                    name="doctorMslNumber"
                    label=""
                    size="small"
                    value={formik.values.doctorMslNumber}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.doctorMslNumber && Boolean(formik.errors.doctorMslNumber)}
                    helperText={formik.touched.doctorMslNumber && formik.errors.doctorMslNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Shop Name</FormLabel>
                  <TextField
                    name="shopName"
                    label=""
                    size="small"
                    value={formik.values.shopName}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.shopName && Boolean(formik.errors.shopName)}
                    helperText={formik.touched.shopName && formik.errors.shopName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Chemist Contact Number</FormLabel>
                  <TextField
                    name="chemistContactNumber"
                    label=""
                    size="small"
                    type="number"
                    value={formik.values.chemistContactNumber}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.chemistContactNumber && Boolean(formik.errors.chemistContactNumber)}
                    helperText={formik.touched.chemistContactNumber && formik.errors.chemistContactNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Pincode</FormLabel>
                  <TextField
                    name="pincode"
                    label=""
                    size="small"
                    type="number"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                    helperText={formik.touched.pincode && formik.errors.pincode}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>State</FormLabel>
                  <TextField
                    name="state"
                    label=""
                    size="small"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>City</FormLabel>
                  <TextField
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
                  <FormLabel>Chemist Area</FormLabel>
                  <TextField
                    name="chemistArea"
                    label=""
                    size="small"
                    value={formik.values.chemistArea}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.chemistArea && Boolean(formik.errors.chemistArea)}
                    helperText={formik.touched.chemistArea && formik.errors.chemistArea}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Chemist Address</FormLabel>
                  <TextField
                    name="chemistAddress"
                    label=""
                    size="small"
                    value={formik.values.chemistAddress}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.chemistAddress && Boolean(formik.errors.chemistAddress)}
                    helperText={formik.touched.chemistAddress && formik.errors.chemistAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Chemist LandMark</FormLabel>
                  <TextField
                    name="chemistLandMark"
                    label=""
                    size="small"
                    value={formik.values.chemistLandMark}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.chemistLandMark && Boolean(formik.errors.chemistLandMark)}
                    helperText={formik.touched.chemistLandMark && formik.errors.chemistLandMark}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Contact Person Name</FormLabel>
                  <TextField
                    name="contactPersonName"
                    label=""
                    size="small"
                    value={formik.values.contactPersonName}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                    helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Contact Person Number</FormLabel>
                  <TextField
                    name="contactPersonNumber"
                    label=""
                    size="small"
                    type="number"
                    value={formik.values.contactPersonNumber}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.contactPersonNumber && Boolean(formik.errors.contactPersonNumber)}
                    helperText={formik.touched.contactPersonNumber && formik.errors.contactPersonNumber}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>log</FormLabel>
                  <TextField
                    name="log"
                    label=""
                    size="small"
                    type="number"
                    value={formik.values.log}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.log && Boolean(formik.errors.log)}
                    helperText={formik.touched.log && formik.errors.log}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>lat</FormLabel>
                  <TextField
                    name="lat"
                    label=""
                    size="small"
                    type="number"
                    value={formik.values.lat}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.lat && Boolean(formik.errors.lat)}
                    helperText={formik.touched.lat && formik.errors.lat}
                  />
                </Grid> */}
              </Grid>
            </form>
          ) : (
            <form style={{ height: '650px', overflow: 'hidden' }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <FormLabel>lat</FormLabel>
                  <TextField
                    name="lat"
                    label=""
                    size="small"
                    value={userLocation.lat || chemistData?.lat}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>lng</FormLabel>
                  <TextField
                    name="lng"
                    label=""
                    size="small"
                    value={userLocation.lng || chemistData?.lng}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid style={{ overflow: 'hidden', width: '200px', height: '200px' }}>
                  <GoogleMap location={LocationGet} stateLocation={{lat :chemistData?.lat ,lng:chemistData?.lng} } />
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions style={{ zIndex: '1' }}>
          {tab === 1 ? (
            <>
              <Button
                type="submit"
                variant="contained"
                onClick={formik.handleSubmit}
                style={{ textTransform: 'capitalize' }}
              >
                Next
              </Button>

              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  handleClose();
                  formik.handleReset();
                }}
                style={{ textTransform: 'capitalize' }}
              >
                Cancle
              </Button>
            </>
          ) : (
            <div
              className="p-5"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0px 10px',
                backgroundColor: '#ffffff',
                zIndex: '1',
              }}
            >
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => setTab(1)}
                  style={{ textTransform: 'capitalize' }}
                >
                  Back
                </Button>
              </div>
              <div>
                <Button type="submit" variant="contained" onClick={onSave} style={{ textTransform: 'capitalize' }}>
                  Save
                </Button>
                <Button
                  type="reset"
                  variant="outlined"
                  color="error"
                  style={{ textTransform: 'capitalize', marginLeft: '10px' }}
                  onClick={() => {
                    handleCloseModel();
                    formik.handleReset();
                  }}
                >
                  Cancle
                </Button>
              </div>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditChemist;
