import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box, TextField, Autocomplete, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import Iconify from '../../../components/iconify';
import TableStyle from '../../../components/TableStyle';
import AddHoliday from './Add';
import { apiget } from '../../../service/api';

// ----------------------------------------------------------------------

const LeaveCalendar = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = JSON.parse(localStorage.getItem('user'));

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const row = [
    {
      id: 1,
      zone: 'gujrat',
      date: '14/02/2003',
      occasion: 'rja',
    },
  ];
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

  const fetchHolidayData = async () => {
    const result = await apiget(`/api/holidaycalendar`);
    if (result && result.status === 200) {
      setHolidayList(result?.data?.result);
    }
  };

  useEffect(() => {
    fetchHolidayData();
  }, []);

  return (
    <Container maxWidth="xl">
      <AddHoliday isOpen={isOpen} handleClose={handleClose} fetchHolidayData={fetchHolidayData} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
        <Typography variant="h4">Leave Management</Typography>
      </Stack>
      <Box sx={{ width: '100%' }} mt={2}>
        <Box width="100%" pt={3}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} py={2}>
            <Grid item xs={12} sm={4} md={4}>
              <div style={{ display: 'flex' }}>
                <TextField
                  id="dateOfBirth"
                  name="Dob"
                  size="small"
                  type="date"
                  maxRows={10}
                  fullWidth
                  // value={formik.values.Dob}
                  // onChange={formik.handleChange}
                  // error={formik.touched.Dob && Boolean(formik.errors.Dob)}
                  // helperText={formik.touched.Dob && formik.errors.Dob}
                />
                <TextField
                  id="dateOfBirth"
                  name="Dob"
                  size="small"
                  type="date"
                  maxRows={10}
                  sx={{ marginLeft: '10px' }}
                  fullWidth
                  // value={formik.values.Dob}
                  // onChange={formik.handleChange}
                  // error={formik.touched.Dob && Boolean(formik.errors.Dob)}
                  // helperText={formik.touched.Dob && formik.errors.Dob}
                />
                <Button variant="contained" style={{ marginLeft: '10px' }}>
                  Go
                </Button>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6} display={'flex'} justifyContent={'end'}>
              <TextField type="text" size="small" placeholder="Search" />
              
            </Grid> */}
          </Grid>

          <Card style={{ height: '30vh' }}>
            <Container maxWidth="xl">
              <h3>Pending Approval Request</h3>
            </Container>
          </Card>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }} mt={2}>
        <Box width="100%" pt={3}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} py={2}>
            <Grid item xs={12} sm={3} md={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                size="small"
                renderInput={(params) => <TextField {...params} style={{ fontSize: '12px' }} placeholder="All Zone" />}
              />
            </Grid>
            
          </Grid>

          <Card>
            <Container maxWidth="xl">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Calendar</h3>
                <Box>
                  <Button style={{ color: 'gray' }}>Company Holiday</Button>
                  <Button style={{ color: 'red' }}>Half Day</Button>
                  <Button style={{ color: 'green' }}>Full Day</Button>
                  <Button>Multiple day</Button>
                </Box>
              </Box>
              <Container maxWidth="xl" sx={{my:'20px'}}>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  minHeight="400px"
                  height="800px"
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
              </Container>
            </Container>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default LeaveCalendar;
