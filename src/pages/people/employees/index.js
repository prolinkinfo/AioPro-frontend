import { Box, Button, Card, Container, Menu, MenuItem, Stack, Typography } from '@mui/material';
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

import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import AddAdministrator from './Add';
import { apidelete, apiget, deleteManyApi } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const Employees = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const employeeData = useSelector((state) => state?.getEmployee?.data);

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
              <DragIndicatorIcon />
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
        return <Box>{params?.row?.basicInformation?.division} </Box>;
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
    { field: 'status', headerName: 'Status', width: 200 },
  ];

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Employees</Typography>
          <Box>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link
                to={`/${userRole}/dashboard/people/employees/add`}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Add Employees
              </Link>
            </Button>
            <Button variant="contained" sx={{ m: '10px' }} startIcon={<Iconify icon="eva:plus-fill" />}>
              import
            </Button>
          </Box>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={employeeData}
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

export default Employees;
