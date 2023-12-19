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

import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import { apidelete, apiget } from '../../../service/api';

const Firms = () => {
  const [firmsList, setFirmsList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firmId, setFirmId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const open = Boolean(anchorEl);

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
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        // console.log("params",params?.row?._id)
        // const handleClick = async (data) => {
        //   console.log(data, 'data');
        // };

        return (
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <SettingsIcon />
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
                <BorderColorIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Edit</span>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <VerticalAlignBottomIcon fontSize="10" />
                <span style={{ marginLeft: '20px' }}>Unapprove</span>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <VisibilityIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>View Log(s)</span>
              </MenuItem>
              <MenuItem onClick={() => handleClickOpenModel(params?.row?._id)}>
                <DeleteIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Delete</span>
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
    { field: '_id', headerName: 'Firm Id', width: 120 },
    {
      field: 'date',
      headerName: 'Date',
      renderCell: (params) => {
        return <Box>{dayjs(params?.row?.date).format('DD-MM-YYYY')} </Box>;
      },
      width: 130,
    },
    { field: 'firmCode', headerName: 'Firm Code', width: 130 },
    { field: 'firmName', headerName: 'Firm Name', width: 170 },
    { field: 'firmType', headerName: 'Firm Type', width: 120 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
    { field: 'contactPersonName', headerName: 'Contact Person Name', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'zone', headerName: 'Zone', width: 130 },
    { field: 'division', headerName: 'Division', width: 130 },
    { field: 'category', headerName: 'Firm Category', width: 130 },

    { field: 'assignedTo', headerName: 'Employee Assigned', width: 130 },
    { field: 'assignedFirm', headerName: 'Assigned Firm', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },

    { field: 'firstLevelManager', headerName: 'First Level Manager', width: 130 },
    { field: 'secondLevelManager', headerName: 'Second Level Manager', width: 130 },
    { field: 'thirdLevelManager', headerName: 'Third Level Manager', width: 130 },
    {
      field: 'dateOfBirth',
      headerName: 'DOB',
      renderCell: (params) => {
        return <Box>{dayjs(params?.row?.dateOfBirth).format('DD-MM-YYYY')} </Box>;
      },
      width: 130,
    },
    { field: 'panNumber', headerName: 'Pan Number', width: 130 },
    { field: 'drugLicenseNumber', headerName: 'Drug License Number', width: 130 },
    { field: 'foodLicenseNumber', headerName: 'Food License Number', width: 130 },

    { field: 'status', headerName: 'Status', width: 130 },
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

  async function fetchdata() {
    const result = await apiget('/api/firm');
    if (result && result.status === 200) {
      setFirmsList(result?.data?.result);
      console.log('result?.data', result?.data?.result);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const StatusList = [
    { label: 'Approved', value: 'approved' },
    { label: 'Unapproved', value: 'unapproved' },
  ];
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
                rows={firmsList}
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
    </div>
  );
};

export default Firms;
