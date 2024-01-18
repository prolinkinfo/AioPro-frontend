/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  ClickAwayListener,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Grow,
  MenuList,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import * as XLSX from 'xlsx'

import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import { apidelete, apiget } from '../../../service/api';
// redux api fatch
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';
import { fetchfirmData } from '../../../redux/slice/GetFirmSlice';
import VisitModel from './VisitModel';
import RejectModel from './RejectModel';
import ImportFileModel from './components/ImportFileModel';

const Firms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImport, setisOpenImport] = useState(false);
  const [firmsList, setFirmsList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firmId, setFirmId] = useState(null);
  const [firmType, setFirmType] = useState(null);
  const [firmCity, setFirmCity] = useState(null);
  const [firmZone, setFirmZone] = useState(null);
  const [firmDivision, setFirmDivision] = useState(null);
  const [firmEmployee, setFirmEmployee] = useState(null);
  const [firmManager, setFirmManager] = useState(null);
  const [fId, setFId] = useState({});
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const open = Boolean(anchorEl);
  const [employeeList, setEmployeeList] = useState([])

  const cityData = useSelector((state) => state?.getCity?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const doctorCategoryList = useSelector((state) => state?.getDoctorCategory?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);
  const firmData = useSelector((state) => state?.geFirmType?.data);
  const { data, errro, isLoading } = useSelector((state) => state?.getFirm);


  const fetchData = async (searchText) => {
    const filtered = data?.filter(({ division, status, firmType, zone, city, assignedTo }) =>
      division?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      status?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      firmType?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      city?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      assignedTo?.toLowerCase()?.includes(searchText?.toLowerCase())
    )
    setFirmsList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : data)
  };

  const fetchEmployee = (searchText) => {
    if (employee) {
      const filterEmp = employee?.filter((employee) =>
        employee?.contactInformation?.zone?.toLowerCase() === searchText?.toLowerCase() ||
        employee?.contactInformation?.division?.toLowerCase() === searchText?.toLowerCase()
      )
      setEmployeeList(searchText?.length > 0 ? (filterEmp?.length > 0 ? filterEmp : []) : employee);
    }
  }


  useEffect(() => {
    dispatch(fetchCityData());
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchTypeData());
    dispatch(fetchCategoryData());
    dispatch(fetchEmployeeData());
    dispatch(firmaTypeData());
    dispatch(fetchfirmData());
  }, []);

  useEffect(() => {
    fetchData();
    fetchEmployee();
  }, [data, employee])

  const handleClickOpenModel = (value) => {
    // console.log("value",value)
    setFirmId(value);
    setOpenModel(true);
    setAnchorEl(null);
  };

  const handleCloseModel = async (id) => {
    const result = await apidelete(`/api/firm/${id}`);
    if (result && result.status === 200) {
      setOpenModel(false);
      fetchdata();
      dispatch(fetchfirmData());
    }
  };

  const handleClick = (id, event) => {
    setAnchorEl(event.currentTarget);
    setFId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fullName = (name) => {
    let separatedNames = name?.split(/(?=[A-Z])/);
    let firstName = separatedNames && separatedNames[0];
    let lastName = separatedNames && separatedNames[1];

    return `${firstName} ${lastName}`
  }

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleClick(params?.row, e)}
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
              <MenuItem>
                <Link
                  to={`/${userRole}/dashboard/sales/firms/${fId?._id}`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <BorderColorIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Edit</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setApproveModel(true)}>
                <VerticalAlignBottomIcon fontSize="10" />
                <span style={{ marginLeft: '20px' }}>
                  {fId?.status === 'Approved' ? 'Unapproved' : fId?.status === 'Unapproved' ? 'Approved' : fId?.status}
                </span>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <VisibilityIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>View Log(s)</span>
              </MenuItem>
              <MenuItem onClick={() => handleClickOpenModel(fId?._id)}>
                <DeleteIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Delete</span>
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
    { field: 'firmId', headerName: 'Firm Id', width: 120 },
    {
      field: 'date',
      headerName: 'Date',
      renderCell: (params) => {
        return <Box>{dayjs(params?.row?.date).format('DD-MM-YYYY')} </Box>;
      },
      width: 130,
    },
    { field: 'firmCode', headerName: 'Firm Code', width: 130 },
    { field: 'firmName', headerName: 'Firm Name', width: 200 },
    { field: 'firmType', headerName: 'Firm Type', width: 120 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'contactPersonName', headerName: 'Contact Person Name', width: 180 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'zone', headerName: 'Zone', width: 150 },
    { field: 'division', headerName: 'Division', width: 130 },
    { field: 'category', headerName: 'Firm Category', width: 130 },

    {
      field: 'employeeAssigned',
      headerName: 'Employee Assigned',
      width: 180,
      renderCell: (params) => {
        return <Box>{fullName(params?.row?.employeeAssigned)} </Box>;
      },
    },
    { field: 'assignedFirm', headerName: 'Assigned Firm', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'address', headerName: 'Address', width: 180 },

    { field: 'firstLevelManager', headerName: 'First Level Manager', width: 180 },
    { field: 'secondLevelManager', headerName: 'Second Level Manager', width: 200 },
    { field: 'thirdLevelManager', headerName: 'Third Level Manager', width: 180 },
    {
      field: 'dateOfBirth',
      headerName: 'DOB',
      renderCell: (params) => {
        return <Box>{dayjs(params?.row?.dateOfBirth).format('DD-MM-YYYY')} </Box>;
      },
      width: 130,
    },
    { field: 'panNumber', headerName: 'Pan Number', width: 130 },
    { field: 'drugLicenseNumber', headerName: 'Drug License Number', width: 200 },
    { field: 'foodLicenseNumber', headerName: 'Food License Number', width: 200 },

    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              style={{
                color: params.value === 'Approved' ? '#22C55E' : params.value === 'Unapproved' ? '#B61D18' : '#BDAC17',
                background: params.value === 'Approved' ? '#22c55e29' : params.value === 'Unapproved' ? '#ff563029' : '#fff494',
                border: 'none',
              }}
            >
              {params.value}
            </Button>
          </Box>
        );
      },
      width: 130,
    },
  ];

  async function fetchdata() {
    const result = await apiget('/api/firm');
    if (result && result.status === 200) {
      setFirmsList(result?.data?.result);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const StatusList = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Unapproved', value: 'Unapproved' },
    { label: 'Reject', value: 'Reject' },
    { label: 'Pending', value: 'Pending' },
  ];

  const handleOpenView = () => setIsOpen(true);
  const handleCloseView = () => setIsOpen(false);

  const approvedFirm = (id) => { };

  const convertJsonToExcel = (jsonArray, fileName) => {
    const field = jsonArray?.map((item) => {
      return {
        'Firm Id': item?.firmId,
        'Date': moment(item?.date).format("DD/MM/YYYY"),
        'Firm Code': item?.firmCode,
        'Firm Name': item?.firmName,
        'Firm Type': item?.firmType,
        'Contact Number': item?.contactNumber,
        'Contact Person Name': item?.contactPersonName,
        'City': item?.city,
        'Zone': item?.zone,
        'Division': item?.division,
        'Firm Category': item?.category,
        'Assigned Employee': item?.employeeAssigned,
        'Assigned Firm': item?.assignedTo,
        'Assigned Firm Email': item?.assignedFirmEmail,
        'Email': item?.email,
        'Address': item?.address,
        'First Level Manager': item?.firstLevelManager,
        'Second Level Manager': item?.secondLevelManager,
        'Third Level Manager': item?.thirdLevelManager,
        'Date of Birth': moment(item?.dateOfBirth).format("DD/MM/YYYY"),
        'Pan Number': item?.panNumber,
        'Drug License Number': item?.drugLicenseNumber,
        'Food License Number': item?.foodLicenseNumber,
        'Status': item?.status,
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
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
      <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

      <VisitModel isOpen={isOpen} handleCloseView={handleCloseView} />
      <RejectModel isOpen={rejectModel} handleClose={setRejectModel} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Firms</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link to={`/${userRole}/dashboard/sales/firms/add`} style={{ color: 'white', textDecoration: 'none' }}>
                Add Firm
              </Link>
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenView}>
              Add Visit
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={() => convertJsonToExcel(firmsList, 'firms')}>
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setisOpenImport(true)}
            >
              Import
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={StatusList}
                  size="small"
                  fullWidth
                  onChange={(e, value) =>
                    fetchData(value ? value?.value : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Status" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  size="small"
                  name="firmType"
                  onChange={(e, value) =>
                    fetchData(value ? value?.firmType : "")
                  }
                  fullWidth
                  options={firmData}
                  getOptionLabel={(firm) => firm?.firmType}
                  renderInput={(params) => (
                    <TextField {...params} style={{ textTransform: 'capitalize' }} placeholder="Select Firm Type" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => {
                    fetchData(value ? value?.divisionName : "");
                    fetchEmployee(value ? value?.divisionName : "")
                  }}
                  id="combo-box-demo"
                  options={divisionList}
                  getOptionLabel={({ divisionName }) => divisionName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Division" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, value) => {
                    fetchData(value ? value?.zoneName : "");
                    fetchEmployee(value ? value?.zoneName : "")
                  }}
                  options={zoneList}
                  getOptionLabel={({ zoneName }) => zoneName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Zone" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, value) => {
                    fetchData(value ? value?.cityName : "");
                  }}
                  options={cityData}
                  getOptionLabel={({ cityName }) => cityName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select City" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
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
              {/* <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => setFirmManager(newValue?.basicInformation?.employeesName)}
                  options={employeeList}
                  value={employeeList.find((item) => item.basicInformation?.employeesName === firmManager) || null}
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Manager" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid> */}
            </Grid>
            <Card style={{ height: '72vh', marginTop: '10px' }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "72vh" }}>Loading...</Box>
              ) : (
                <DataGrid
                  rows={firmsList}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 15, 25]}
                  getRowId={(row) => row._id}
                />
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>

      {/* Delete modele */}
      <Dialog
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to remove firm ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModel}>Disagree</Button>
          <Button onClick={() => handleCloseModel(firmId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve modele */}
      <Dialog
        open={approveModel}
        onClose={() => setApproveModel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A request for approval is a formal process in which you ask a senior team member for their approval. This
            could be a project manager, the head of a department, or even an external client.{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setApproveModel(false);
              setRejectModel(true);
              setAnchorEl(null);
            }}
          >
            Reject
          </Button>
          <Button onClick={() => approvedFirm(firmId)} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Firms;
