// StepForm.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const steps = ['Step 1', 'Step 2'];

const Addtourplan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [doctor, setDoctor] = useState(false);
  const [doctorZone, setDoctorZone] = useState(0);
  const [index, setIndex] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const employeeList = useSelector((state) => state?.getEmployee?.data);

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchEmployeeData());
  }, []);

  const validationSchema = yup.object({
    zone: yup.string().required('Zone is required'),
    month: yup.string().required('Month is required'),
    employee: yup.string().required('Employee is required'),
    year: yup.string().required('Year is required'),
  });

  const initialValues = {
    zone: '',
    employee: '',
    month: '',
    year: '',
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

  const currentYear = new Date().getFullYear();

  const staptwo = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('11111', doctor, '22222', doctorZone);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const monthNames = [
    { label: 'January', i: 0 },
    { label: 'February', i: 1 },
    { label: 'March', i: 2 },
    { label: 'April', i: 3 },
    { label: 'May', i: 4 },
    { label: 'June', i: 5 },
    { label: 'July', i: 6 },
    { label: 'August', i: 7 },
    { label: 'September', i: 8 },
    { label: 'October', i: 9 },
    { label: 'November', i: 10 },
    { label: 'December', i: 11 },
  ];
  const yearList = [
    { label: '2015' },
    { label: '2016' },
    { label: '2017' },
    { label: '2018' },
    { label: '2019' },
    { label: '2020' },
    { label: '2021' },
    { label: '2022' },
    { label: '2023' },
    { label: '2024' },
    { label: '2025' },
    { label: '2026' },
    { label: '2027' },
  ];
  return (
    <Container maxWidth="xl">
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
                  style={{ textDecoration: 'none', color: '#000', textAlign: 'center', marginBottom: '20px' }}
                >
                  <Typography variant="h6">Scheduler</Typography>
                </Link>
              </Container>
            </div>
          ) : (
            <div>
              {activeStep === 0 && (
                <Container maxWidth="xl">
                  <Container sx={{ minHeight: '65vh' }}>
                    <Grid rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mt={2}>
                      <Grid item xs={12} sm={12} md={12} my={2}>
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

                      <Grid item xs={12} sm={12} md={12} my={2}>
                        <FormLabel>Employee</FormLabel>
                        <Autocomplete
                          size="small"
                          onChange={(event, newValue) => {
                            formik.setFieldValue(
                              'employee',
                              newValue
                                ? `${newValue?.basicInformation?.firstName}${newValue?.basicInformation?.surname}`
                                : ''
                            );
                          }}
                          fullWidth
                          options={employeeList}
                          value={employeeList.find(
                            (employee) =>
                              employee?.basicInformation?.firstName + employee?.basicInformation?.surname ===
                              formik.values.employee
                          )}
                          getOptionLabel={(employee) =>
                            `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`
                          }
                          style={{ textTransform: 'capitalize' }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ textTransform: 'capitalize' }}
                              placeholder="Select Employee"
                              error={formik.touched.employee && Boolean(formik.errors.employee)}
                              helperText={formik.touched.employee && formik.errors.employee}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} my={2}>
                        <FormLabel>Month</FormLabel>
                        <Autocomplete
                          disablePortal
                          name="month"
                          options={monthNames}
                          getOptionLabel={(option) => option.label} // Specify the label property
                          fullWidth
                          size="small"
                          value={monthNames.find((option) => option.label === formik.values.month)}
                          onChange={(e, value, i) => {
                            setIndex(value?.i);
                            formik.setFieldValue('month', value?.label || null);
                          }} // Set the label as the value
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Month"
                              error={formik.touched.month && Boolean(formik.errors.month)}
                              helperText={formik.touched.month && formik.errors.month}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} my={2}>
                        <FormLabel>Year</FormLabel>
                        <Autocomplete
                          disablePortal
                          name="year"
                          options={yearList}
                          getOptionLabel={(option) => option.label} // Specify the label property
                          fullWidth
                          size="small"
                          value={yearList.find((option) => option.label === formik.values.year)}
                          onChange={(e, value) => formik.setFieldValue('year', value?.label || null)} // Set the label as the value
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Year"
                              error={formik.touched.year && Boolean(formik.errors.year)}
                              helperText={formik.touched.year && formik.errors.year}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Container>
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
                  <Box>
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid spacing={2}>
                        <Grid item xs={12} sm={12} md={12} my={2}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={doctor} onChange={(e) => setDoctor(e.target.checked)} name="doctor" />
                            }
                            label="Do you want to create tourplan with Doctor"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} my="2">
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

                        <Grid item xs={12} sm={6} md={6} my={2}>
                          <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            initialDate={new Date(formik?.values?.year || currentYear, index, 1)}
                            // minHeight="300px"
                            // height="100%"
                            // events={meetingList}
                            headerToolbar={{
                              right: 'dayGridMonth',
                            }}
                            // eventClick={handleEventClick}
                            // eventContent={renderEventContent}
                            views={{
                              listWeek: { buttonText: 'List' },
                              multiMonthFourMonth: {
                                type: 'multiMonth',
                                buttonText: 'multiMonth',
                                duration: { months: 4 },
                              },
                            }}
                            // buttonText={{
                            //   today: 'Today',
                            //   dayGridMonth: 'Month',
                            // }}
                            eventClassNames="custom-fullcalendar"
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
          )}
        </div>
      </Container>
    </Container>
  );
};

export default Addtourplan;
