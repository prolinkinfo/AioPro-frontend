import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PersonIcon from '@mui/icons-material/Person';
import { fetchZoneData } from '../../redux/slice/GetZoneSlice';
import { fetchEmployeeData } from '../../redux/slice/GetEmployeeSlice';
import NavSection from '../../components/nav-section/NavSection';

export const Scheduler = () => {
  const [zone, setZone] = useState('');

  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchEmployeeData());
  }, []);

  console.log('employee', employee);
  const data = [
    {
      title: 'Dashboard',
      path: `dashboard/app`,
      icon: <PersonIcon />,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Scheduler</Typography>
      <Box width="100%" pt={3}>
        <Card>
          <Box>
            <Typography sx={{ py: 3, pl: 3 }} variant="h5">
              Calendar
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2}>
              <Box sx={{ ml: 2 }}>
                <Box>
                  <Autocomplete
                    size="small"
                    onChange={(event, newValue) => {
                      setZone(newValue ? newValue.zoneName : '');
                    }}
                    fullWidth
                    options={zoneList}
                    value={zoneList.find((item) => item.zoneName === zone) || null}
                    getOptionLabel={({ zoneName }) => zoneName}
                    style={{ textTransform: 'capitalize' }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ textTransform: 'capitalize' }} placeholder="Select Zone" />
                    )}
                  />
                  <Box>
                    <List>
                      {employee.map((text, index) => (
                        <ListItem key={index}>
                          <Button variant="text" wo>
                            <PersonIcon />
                            <span
                              style={{ marginLeft: '8px' }}
                            >{`${text?.basicInformation?.firstName} ${text?.basicInformation?.surname}`}</span>
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={10}>
              <Box sx={{ mx: 2, mb: 2 }}>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
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
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};
