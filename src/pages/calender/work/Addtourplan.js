// StepForm.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';

const steps = ['Step 1', 'Step 2'];

const Addtourplan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [doctor, setDoctor] = useState(false);
  const [doctorZone, setDoctorZone] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  useEffect(() => {
    dispatch(fetchZoneData());
  }, []);

  const validationSchema = yup.object({
    zone: yup.string().required('Zone is required'),
  });

  const initialValues = {
    zone: '',
    date: '',
    employee: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log('values', values);
    },
  });

  const staptwo = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('11111', doctor, '22222', doctorZone);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <Typography variant="h4">Add tour Plan</Typography>
      <Container sx={{ mt: '30px' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Container maxWidth="xl" sx={{ mt: '30px' }}>
                <Typography variant="h3" textAlign="center">
                  You have Successfully Create a visit
                </Typography>
                <Link
                  to={`/${userRole}/dashboard/calendar/scheduler`}
                  style={{ textDecoration: 'none', color: '#000',textAlign:'center',marginBottom:"20px" }}
                >
                  <Typography variant="h6">Scheduler</Typography>
                </Link>
              </Container>
            </div>
          ) : (
            <div>
              <div style={{ height: '70vh' }}>
                {activeStep === 0 && (
                  <Container maxWidth="xl">
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2} height="65vh">
                      <Grid item xs={12} sm={6} md={6}>
                        <FormLabel>Zone</FormLabel>
                        <Autocomplete
                          size="small"
                          onChange={(event, newValue) => {
                            formik.setFieldValue('zone', newValue ? newValue.zoneName : '');
                          }}
                          fullWidth
                          options={zoneList}
                          value={zoneList.find((zone) => zone.zoneName === formik.values.zone) || null}
                          getOptionLabel={(zone) => zone?.zoneName}
                          style={{ textTransform: 'capitalize' }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ textTransform: 'capitalize' }}
                              placeholder="Select Zone"
                              error={formik.touched.zone && Boolean(formik.errors.zone)}
                              helperText={formik.touched.zone && formik.errors.zone}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <FormLabel>Date </FormLabel>
                        <TextField
                          name="date"
                          size="small"
                          type="date"
                          maxRows={10}
                          fullWidth
                          value={formik.values.date}
                          onChange={formik.handleChange}
                          error={formik.touched.date && Boolean(formik.errors.date)}
                          helperText={formik.touched.date && formik.errors.date}
                        />
                      </Grid>
                    </Grid>
                    <div style={{ float: 'right' }}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </Container>
                )}
                {activeStep === 1 && (
                  <div style={{ marginTop: '30px' }}>
                    <Box height="65vh">
                      <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={doctor}
                                  onChange={(e) => setDoctor(e.target.checked)}
                                  name="doctor"
                                />
                              }
                              label="Do you want to create tourplan with Doctor"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <FormLabel>Zone</FormLabel>
                            <Autocomplete
                              size="small"
                              onChange={(event, newValue) => {
                                setDoctorZone(newValue ? newValue.zoneName : '');
                              }}
                              fullWidth
                              options={zoneList}
                              value={zoneList.find((zone) => zone?.zoneName === doctorZone) || null}
                              getOptionLabel={(zone) => zone?.zoneName}
                              style={{ textTransform: 'capitalize' }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  style={{ textTransform: 'capitalize' }}
                                  placeholder="Select Zone"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>

                    <div style={{ float: 'right' }}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={staptwo}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
};

export default Addtourplan;
