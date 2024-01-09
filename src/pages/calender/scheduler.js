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
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';
import { fetchZoneData } from '../../redux/slice/GetZoneSlice';
import { fetchEmployeeData } from '../../redux/slice/GetEmployeeSlice';
import NavSection from '../../components/nav-section/NavSection';
import { apiget } from '../../service/api';

export const Scheduler = () => {
  const [zone, setZone] = useState('');
  const [tourList, setTourList] = useState([]);
  const [employeList, setEmployeeList] = useState([]);

  const [tour, setTour] = useState([]);

  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchEmployeeData());
  }, []);

  const data = [
    {
      title: 'Dashboard',
      path: `dashboard/app`,
      icon: <PersonIcon />,
    },
  ];

  const fetchApiMeeting = async () => {
    const result = await apiget(`/api/tourplan`);
    if (result?.status === 200) {
      const data = result?.data?.result.map((item) => ({
        _id: item._id,
        title: item.city,
        start: item.Date,
        employeeId: item.employeeId,
        status: item.status,
        // bgcolor:
        //   item.status === 'Pending' ? (
        //     <CircleIcon style={{ color: 'yello', fontSize: '15px' }} />
        //   ) : (
        //     <CircleIcon style={{ color: 'green', fontSize: '15px' }} />
        //   ),
      }));
      setTourList(data);
    }
  };

  const fetchData = async (searchText) => {
    const filtered = employee?.filter(({ contactInformation }) =>
      contactInformation?.zone?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    setEmployeeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : employee);
  };

  const fetchTour = async (id) => {
    const filter = tourList?.filter((item) => item?.employeeId === id);
    setTour(id?.length > 0 ? (filter?.length > 0 ? filter : []) : tourList);
  };

  useEffect(() => {
    fetchApiMeeting();
  }, []);

  useEffect(() => {
    fetchData();
    fetchTour();
  }, [employee]);


  useEffect(()=>{
    fetchTour();
  },[tourList])


  console.log("tour",tour)

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
                      fetchData(newValue ? newValue.zoneName : '');
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
                      {employeList?.map((text, index) => (
                        <ListItem key={index}>
                          <Button variant="text" onClick={() => fetchTour(text?._id)}>
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
                  events={tour}
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
                  eventClassNames="custom-fullcalendar"
                  eventContent={(eventInfo) => {
                    return (
                      <Box
                        style={{
                          backgroundColor: eventInfo.event.backgroundColor || 'blue', 
                          color: eventInfo.event.textColor || 'white', 
                          padding:'5px 20px',
                          width: '100%',
                          borderRadius: '5px',
                          
                        }}
                      >
                        {eventInfo.event.title}
                      </Box>
                    );
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};
