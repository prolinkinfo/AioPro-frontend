/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx'

import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import { fetchDoctorData } from '../../../redux/slice/GetDoctorSlice';
import { apidelete } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle';
import CustomMenu from '../../../components/CustomMenu';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const statusList = [
  "Active",
  "Inactive",
  "Deleted",
  "Unassign",
  "Add Client Request",
  "Delete Client Request",
]

const Doctor = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const [doctorList, setDoctorList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [userAction, setUserAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true);
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, errro, isLoading } = useSelector((state) => state?.getDoctor);
  const specialityList = useSelector((state) => state?.getDoctorSpeciality?.data);
  const categoryList = useSelector((state) => state?.getDoctorCategory?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const cityList = useSelector((state) => state?.getCity?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 120,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = (id, event) => {
          setAnchorEl(event.currentTarget);
          setId(id);
        };

        return (
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleClick(params?.row?._id, e)}
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
                  to={`/${userRole}/dashboard/people/doctor/update_doctor/${id}`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <BorderColorIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Edit</span>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to={`/${userRole}/dashboard/people/doctor/${id}`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  <VisibilityIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>View Log(s)</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <DeleteIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Delete</span>
              </MenuItem>
            </Menu>
          </div>
          // <Box>
          //   <CustomMenu
          //     open={open}
          //     handleClick={handleClick}
          //     anchorEl={anchorEl}
          //     handleClose={handleClose}
          //     id={id}
          //     params={params}
          //   />
          // </Box>
        );
      },
    },
    {
      field: 'doctorId',
      headerName: 'Doctor ID',
      width: 120,
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      width: 200,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      renderCell: (params) => {
        return <Box>{params?.row?.addressInformation?.city}</Box>;
      },
    },
    {
      field: 'hospitalName',
      headerName: 'Hospital Name',
      width: 250,
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      width: 250,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.assignedTo}</Box>;
      },
    },
    {
      field: 'immediateSenior',
      headerName: 'Immediate Senior',
      width: 250,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      width: 200,
    },
    {
      field: 'speciality',
      headerName: 'Speciality',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.speciality}</Box>;
      },
    },
    {
      field: 'qualification',
      headerName: 'Qualification',
      width: 130,
    },
    {
      field: 'division',
      headerName: 'Division',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.addressInformation?.division}</Box>;
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.category}</Box>;
      },
    },
    {
      field: 'zone',
      headerName: 'Zone',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.addressInformation?.zone}</Box>;
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 130,
    },
    {
      field: 'dateOfBirth',
      headerName: 'DOB',
      width: 130,
      renderCell: (params) => {
        return <Box>{moment(params?.row?.dateOfBirth).format('DD/MM/YYYY')}</Box>;
      },
    },
    {
      field: 'anniversaryDate',
      headerName: 'Anniversary',
      width: 130,
      renderCell: (params) => {
        return <Box>{moment(params?.row?.anniversaryDate).format('DD/MM/YYYY')}</Box>;
      },
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.type}</Box>;
      },
    },
    {
      field: 'firmName',
      headerName: 'Firm',
      width: 250,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.firmName}</Box>;
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.country}</Box>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
    },
  ];

  const deleteDoctor = async (id) => {
    const result = await apidelete(`/api/doctor/${id}`);
    setUserAction(result);
  };

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

  const fetchData = async (searchText) => {
    const filtered = data?.filter(({ doctorId, doctorName, hospitalName, addressInformation, workInformation, contactNumber, qualification, email, gender }) =>
      doctorId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      doctorName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      addressInformation?.city?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      addressInformation?.division?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      // addressInformation?.pincode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      // addressInformation?.state?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      addressInformation?.zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      workInformation?.assignedTo?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      workInformation?.category?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      // workInformation?.firmName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      // workInformation?.type?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      hospitalName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      // contactNumber?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      qualification?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      gender?.toLowerCase()?.includes(searchText?.toLowerCase()) 
    )
    setDoctorList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : data)
  };

  const fetchEmployee = (searchText) => {
    if (employee) {
        const filterEmp = employee?.filter((employee) => employee?.contactInformation?.zone?.toLowerCase() === searchText?.toLowerCase())
        setEmployeeList(searchText?.length > 0 ? (filterEmp?.length > 0 ? filterEmp : []) : employee);
    }
}

  useEffect(() => {
    dispatch(fetchDoctorData());
    dispatch(fetchDoctorSpecialityData());
    dispatch(fetchCategoryData());
    dispatch(fetchTypeData());
    dispatch(fetchDivisionData());
    dispatch(fetchZoneData());
    dispatch(fetchCityData());
    dispatch(fetchEmployeeData());
  }, [userAction]);

  useEffect(() => {
    fetchData();
    fetchEmployee();
  }, [data,employee]);



  // ======================== XLS File ================================================

  const convertJsonToExcel = (jsonArray, fileName) => {
    const ws = XLSX.utils.json_to_sheet(jsonArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${fileName}.xls`);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Doctors</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link to={`/${userRole}/dashboard/people/doctor/add`} style={{ color: 'white', textDecoration: 'none' }}>
                Add Doctor
              </Link>
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={() => convertJsonToExcel(data, 'doctors')}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Import
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.specialityName : "");
                  }}
                  options={specialityList}
                  getOptionLabel={(speciality) => speciality?.specialityName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Speciality" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.categoryName : "");
                  }}
                  options={categoryList}
                  getOptionLabel={(category) => category?.categoryName}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Category" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Type" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue || "");
                  }}
                  options={statusList}
                  fullWidth
                  size="small"
                  renderInput={(params) => <TextField {...params} placeholder="Select Status" />}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
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
              <Grid item xs={12} sm={2} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.zoneName : "");
                    fetchEmployee(newValue ? newValue.zoneName : "")
                  }}
                  options={zoneList}
                  getOptionLabel={(zone) => zone?.zoneName}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Zone" style={{ fontSize: '15px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
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
              <Grid item xs={12} sm={3} md={3}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  onChange={(event, newValue) => {
                    fetchData(newValue ? `${newValue?.basicInformation?.firstName}${newValue?.basicInformation?.surname}` : "");
                  }}
                  options={employeeList}
                  value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname)}
                  getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Employee" style={{ fontSize: '15px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  fullWidth
                  options={top100Films}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Manager" style={{ fontSize: '15px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'end'} mb={2}>
                  <TextField type="text" size="small" placeholder="Search" onChange={(e) => fetchData(e.target.value)} />
                </Stack>
              </Grid>
            </Grid>
            <Card style={{ height: '72vh', marginTop: '10px' }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '72vh' }}>
                  Loading...
                </Box>
              ) : (
                <DataGrid
                  rows={doctorList}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  getRowId={(row) => row._id}
                />
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default Doctor;
