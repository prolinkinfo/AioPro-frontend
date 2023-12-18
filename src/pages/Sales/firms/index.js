import React from 'react';
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';

const Firms = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 120,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          console.log(data, 'data');
        };
        return (
          <Box onClick={handleClick}>
            <ActionBtn data={[{ name: 'View' }, { name: 'Edit' }]} />
          </Box>
        );
      },
    },
    { field: 'doctorId', headerName: 'Doctor ID', width: 120 },
    { field: 'doctorName', headerName: 'Doctor Name', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'hospitalName', headerName: 'Hospital Name', width: 130 },
    { field: 'employeeName', headerName: 'Employee Name', width: 130 },
    { field: 'immediateSenior', headerName: 'Immediate Senior', width: 130 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
    { field: 'speciality', headerName: 'Speciality', width: 130 },
    { field: 'qualification', headerName: 'Qualification', width: 130 },
    { field: 'division', headerName: 'Division', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'zone', headerName: 'Zone', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'dateOfBirth', headerName: 'DOB', width: 130 },
    { field: 'anniversaryDate', headerName: 'Anniversary', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'firm', headerName: 'Firm', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
  ];

  const rows = [
    {
      id: 1,
      visitId: '1001383',
      doctorId: '525',
      doctorName: 'T.k. Saikiya',
      clinicAddress: 'jai nagar Rd, Kamla Nehru Nagar, Yadav Colony, Jabalpur, Madhya Pradesh 482002, India',
      zone: 'Madhya Pradesh',
      city: 'Jabalpur',
      employeeName: 'Vaibhav Shrivastava',
      date: '20/11/2016',
      status: 'open',
    },
    {
      id: 2,
      visitId: '1001355',
      doctorId: '1650',
      doctorName: 'Sarita Singh',
      clinicAddress: 'Panna Khajuraho Rd, Satna, Madhya Pradesh 485001, India',
      zone: 'Madhya Pradesh',
      city: 'Satna',
      employeeName: 'Vikas Gautam',
      date: '20/11/2016',
      status: 'open',
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

  const StatusList = [{ label: 'Approved',value:'approved' }, { label: 'Unapproved',value:'unapproved' }];
  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Firms</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link to={`/${userRole}/dashboard/sales/firms/add`} style={{ color: 'white', textDecoration: 'none' }}>
                Add Firm
              </Link>
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Visit
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />}>
              Export
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
                  // value={StatusList.find((option) => option.value === formik.values.Language)}
                  // onChange={(e, value) => formik.setFieldValue('status', value?.value || null)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Status" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Firm Type" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Division" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Zone" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select City" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Employee" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2} md={1.7}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Manager" style={{ fontSize: '12px' }} />
                  )}
                />
              </Grid>
            </Grid>
            <Card style={{ height: '72vh', marginTop: '10px' }}>
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

export default Firms;
