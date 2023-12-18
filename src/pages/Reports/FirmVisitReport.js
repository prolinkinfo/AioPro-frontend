import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import ActionBtn from '../../components/actionbtn/ActionBtn';
import { fetchZoneData } from '../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../redux/slice/GetDivisionSlice';
import { apiget } from '../../service/api';

const VisitFirmReport = () => {
  const [farmList, setFarmList] = useState([]);
  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);

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

  // formik
  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      const result = await apiget(
        `/api/leave/report?startDate=${values.from}&endDate=${values.to}&zone=${values.zone}&division=${values.division}&role=${values.role}`
      );
      if (result && result.status === 200) {
        setFarmList(result?.data.result);
      }
    },
  });

  const columns = [
    // {
    //   headerName: 'Action',
    //   sortable: false,
    //   width: 120,
    //   // eslint-disable-next-line arrow-body-style
    //   renderCell: (params) => {
    //     const handleClick = async (data) => {
    //       console.log(data, 'data');
    //     };
    //     return (
    //       <Box onClick={handleClick}>
    //         <ActionBtn data={[{ name: 'View' }, { name: 'Edit' }]} />
    //       </Box>
    //     );
    //   },
    // },
    { field: 'EmployeeCode', headerName: 'Employee Code', width: 130 },
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      width: 180,
    },
    {
      field: 'department',
      headerName: 'Department/Division',
      width: 170,
    },
    {
      field: 'type',
      headerName: 'Leave Type',
      width: 150,
    },

    {
      field: 'Fromdate',
      headerName: 'From date',
      width: 150,
    },
    {
      field: 'Todate',
      headerName: 'To date',
      width: 150,
    },

    {
      field: 'RespondBy',
      headerName: 'Respond By',
      width: 180,
    },
    {
      field: 'Leavecount',
      headerName: 'Leave count',
      width: 120,
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
      zone: 'Madhya Pradesh',
      city: 'Jabalpur',
      RespondBy: 'Vaibhav Shrivastava',
      date: '14/12/2023',
      Fromdate: '18/12/2023',
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
      zone: 'Madhya Pradesh',
      city: 'Satna',
      RespondBy: 'Vikas Gautam',
      Fromdate: '18/12/2023',
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
    { label: 'Opene', value: 'opene' },
    { label: 'Close', value: 'close' },
    { label: 'Skipped', value: 'skipped' },
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
          <Typography variant="h4">Firm Visit Report</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction="row" spacing={2} my={2}>
              <Autocomplete
                disablePortal
                name="zone"
                options={zoneList}
                value={zoneList.find((zone) => zone.zoneName === formik.values.zone) || null}
                onChange={(e, value) => formik.setFieldValue('zone', value ? value.zoneName : '')}
                getOptionLabel={({ zoneName }) => zoneName}
                fullWidth
                size="small"
                renderInput={(params) => <TextField {...params} placeholder="Select Zone" />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                name="employee"
                options={top100Films}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} placeholder="All Employee" style={{ fontSize: '15px' }} />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                name="status"
                options={StatusList}
                size="small"
                value={StatusList.find((option) => option.label === formik.values.status)}
                onChange={(e, value) => formik.setFieldValue('status', value?.value || null)}
                getOptionLabel={({ label }) => label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="All Status" style={{ fontSize: '15px' }} />
                )}
              />
              <TextField
                name="from"
                type="date"
                size="small"
                // label="From Date"
                variant="outlined"
                value={formik.values.from}
                onChange={formik.handleChange}
                fullWidth
              />
              <TextField
                name="to"
                type="date"
                size="small"
                // label="To Date"
                value={formik.values.to}
                onChange={formik.handleChange}
                fullWidth
              />

              <Button variant="contained" onClick={formik.handleSubmit}>
                Go
              </Button>
            </Stack>
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
                // getRowId={(row) => row._id}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default VisitFirmReport;
