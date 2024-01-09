import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { apiget } from '../../../service/api';

const Approveplan = () => {
  const [tourList, setTourList] = useState([]);
  const [tour, setTour] = useState([]);
  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
  }, [dispatch]);

  const initialValues = {
    zone: '',
    division: '',
    role: '',
    employees: '',
    form: '',
    to: '',
  };

  const monthNames = [
    { label: 'January', i: 0 },
    { label: 'February', i: 1 },
    { label: 'March', i: 2 },
    { label: 'April', i: 3 },
    { label: 'May', i: 4 },
    { label: 'June', i: 5 },
    { label: 'July', i: 6 },
    { label: 'August', i: 7 },
    { label: 'September', i: 8 },
    { label: 'October', i: 9 },
    { label: 'November', i: 10 },
    { label: 'December', i: 11 },
  ];

  const yearList = [
    { label: '2015' },
    { label: '2016' },
    { label: '2017' },
    { label: '2018' },
    { label: '2019' },
    { label: '2020' },
    { label: '2021' },
    { label: '2022' },
    { label: '2023' },
    { label: '2024' },
    { label: '2025' },
    { label: '2026' },
    { label: '2027' },
  ];

  const fetchData = async (searchText) => {
    const filtered = tourList?.filter(
      ({ month, year, status }) =>
        month?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        year?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        status?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    setTour(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : tourList);
  };

  // formik
  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      const result = await apiget(`/api/tourplan`);
      if (result && result.status === 200) {
        setTourList(result?.data.result);
      }
    },
  });

  const getApi = async () => {
    const result = await apiget(`/api/tourplan`);
    if (result && result.status === 200) {
      setTourList(result?.data.result);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    fetchData();
  }, [tourList]);

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

    {
      field: 'employee',
      headerName: 'Employee',
      width: 180,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 170,
    },
    {
      field: 'month',
      headerName: 'Month',
      width: 150,
    },

    {
      field: 'Fromdate',
      headerName: 'Whole Month Tour plane',
      width: 240,
      renderCell: (params) => {
        return (
          <Box>
            <Typography>yes</Typography>
          </Box>
        );
      },
    },
    {
      field: 'missdate',
      headerName: 'Tour Plane miss Date',
      width: 190,
    },

    {
      field: 'RespondBy',
      headerName: 'Approved By',
      width: 180,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
  ];

  const rows = [
    {
      id: 1,
      EmployeeCode: '1001383',
      doctorId: '525',
      EmployeeName: 'T.k. Saikiya',
      clinicAddress: 'jai nagar Rd, Kamla Nehru Nagar, Yadav Colony, Jabalpur, Madhya Pradesh 482002, India',
      designation: 'BDE',
      month: 'January',
      RespondBy: 'Vaibhav Shrivastava',
      date: '14/12/2023',
      Fromdate: 'yes',
      Todate: '19/12/2023',
      status: 'Approved',
      department: 'main',
      type: 'multiple',
      Leavecount: '2',
    },
    {
      id: 2,
      EmployeeCode: '1001384',
      doctorId: '1650',
      EmployeeName: 'Sarita Singh',
      clinicAddress: 'Panna Khajuraho Rd, Satna, Madhya Pradesh 485001, India',
      designation: 'BDE',
      month: 'January',
      RespondBy: 'Vikas Gautam',
      Fromdate: 'yes',
      Todate: '18/12/2023',
      department: 'main',
      type: 'fullday',
      status: 'Approved',
      Leavecount: '1',
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

  const StatusList = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
  ];

  const RoleList = [
    { label: 'Regional Sales Manager (RSM)', value: 'RSM' },
    { label: 'Area Business Manager (ABM)', value: 'ABM' },
    { label: 'Businee  Develpement  Executive (BDE)', value: 'BDE' },
  ];
  return (
    <div>
      <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Approve Tour Plan</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction="row" spacing={2} my={2} width='60%'>
              <Autocomplete
                disablePortal
                name="month"
                options={monthNames}
                getOptionLabel={(option) => option.label} // Specify the label property
                fullWidth
                size="small"
                onChange={(e, value, i) => {
                  fetchData(value ? value?.label : '');
                }} // Set the label as the value
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Month"
                    // error={formik.touched.month && Boolean(formik.errors.month)}
                    // helperText={formik.touched.month && formik.errors.month}
                  />
                )}
              />

              <Autocomplete
                disablePortal
                name="year"
                options={yearList}
                getOptionLabel={(option) => option.label} // Specify the label property
                fullWidth
                size="small"
                value={yearList.find((option) => option.label === year)}
                onChange={(e, value) => fetchData(value ? value?.label : '')} // Set the label as the value
                renderInput={(params) => <TextField {...params} placeholder="Select Year" />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                name="status"
                options={StatusList}
                size="small"
                onChange={(e, value) => fetchData(value ? value?.label : '')}
                getOptionLabel={({ label }) => label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="All Status" style={{ fontSize: '15px' }} />
                )}
              />
            </Stack>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={tour}
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

export default Approveplan;
