/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Papa from 'papaparse';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddVisit from './Add';
import { fetchDoctorVisitData } from '../../../redux/slice/GetDoctorVisitSlice';
import { apiget } from '../../../service/api';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';


const filterType = [
  {
    label: "Closed Visits",
    value: "Closed"
  },
  {
    label: "Open Visits",
    value: "Open"
  },
  {
    label: "Rescheduled Visits",
    value: "Rescheduled"
  },
  {
    label: "Skipped Visits",
    value: "Skipped"
  },
]
const Visit = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const dispatch = useDispatch();
  const [doctorVisitList, setDoctorVisitList] = useState([])
  const [employeeList, setEmployeeList] = useState([]);

  const doctorVisit = useSelector((state) => state?.getDoctorVisit?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const cityList = useSelector((state) => state?.getCity?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 250,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async () => { };
        return (
          <Box onClick={handleClick}>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="carbon:view" />}
                size="small"
                onClick={() => handleClick(params?.row)}
              >
                {' '}
                View
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Iconify icon="material-symbols-light:print-outline" />}
                size="small"
              >
                {' '}
                Print
              </Button>
            </Stack>
          </Box>
        );
      },
    },
    { field: 'visitId', headerName: 'Visit ID', width: 120 },
    { field: 'doctorId', headerName: 'Doctor ID', width: 150 },
    { field: 'doctorName', headerName: 'Doctor Name', width: 150 },
    {
      field: 'clinicAddress',
      headerName: 'Clinic Address',
      width: 250,
    },
    {
      field: 'zoneName',
      headerName: 'Zone',
      width: 150,
    },
    {
      field: 'cityName',
      headerName: 'City',
      width: 150,
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      width: 200,
    },
    {
      field: 'visitDate',
      headerName: 'Date',
      width: 120,
      renderCell: (params) => {
        return <Box>{moment(params?.row?.visitDate).format('DD/MM/YYYY')}</Box>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const getLastWeekDates = () => {
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(lastWeekStart);
      date.setDate(lastWeekStart.getDate() + i);
      dates.push(date.toISOString().split('T')[0]).toString();
    }

    return dates;
  };

  const lastWeekDates = getLastWeekDates();


  const visitList = [
    {
      name: "Today Visits",
      date: moment(currentDate).format("YYYY-MM-DD")
    },
    {
      name: "This Week Visits",
      date: lastWeekDates
    },
    {
      name: "This Month Visits",
      date: currentMonth.toString()
    },
    {
      name: "This Year Visits",
      date: currentYear.toString()
    },
  ]


  const fetchEmployee = (name) => {
    if (employee) {
      const filtered = employee?.filter(({ contactInformation }) =>
        contactInformation?.division?.toLowerCase() === name?.toLowerCase() ||
        contactInformation?.zone?.toLowerCase() === name?.toLowerCase()
      )
      setEmployeeList(name?.length > 0 ? (filtered?.length > 0 ? filtered : []) : employee)

    }
  }

  const fetchData = (searchText) => {
    const filtered = doctorVisit?.filter(({ visitId, doctorId, doctorName, clinicAddress, zoneName, cityName, employeeName, visitDate, status }) =>
      visitId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      doctorId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      doctorName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      clinicAddress?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      zoneName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      cityName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      moment(visitDate)?.format("YYYY-MM-DD")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      moment(visitDate)?.format("MM")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      moment(visitDate)?.format("YYYY")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      status?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    setDoctorVisitList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : doctorVisit);
  }

  const downloadCSV = async () => {
    await apiget('/api/doctorvisit/export-csv');
  };

  useEffect(() => {
    dispatch(fetchDoctorVisitData());
    dispatch(fetchZoneData());
    dispatch(fetchCityData());
    dispatch(fetchEmployeeData());
  }, []);

  useEffect(() => {
    fetchData();
  }, [doctorVisit]);

  return (
    <div>
      <AddVisit isOpen={isOpenAdd} handleClose={handleCloseAdd} fetchDoctorVisitData={fetchDoctorVisitData} />
      <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Doctor Visit</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Visit
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={downloadCSV}>
              Export
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue?.value : "");
                  }}
                  options={filterType}
                  getOptionLabel={(type) => type?.label}
                  size='small'
                  fullWidth
                  style={{ textTransform: "capitalize" }}
                  renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px", textTransform: "capitalize" }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue?.date : "");
                  }}
                  options={visitList}
                  getOptionLabel={(visit) => visit?.name}
                  size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px" }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.zoneName : "");
                    fetchEmployee(newValue ? newValue.zoneName : "");
                  }}
                  id="combo-box-demo"
                  options={zoneList}
                  getOptionLabel={(zone) => zone?.zoneName}
                  size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "12px" }} />}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.cityName : "");
                  }}
                  options={cityList}
                  getOptionLabel={(city) => city?.cityName}
                  fullWidth
                  size='small'
                  renderInput={(params) => <TextField {...params} placeholder='Select City' />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  onChange={(event, newValue) => {
                    fetchData(newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                  }}
                  id="combo-box-demo"
                  options={employeeList}
                  size='small'
                  fullWidth
                  getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                  renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "12px" }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  type='text'
                  size='small'
                  fullWidth
                  placeholder='Search'
                  onChange={(e) => fetchData(e.target.value)}
                />
              </Grid>
              {/* <TextField
                                type='date'
                                size='small'
                                label="From Date"
                                variant='outlined'
                                fullWidth
                            />
                            <TextField
                                type='date'
                                size='small'
                                label='To Date'
                                fullWidth
                            /> */}

            </Grid>
            <Card style={{ height: '72vh', paddingTop: '15px' }}>
              <DataGrid
                rows={doctorVisitList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => row._id}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default Visit;
