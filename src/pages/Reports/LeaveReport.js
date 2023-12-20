import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';

import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify';
import ActionBtn from '../../components/actionbtn/ActionBtn';
import { fetchZoneData } from '../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../redux/slice/GetDivisionSlice';
import { fetchEmployeeData } from '../../redux/slice/GetEmployeeSlice';
import { apiget } from '../../service/api';

const LeaveReport = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [employe, setSemploye] = useState([]);
  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  const initialValues = {
    zone: '',
    division: '',
    role: '',
    employees: '',
    from: '',
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
        setLeaveList(result?.data.result);
      }
    },
  });

  const columns = [
    {
      field: 'EmployeeCode',
      headerName: 'Employee Code',
      renderCell: (params) => {
        console.log('2222', params);
        return <Box>{params?.row?.employees?.map((item) => item?.basicInformation?.employeesCode)} </Box>;
      },
      width: 130,
    },
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      renderCell: (params) => {
        return <Box>{params?.row?.employees?.map((item) => item?.basicInformation?.employeesName)} </Box>;
      },
      width: 180,
    },
    {
      field: 'department',
      headerName: 'Department/Division',
      renderCell: (params) => {
        return <Box>{params?.row?.employees?.map((item) => item?.contactInformation?.division)} </Box>;
      },
      width: 170,
    },
    {
      field: 'leaveType',
      headerName: 'Leave Type',
      renderCell: (params) => {
        return <Box>{params?.row?.leaveType} </Box>;
      },
      width: 150,
    },

    {
      field: 'leaveStartDate',
      headerName: 'From date',
      renderCell: (params) => {
        return <Box>{moment(params?.row?.leaveStartDate).format('MM-DD-YYYY')} </Box>;
      },
      width: 150,
    },
    {
      field: 'leaveEndDate',
      headerName: 'To date',
      renderCell: (params) => {
        return <Box>{moment(params?.row?.leaveEndDate).format('MM-DD-YYYY')} </Box>;
      },
      width: 150,
    },

    {
      field: 'RespondBy',
      headerName: 'Respond By',
      width: 180,
    },
    {
      field: 'dayOfLeave',
      headerName: 'Leave count',
      renderCell: (params) => {
        return <Box>{params?.row?.dayOfLeave} </Box>;
      },
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return <Box>{params?.row?.satatus} </Box>;
      },
      width: 120,
    },
  ];


  const StatusList = [{ label: 'Approved' }, { label: 'Pending' }, { label: 'Reject' }, { label: 'Cancelled' }];
  const RoleList = [
    { label: 'Regional Sales Manager (RSM)', value: 'RSM' },
    { label: 'Area Business Manager (ABM)', value: 'ABM' },
    { label: 'Businee  Develpement  Executive (BDE)', value: 'BDE' },
  ];

  async function fetchdata() {
    const result = await apiget('/api/employees');
    if (result && result.status === 200) {
      setSemploye(result?.data?.result);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Leave Report</Typography>
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
                name="division"
                options={divisionList}
                value={divisionList.find((item) => item.divisionName === formik.values.division) || null}
                onChange={(e, value) => formik.setFieldValue('division', value ? value.divisionName : '')}
                getOptionLabel={({ divisionName }) => divisionName}
                fullWidth
                size="small"
                renderInput={(params) => <TextField {...params} placeholder="Select Division" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                options={RoleList}
                name="role"
                size="small"
                value={RoleList.find((item) => item.label === formik.values.role)}
                onChange={(e, value) => formik.setFieldValue('role', value?.value || null)}
                getOptionLabel={({ label }) => label}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Employee role" style={{ fontSize: '15px' }} />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                name="employees"
                options={employe}
                value={
                  (employe &&
                    employe?.find((item) => item?.basicInformation?.employeesName === formik.values?.employees)) ||
                  null
                }
                onChange={(e, value) =>
                  formik.setFieldValue('employees', value ? value.basicInformation.employeesName : '')
                }
                getOptionLabel={(data) => data?.basicInformation?.employeesName}
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
                onChange={(e, value) => formik.setFieldValue('status', value?.label || null)}
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
                value={formik.values.to}
                onChange={formik.handleChange}
                fullWidth
                InputLabelProps={{ shrink: true, style: { display: 'none' } }}
                InputProps={{ placeholder: 'To Date' }}
                // label="To Data"
              />

              <Button variant="contained" onClick={formik.handleSubmit}>
                Go
              </Button>
            </Stack>

            {leaveList?.length > 0 ? (
              <Card style={{ height: '72vh' }}>
                <DataGrid
                  rows={leaveList}
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
            ) : (
              <Typography variant="h6" sx={{ marginTop: '15px', textAlign: 'center' }}>
                Please select the parameters to generate report.
              </Typography>
            )}
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default LeaveReport;
