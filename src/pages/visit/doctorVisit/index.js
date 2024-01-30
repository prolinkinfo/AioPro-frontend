/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'
import { useReactToPrint } from 'react-to-print';
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
  const navigate = useNavigate();
  const componentRef = useRef();
  const [doctorVisitList, setDoctorVisitList] = useState([])
  const [employeeList, setEmployeeList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const doctorVisit = useSelector((state) => state?.getDoctorVisit?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const cityList = useSelector((state) => state?.getCity?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const fullName = (name) => {
    let separatedNames = name.split(/(?=[A-Z])/);
    let firstName = separatedNames[0];
    let lastName = separatedNames[1];

    return `${firstName} ${lastName}`
  }

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 250,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = (id, e) => {
          navigate(`/${userRole}/dashboard/visits/doctorvisit/view/${id}`)
        };
        return (
          <Box>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="carbon:view" />}
                size="small"
                onClick={(e) => handleClick(params?.row?._id, e)}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Iconify icon="material-symbols-light:print-outline" />}
                size="small"
                onClick={handlePrint}
              >

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
      renderCell: (params) => {
        return <Box>{fullName(params?.row?.employeeName)}</Box>;
      },
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

  const convertJsonToExcel = (jsonArray, fileName) => {
    const field = jsonArray?.map((item) => {
      return {
        "Visit Id": item?.visitId,
        "Doctor Id": item?.doctorId,
        "Doctor Name": item?.doctorName,
        "Clinic Address": item?.clinicAddress,
        "Zone": item?.zoneName,
        "City": item?.cityName,
        "Employee Name": fullName(item?.employeeName),
        "Date": moment(item?.visitDate).format("DD/MM/YYYY"),
        "Status": item?.status,
      };
    });

    const ws = XLSX.utils.json_to_sheet(field);

    // Bold the header
    const headerRange = XLSX.utils.decode_range(ws['!ref']);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
      if (ws[headerCell]) {
        ws[headerCell].s = { font: { bold: true } };
      }
    }

    // Auto-size columns based on data content
    const dataRange = XLSX.utils.decode_range(ws['!ref']);
    for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
      let maxLen = 0;
      for (let R = dataRange.s.r; R <= dataRange.e.r; ++R) {
        const cell = XLSX.utils.encode_cell({ r: R, c: C });
        if (ws[cell] && ws[cell].v) {
          const cellValue = ws[cell].v.toString().length + 2;
          if (cellValue > maxLen) {
            maxLen = cellValue;
          }
        }
      }
      ws['!cols'] = ws['!cols'] || [];
      ws['!cols'][C] = { wch: maxLen };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${fileName}.xls`);
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
      {/* Add visit */}
      <AddVisit isOpen={isOpenAdd} handleClose={handleCloseAdd} fetchDoctorVisitData={fetchDoctorVisitData} />

      <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Doctor Visit</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Visit
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={() => convertJsonToExcel(doctorVisitList, "doctor_visit")}>
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
            <Card style={{ height: '67vh', paddingTop: '15px' }}>
              <DataGrid
                rows={doctorVisitList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
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
