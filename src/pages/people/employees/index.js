import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import AddAdministrator from './Add';

const Employees = () => {

  const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();
  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          console.log(data, 'data');
        };
        return (
          <Box onClick={handleClick}>
            <Button>Edit</Button>
          </Box>
        );
      },
    },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'assignTo', headerName: 'Assign To', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'contact', headerName: 'Contact', flex: 1 },
    { field: 'division', headerName: 'Division / Department', flex: 1 },
    { field: 'zone', headerName: 'Zone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'DFB', headerName: 'Date of Birth', flex: 1 },
    { field: 'signup', headerName: 'Signup Date & Time', flex: 1 },
    { field: 'lastSyncDate', headerName: 'Last sync Date & time', flex: 1 },
    { field: 'ApkVersion', headerName: 'Apk Version', flex: 1 },
    // { field: 'mobile', headerName: 'Mobile',flex: 1 },
    { field: 'os', headerName: 'OS', flex: 1 },
    { field: 'inactiveDate', headerName: 'Inactive Date', flex: 1 },
    { field: 'inactiveReson', headerName: 'Inactive Reson', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      firmId: '1001383',
      firmName: 'T.k. Saikiya',
      visitAddress: '1, Akurli Road, Ashok Nagar, Kandivali East, Mumbai, Maharashtra 400101, India',
      firmAddress: '1, Akurli Road, Ashok Nagar, Kandivali East, Mumbai, Maharashtra 400101, India',
      zone: 'Madhya Pradesh',
      city: 'Jabalpur',
      employeeName: 'Vaibhav Shrivastava',
      visitDate: '20/11/2016',
      status: 'open',
    },
  ];
  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Employees</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            <Link
              to={`/${userRole}/dashboard/people/employees/add`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Add Employees
            </Link>
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default Employees;
