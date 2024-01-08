import { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Button,
  Box,
  TextField,
  Autocomplete,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
// import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../components/iconify';
import TableStyle from '../../../components/TableStyle';
import AddHoliday from './Add';
import Edit from './Edit';
import { apidelete } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle';
import ImportFile from './ImportFile';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchHolidayCalendarData } from '../../../redux/slice/GetHolidayCalendarSlice';
import CustomMenu from '../../../components/CustomMenu';

// ----------------------------------------------------------------------

const Holiday = () => {
  const [holidayList, setHolidayList] = useState([]);

  const [holidayData, setHolidayData] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [id, setId] = useState('');
  const [userAction, setUserAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true);
  const handleCloseEdit = () => setIsOpenEdit(false);
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true);
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false);
  const holidayCalendar = useSelector((state) => state?.getHolidayCalendar?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const [fileImport, setFileImport] = useState(false);

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data, event) => {
          setHolidayData(data);
          setAnchorEl(event.currentTarget);
        };
        return (
          <Box>
            <Edit
              isOpenEdit={isOpenEdit}
              handleCloseEdit={handleCloseEdit}
              fetchHolidayCalendarData={fetchHolidayCalendarData}
              data={holidayData}
            />
            <DeleteModel
              isOpenDeleteModel={isOpenDeleteModel}
              handleCloseDeleteModel={handleCloseDeleteModel}
              deleteData={deleteHolidayData}
              id={id}
            />
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
    {
      field: 'zone',
      headerName: 'Zone',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
    },
    {
      field: 'holidayDate',
      headerName: 'Date',
      flex: 1,
      valueFormatter: (params) => {
        return moment(params.value).format('MM/DD/YYYY');
      },
    },
    {
      field: 'holidayName',
      headerName: 'Occasion',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
    },
  ];


  const deleteHolidayData = async (id) => {
    console.log('data', id);
    const result = await apidelete(`/api/holidaycalendar/${id}`);
    setUserAction(result);
  };

  const fetchData = async (searchText) => {
    const filtered = holidayCalendar?.filter(
      ({ holidayName, zone }) =>
        holidayName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        zone?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    setHolidayList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : holidayCalendar);
  };

  useEffect(() => {
    dispatch(fetchHolidayCalendarData());
    dispatch(fetchZoneData());
  }, [userAction]);

  useEffect(() => {
    fetchData();
  }, [holidayCalendar]);

  return (
    <>
      <ImportFile isOpen={fileImport} handleClose={setFileImport} />

      <AddHoliday
        isOpenAdd={isOpenAdd}
        handleCloseAdd={handleCloseAdd}
        fetchHolidayCalendarData={fetchHolidayCalendarData}
      />

      <Stack direction="row" alignItems="center" justifyContent="end">
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
          Add new
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: '15px' }}
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setFileImport(true)}
        >
          Import
        </Button>
      </Stack>
      <TableStyle>
        <Box width="100%" pt={3}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} py={2}>
            <Grid item xs={12} sm={3} md={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, newValue) => {
                  fetchData(newValue ? newValue.zoneName : '');
                }}
                options={zoneList}
                getOptionLabel={(zone) => zone?.zoneName}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} style={{ fontSize: '12px' }} placeholder="Select Zone" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={9} display={'flex'} justifyContent={'end'}>
              <TextField type="text" size="small" placeholder="Search" onChange={(e) => fetchData(e.target.value)} />
            </Grid>
          </Grid>

          <Card style={{ height: '72vh' }}>
            <DataGrid rows={holidayList} columns={columns} getRowId={(row) => row._id} />
          </Card>
        </Box>
      </TableStyle>
    </>
  );
};

export default Holiday;
