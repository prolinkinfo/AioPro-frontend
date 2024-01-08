import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import { fetchModeOfTravelData } from '../../../redux/slice/GetModeOfTravelSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import Add from './Add';
import CustomMenu from '../../../components/CustomMenu';
import DeleteModel from '../../../components/Deletemodle'
import Edit from './Edit';

const Standardfarechart = () => {

  const [fareChartList, setFareChart] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [fareChartData, setFareChartData] = useState({})
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [id, setId] = useState('')
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const modeList = useSelector((state) => state?.getModeOfTravel?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const employee = useSelector((state) => state?.getEmployee?.data);

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data, e) => {
          setAnchorEl(e.currentTarget);
          setFareChartData(data)
          setId(data?._id)
        };
        return (
          <Box>
            <Edit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} data={fareChartData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} id={id} />

            <CustomMenu
              open={open}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleOpenEdit={handleOpenEdit}
              params={params}
              handleOpenDeleteModel={handleOpenDeleteModel}
            />
          </Box>
        );
      },
    },
    { field: 'routeId', headerName: 'Route Id', width: 120 },
    { field: 'routeName', headerName: 'Route Name', width: 200 },
    { field: 'citiesInRoute', headerName: 'Cities In Route	', width: 200 },
    {
      field: 'zone',
      headerName: 'Zone',
      width: 200,
    },
    {
      field: 'division',
      headerName: 'Division',
      width: 150,
    },
    {
      field: 'routeFor',
      headerName: 'Route For',
      width: 200,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 200,
    },
    {
      field: 'mode',
      headerName: 'Mode',
      width: 120,
    },
    {
      field: 'distance',
      headerName: 'Distance(KM)	',
      width: 120,
    },
    {
      field: 'fare',
      headerName: 'Fare',
      width: 90,
    },
  ];
  const rows = [
    {
      id: "1", routeId: "1", routeName: "Bilaspur to Champa	", citiesInRoute: "JAJGIR NAILA	", zone: "Chhattisgarh", division: "Main", routeFor: "JAYPRAKASH SAHU	", designation: "All", mode: "mode1", distance: "120", fare: "300"

    }
  ]

  const fetchData = (searchText) => {
    const filtered = rows?.filter(({ routeId, routeName, citiesInRoute, zone, division, routeFor, designation, mode, distance, fare }) =>
      routeId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      routeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      citiesInRoute?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      division?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      routeFor?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      designation?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      mode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      distance?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      fare?.toLowerCase()?.includes(searchText?.toLowerCase())

    );
    setFareChart(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : rows);
  }

  const fetchEmployee = (searchText) => {
    if (employee) {
      const filtered = employee?.filter(({ contactInformation }) =>
        contactInformation?.division?.toLowerCase() === searchText?.toLowerCase() ||
        contactInformation?.zone?.toLowerCase() === searchText?.toLowerCase()
      )
      setEmployeeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : employee)

    }
  }

  useEffect(() => {
    dispatch(fetchModeOfTravelData());
    dispatch(fetchDivisionData());
    dispatch(fetchZoneData());
    dispatch(fetchEmployeeData());
  }, [])

  useEffect(() => {
    fetchData();
    fetchEmployee();
  }, [employee])

  return (
    <div>
      {/* add */}
      <Add isOpen={isOpenAdd} handleClose={handleCloseAdd} />

      <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Standard Fare Chart</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} >
              Export
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue?.mode : "");
                  }}
                  options={modeList?.filter((item) => item?.status === "active")}
                  getOptionLabel={(mode) => mode?.mode}
                  size='small'
                  fullWidth
                  style={{ textTransform: "capitalize" }}
                  renderInput={(params) => <TextField {...params} placeholder='Select Mode' style={{ fontSize: "12px", textTransform: "capitalize" }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue?.divisionName : "");
                    fetchEmployee(newValue ? newValue?.divisionName : "");
                  }}
                  options={divisionList}
                  getOptionLabel={(division) => division?.divisionName}
                  size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} placeholder='Select Division' style={{ fontSize: "12px" }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Autocomplete
                  disablePortal
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.zoneName : "");
                    fetchEmployee(newValue ? newValue.zoneName : "");
                  }}
                  id="combo-box-demo"
                  options={zoneList}
                  getOptionLabel={(zone) => zone?.zoneName}
                  size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "12px" }} />}
                />
              </Grid>
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
              <Grid item xs={12} sm={4} md={2}>
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
                rows={fareChartList}
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

export default Standardfarechart;
