import { Autocomplete, Box, Button, Card, Container, Grid, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import AddAdministrator from './Add';
import { apidelete, apiget, deleteManyApi } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchStateData } from '../../../redux/slice/GetStateSlice';
import ImportFileModel from './components/ImportFileModel';
import employeesamFile from '../../../assets/files/employee_samFile.xlsx'

const Employees = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [isOpenImport, setisOpenImport] = useState(false);
  const [employeeList, setEmployeeList] = useState([])
  const [cityList, setCityList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const employeeData = useSelector((state) => state?.getEmployee?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const stateList = useSelector((state) => state?.getState?.data);
  const cityData = useSelector((state) => state?.getCity?.data);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setEmployeeId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteEmployee = async (id) => {
    const result = await apidelete(`/api/employees/${id}`);
    if (result.status === 200) {
      dispatch(fetchEmployeeData());
    }
  };

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const handleClickOpenModel = (value) => {
          deleteEmployee(value);
          setAnchorEl(null);
        };

        return (
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleClick(e, params?.row?._id)}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleClose()}>
                <Link
                  to={`/${userRole}/dashboard/people/view/employees/${employeeId}`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <VisibilityIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>View</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <VisibilityIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>View Log</span>
              </MenuItem>

              <MenuItem>
                <Link
                  to={`/${userRole}/dashboard/people/employees/${employeeId}`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <BorderColorIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Edit</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <VerticalAlignBottomIcon fontSize="10" />
                <span style={{ marginLeft: '20px' }}>Unapprove</span>
              </MenuItem>
              <MenuItem onClick={() => handleClickOpenModel(employeeId)}>
                <DeleteIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Delete</span>
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
    {
      field: 'employeesCode',
      headerName: 'Employees Code',
      width: 200,
      renderCell: (params) => {
        return <Box>{params?.row?.basicInformation?.employeesCode} </Box>;
      },
    },
    {
      field: 'firstName',
      headerName: 'Name',
      renderCell: (params) => {
        return <Box>{`${params?.row?.basicInformation?.firstName} ${params?.row?.basicInformation?.surname}`} </Box>;
      },
      width: 200,
    },
    {
      field: 'assignTo',
      headerName: 'Assign To',
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.assignTo} </Box>;
      },
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.email} </Box>;
      },
      width: 200,
    },
    {
      field: 'city',
      headerName: 'City',
      renderCell: (params) => {
        return <Box>{params?.row?.basicInformation?.city} </Box>;
      },
      width: 200,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.primaryContact} </Box>;
      },
      width: 200,
    },
    {
      field: 'division',
      headerName: 'Division / Department',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.division} </Box>;
      },
      width: 200,
    },
    {
      field: 'zone',
      headerName: 'Zone',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.zone} </Box>;
      },
      width: 200,
    },
    {
      field: 'state',
      headerName: 'State',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.state} </Box>;
      },
      width: 200,
    },
    {
      field: 'homeLocation',
      headerName: 'Address',
      renderCell: (params) => {
        return <Box>{params?.row?.contactInformation?.homeLocation} </Box>;
      },
      width: 200,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.designation} </Box>;
      },
      width: 200,
    },
    {
      field: 'Dob',
      headerName: 'Date of Birth',
      renderCell: (params) => {
        return <Box>{params?.row?.basicInformation?.Dob} </Box>;
      },
      width: 200,
    },
    { field: 'signup', headerName: 'Signup Date & Time', width: 200 },
    // { field: 'lastSyncDate', headerName: 'Last sync Date & time', width: 200 },
    // { field: 'ApkVersion', headerName: 'Apk Version', width: 200 },
    // { field: 'mobile', headerName: 'Mobile',width:200 },
    // { field: 'os', headerName: 'OS', width: 200 },
    // { field: 'inactiveDate', headerName: 'Inactive Date', width: 200 },
    // { field: 'inactiveReson', headerName: 'Inactive Reson', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
    },
  ];

  const csvColumns = [
    { Header: "Employees Code", accessor: "basicInformation.employeesCode" },
    { Header: "First Name", accessor: "basicInformation.firstName" },
    { Header: "Surname", accessor: "basicInformation.surname" },
    { Header: "Email", accessor: "contactInformation.email" },
    { Header: "Contact", accessor: "contactInformation.primaryContact" },
    { Header: "City", accessor: "contactInformation.city" },
    { Header: "State", accessor: "contactInformation.state" },
    { Header: "Zone", accessor: "contactInformation.zone" },
    { Header: "EX-STATION", accessor: "workInformation.exStations" },
    { Header: "OUT-STATION", accessor: "workInformation.outStations" },
    { Header: "Division", accessor: "contactInformation.division" },
    { Header: "Designation", accessor: "workInformation.designation" },
    { Header: "Daily Work Hours", accessor: "workInformation.dailyWorkHours" },
    { Header: "Gender", accessor: "basicInformation.gender" },
    { Header: "Assigned To", accessor: "workInformation.assignedTo" },
    { Header: "Aadhar Number", accessor: "otherInformation.aadharNumber" },
    { Header: "License Number", accessor: "otherInformation.driverLicenseNumber" },
    { Header: "Marital Status", accessor: "basicInformation.maritalStatus" },
    { Header: "Blood Group", accessor: "otherInformation.bloodGroup" },
    { Header: "Home Location", accessor: "contactInformation.homeLocation" },
    { Header: "DA HEAD QUARTER", accessor: "dailyAllowanceInformation.DA_HO" },
    { Header: "DA EX STATION", accessor: "dailyAllowanceInformation.DA_EX" },
    { Header: "DA OUT STATION", accessor: "dailyAllowanceInformation.DA_OUT" },
    { Header: "DA INTRANSIT", accessor: "dailyAllowanceInformation.DA_TRANSIT" },
    { Header: "DA OTHER", accessor: "dailyAllowanceInformation.DA_OTHER" },
    { Header: "Work type", accessor: "basicInformation.workType" },
    { Header: "Country", accessor: "contactInformation.country" },
    { Header: "Date of birth", accessor: "basicInformation.Dob" },


  ];

  const downloadExcel = () => {
    const AllRecords = employeeList?.map((rec) => {
      const selectedFieldsData = {};
      csvColumns.forEach((item) => {
        const accessor = item.accessor;
        // Check if the accessor has nested properties
        if (accessor.includes('.')) {
          const nestedProperties = accessor.split('.');
          let nestedValue = rec;
          nestedProperties.forEach((prop) => {
            nestedValue = nestedValue?.[prop];
          });
          selectedFieldsData[accessor] = nestedValue;
        } else {
          selectedFieldsData[accessor] = rec[accessor];
        }
      });
      return selectedFieldsData;
    });
    convertJsonToExcel(AllRecords, csvColumns, 'employee');
  };

  const convertJsonToExcel = (jsonArray, csvColumns, fileName) => {
    const csvHeader = csvColumns.map((col) => col.Header);
    const csvContent = [
      csvHeader,
      ...jsonArray.map((row) => csvColumns.map((col) => row[col.accessor])),
    ];

    const ws = XLSX.utils.aoa_to_sheet(csvContent);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Auto-size columns
    const colWidths = csvContent[0]?.map((col, i) => {
      return {
        wch: Math.max(...csvContent?.map((row) => row[i]?.toString()?.length)),
      };
    });
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const downloadSamFile = () => {
    window.open(employeesamFile)
  }

  const statusList = ["Active", "Inactive", "On Hold"]

  const fetchData = (searchText) => {
    const filterData = employeeData?.filter(({ basicInformation, contactInformation, status }) =>
      basicInformation?.employeesCode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      basicInformation?.firstName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      basicInformation?.surname?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.primaryContact?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.division?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.state?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      contactInformation?.permanentLoction?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      status?.toLowerCase()?.includes(searchText?.toLowerCase())
    )
    setEmployeeList(searchText?.length > 0 ? (filterData?.length > 0 ? filterData : []) : employeeData)
  }

  const fetchCityAndManager = (name) => {
    const filterCity = cityData?.filter(({ zoneName }) => zoneName?.toLowerCase() === name?.toLowerCase())
    setCityList(name?.length > 0 ? (filterCity?.length > 0 ? filterCity : []) : cityData)
  }

  useEffect(() => {
    dispatch(fetchEmployeeData());
    dispatch(fetchDivisionData());
    dispatch(fetchZoneData());
    dispatch(fetchCityData());
    dispatch(fetchStateData());
  }, []);

  useEffect(() => {
    fetchCityAndManager();
    fetchData();
  }, [cityData, employeeData]);

  return (
    <div>
      {/* import File */}
      <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Employees</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
              <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={2}>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    <Link
                      to={`/${userRole}/dashboard/people/employees/add`}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Add Employees
                    </Link>
                  </Button>
                  <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} style={{ marginLeft: '10px' }} onClick={downloadExcel}>
                    Export
                  </Button>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Tooltip title="Upload File" arrow>
                    <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} onClick={() => setisOpenImport(true)}>
                      Import
                    </Button>
                  </Tooltip>
                  <Tooltip title="Download Sample File" arrow>
                    <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} onClick={downloadSamFile}>
                      Download
                    </Button>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue || "");
                  }}
                  options={statusList}
                  getOptionLabel={(status) => status}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Status" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    // fetchData(newValue ? newValue.categoryName : "");
                  }}
                  // options={statusList}
                  // getOptionLabel={(state) => state}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Designation" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.divisionName : "");
                  }}
                  options={divisionList}
                  fullWidth
                  size="small"
                  getOptionLabel={(division) => division?.divisionName}
                  renderInput={(params) => <TextField {...params} placeholder="Select Division" />}
                />

              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  onChange={(event, newValue) => {
                    fetchCityAndManager(newValue ? newValue?.zoneName : "");
                    fetchData(newValue ? newValue.zoneName : "");
                  }}
                  options={zoneList}
                  getOptionLabel={(zone) => zone?.zoneName}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Zone" style={{ fontSize: '15px' }} />
                  )}
                />

              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.stateName : "");
                  }}
                  options={stateList}
                  getOptionLabel={(state) => state?.stateName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select State" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.cityName : "");
                  }}
                  options={cityList}
                  getOptionLabel={(city) => city?.cityName}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select City" style={{ fontSize: '15px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    // fetchData(newValue || "");
                  }}
                  options={statusList}
                  fullWidth
                  size="small"
                  renderInput={(params) => <TextField {...params} placeholder="Select Manager" />}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.5}>
                <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'end'} mb={2}>
                  <TextField type="text" size="small" placeholder="Search" onChange={(e) => fetchData(e.target.value)} />
                </Stack>
              </Grid>
            </Grid>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={employeeList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
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

export default Employees;
