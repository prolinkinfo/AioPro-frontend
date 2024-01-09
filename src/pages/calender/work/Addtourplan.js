// StepForm.js
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
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
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import AddTaskMOdel from '../../../components/calendar/AddTask';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { apipost } from '../../../service/api';

const steps = ['Step 1', 'Step 2'];

const Addtourplan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [doctor, setDoctor] = useState(false);
  const [doctorZone, setDoctorZone] = useState(0);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState('');

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
    employeeId: '',
    month: '',
    year: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setData(values);
      console.log('values', values);
    },
  });

  const currentYear = new Date().getFullYear();

  const staptwo = async () => {
    const pyload = {
      zone: data?.zone,
      employee: data?.employee,
      employeeId: data?.employeeId,
      month: data?.month,
      year: data?.year,
      Doctor: doctor,
      DoctorZone: events?.zone,
      city: events?.city,
      Date: new Date(date),
    };

    const result = await apipost('/api/tourplan', pyload);
    if (result && result.status === 200) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      formik.resetForm();
    }
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
    { label: '2022' },
    { label: '2023' },
    { label: '2024' },
    { label: '2025' },
    { label: '2026' },
    { label: '2027' },
  ];

  const handleEventClick = (clickInfo) => {
    setDate(clickInfo?.start);

    setOpen(true);
  };

  const eventData = (e) => setEvents(e);

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
                            formik.setFieldValue('employeeId', newValue ? newValue?._id : '');
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

                        {doctor ? (
                          <Grid item xs={12} sm={6} md={6} my={2}>
                            {/* <FullCalendar
                              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                              initialView="dayGridMonth"
                              initialDate={new Date(formik?.values?.year || currentYear, index, 1)}
                              // minHeight="300px"
                              // height="100%"
                              events={[{ title: events?.city, date }]}
                              headerToolbar={{
                                right: 'dayGridMonth',
                              }}
                              // eventClick={handleEventClick}
                              editable
                              selectable
                              selectMirror
                              dayMaxEvents
                              select={handleEventClick}
                              // eventContent={handleEventClick}
                              // eventClick={handleEventClick}
                              // eventsSet={handleEventClick}
                              // eventContent={renderEventContent}
                              views={{
                                listWeek: { buttonText: 'List' },
                                multiMonthFourMonth: {
                                  type: 'multiMonth',
                                  buttonText: 'multiMonth',
                                  duration: { months: 4 },
                                },
                              }}
                              eventClassNames="custom-fullcalendar"
                            /> */}

                            <FullCalendar
                              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                              initialView="dayGridMonth"
                              events={[{ title: events?.city, date }]}
                              initialDate={new Date(formik?.values?.year || currentYear, index, 1)}
                              headerToolbar={{
                                right: 'dayGridMonth',
                              }}
                              views={{
                                listWeek: { buttonText: 'List' },
                                multiMonthFourMonth: {
                                  type: 'multiMonth',
                                  buttonText: 'multiMonth',
                                  duration: { months: 4 },
                                },
                              }}
                              editable
                              selectable
                              selectMirror
                              dayMaxEvents
                              select={handleEventClick}
                              eventClassNames="custom-fullcalendar"
                              eventContent={(eventInfo) => {
                                return (
                                  <Box
                                    style={{
                                      backgroundColor: eventInfo.event.backgroundColor || 'blue',
                                      color: eventInfo.event.textColor || 'white',
                                      padding: '5px 20px',
                                      width: '100%',
                                      borderRadius: '5px',
                                    }}
                                  >
                                    {eventInfo.event.title}
                                  </Box>
                                );
                              }}
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
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

        {/* add model */}

        <AddTaskMOdel modelOpen={open} modelClose={setOpen} event={eventData} />
      </Container>
    </Container>
  );
};

export default Addtourplan;
