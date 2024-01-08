/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import { fetchFirmVisitData } from '../../../redux/slice/GetFirmVisitSlice'
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice'
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice'
import { fetchCityData } from '../../../redux/slice/GetCitySlice'
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchLeaveEntitlementData } from '../../../redux/slice/GetLeaveEntitlementSlice';
import CustomMenu from '../../../components/CustomMenu'
import DeleteModel from '../../../components/Deletemodle'

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const yearList = [
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
]
const filterTypes = [
  "Employee",
  "Entitlement",
  "Type",
  "Status",
]
const status = [
  "Pending",
  "Cancelled",
  "Approved ",
  "Rejected",
]
const type = [
  "HALFDAY",
  "FULLDAY",
  "MULTIPLE",
]

const LeaveManagement = () => {

  const [id, setId] = useState('')
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const dispatch = useDispatch();
  const [firmVisitList, setFirmVisitList] = useState([])
  const [filterType, setFilterType] = useState('')
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const employeeList = useSelector((state) => state?.getEmployee?.data)
  const leaveEntitlementList = useSelector((state) => state?.getLeaveEntitlement?.data)

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 250,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data, e) => {
          setAnchorEl(e.currentTarget);
          setId(data?._id)
        };
        return (
          <Box>
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel}  id={id} />

            <CustomMenu
              open={open}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              params={params}
              id={id}
              type={"edit"}
              handleOpenDeleteModel={handleOpenDeleteModel}
            />
          </Box>
        );
      },
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      width: 300,
      renderCell: (params) => {
        return (
          <Box>
            {fullName(params?.row?.employeeName)}
          </Box>
        );
      },
    },
    { field: 'leaveType', headerName: 'Leave Type', width: 200 },
    { field: 'timeFrame', headerName: 'Time Frame', width: 200 },
    {
      field: 'fromDate',
      headerName: 'From Date',
      width: 120,
      renderCell: (params) => {
        return (
          <Box>
            {moment(params?.row?.fromDate).format("DD/MM/YYYY")}
          </Box>
        );
      },
    },
    {
      field: 'toDate',
      headerName: 'To Date',
      width: 120,
      renderCell: (params) => {
        return (
          <Box>
            {moment(params?.row?.toDate).format("DD/MM/YYYY")}
          </Box>
        );
      },
    },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 300,
    },
    {
      field: 'count',
      headerName: 'Count',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },


  ];



  const fullName = (name) => {
    let separatedNames = name.split(/(?=[A-Z])/);
    let firstName = separatedNames[0];
    let lastName = separatedNames[1];

    return `${firstName} ${lastName}`
  }


  const fetchData = (searchText) => {
    // const filtered = firmVisit?.filter(({ firmId, firmName, visitAddress, firmAddress, city, zone, employeeName, visitDate, status }) =>
    //   firmId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   firmName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   visitAddress?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   firmAddress?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   city?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   moment(visitDate)?.format("YYYY-MM-DD")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   moment(visitDate)?.format("MM")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   moment(visitDate)?.format("YYYY")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
    //   status?.toLowerCase()?.includes(searchText?.toLowerCase())
    // );
    // setFirmVisitList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : firmVisit);
  }





  useEffect(() => {
    dispatch(fetchEmployeeData());
    dispatch(fetchLeaveEntitlementData());
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Leave Management</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    fetchData(newValue || '');
                  }}
                  fullWidth
                  options={monthList}
                  getOptionLabel={(month) => month}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder='Select Month'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  size="small"
                  onChange={(event, newValue) => {
                    fetchData(newValue || '');
                  }}
                  fullWidth
                  options={yearList}
                  getOptionLabel={(year) => year}
                  style={{ textTransform: 'capitalize' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ textTransform: 'capitalize' }}
                      placeholder='Select Year'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => {
                    setFilterType(value)
                  }}
                  id="combo-box-demo"
                  value={filterType}
                  options={filterTypes}
                  size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} placeholder='Select Filter Type' style={{ fontSize: "12px" }} />}
                />
              </Grid>
              {
                filterType === "Employee" &&
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
              }
              {
                filterType === "Entitlement" &&
                <Grid item xs={12} sm={4} md={2}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, newValue) => {
                      fetchData(newValue ? newValue.entitlementName : "");
                    }}
                    options={leaveEntitlementList}
                    getOptionLabel={(leaveEntitlement) => leaveEntitlement?.entitlementName}
                    fullWidth
                    size='small'
                    renderInput={(params) => <TextField {...params} placeholder='Select Entitlement' />}
                  />
                </Grid>
              }
              {
                filterType === "Type" &&
                <Grid item xs={12} sm={4} md={2}>
                  <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                      fetchData(newValue || '');
                    }}
                    id="combo-box-demo"
                    options={type}
                    size='small'
                    fullWidth
                    renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px" }} />}
                  />
                </Grid>
              }
              {
                filterType === "Status" &&
                <Grid item xs={12} sm={4} md={2}>
                  <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                      fetchData(newValue || '');
                    }}
                    id="combo-box-demo"
                    options={status}
                    size='small'
                    fullWidth
                    renderInput={(params) => <TextField {...params} placeholder='Select Status' style={{ fontSize: "12px" }} />}
                  />
                </Grid>
              }

              <Grid item xs={12} sm={4} md={2} >
                <TextField
                  type='text'
                  size='small'
                  fullWidth
                  placeholder='Search'
                  onChange={(e) => fetchData(e.target.value)}
                />
              </Grid>
            </Grid>
            <Card style={{ height: '72vh', paddingTop: '15px' }}>
              <DataGrid
                rows={firmVisitList}
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
  )
}

export default LeaveManagement
