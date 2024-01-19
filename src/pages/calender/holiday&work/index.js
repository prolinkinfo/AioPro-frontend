import { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Button,
  Box,
  TextField,
  Autocomplete,
  Grid,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
// import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import Iconify from '../../../components/iconify';
import TableStyle from '../../../components/TableStyle';
import AddHoliday from './Add';
import Edit from './Edit';
import { apidelete } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import CustomMenu from '../../../components/CustomMenu';
import ImportFileModel from './components/ImportFileModel';
import holidayworksamFile from '../../../assets/files/holiday&work_samFile.xlsx'
import { fetchHolidayCalendarData } from '../../../redux/slice/GetHolidayCalendarSlice';

// ----------------------------------------------------------------------

const Holiday = () => {
  const [holidayList, setHolidayList] = useState([]);

  const [holidayData, setHolidayData] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const [isOpenImport, setisOpenImport] = useState(false);
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

//   const csvColumns = [
//     { Header: "Zone", accessor: "zone" },
//     { Header: "Date", accessor: "holidayDate" },
//     { Header: "Occasion", accessor: "holidayName" },
   
// ];

// const downloadExcel = () => {
//     const AllRecords = holidayList?.map((rec) => {
//         const selectedFieldsData = {};
//         csvColumns.forEach((item) => {
//             const accessor = item.accessor;
//             // Check if the accessor has nested properties
//             if (accessor.includes('.')) {
//                 const nestedProperties = accessor.split('.');
//                 let nestedValue = rec;
//                 nestedProperties.forEach((prop) => {
//                     nestedValue = nestedValue?.[prop];
//                 });
//                 selectedFieldsData[accessor] = nestedValue;
//             } else {
//                 selectedFieldsData[accessor] = rec[accessor];
//             }
//         });
//         return selectedFieldsData;
//     });
//     convertJsonToExcel(AllRecords, csvColumns, 'work&holiday');
// };

// const convertJsonToExcel = (jsonArray, csvColumns, fileName) => {
//     const csvHeader = csvColumns.map((col) => col.Header);
//     const csvContent = [
//         csvHeader,
//         ...jsonArray.map((row) => csvColumns.map((col) => row[col.accessor])),
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(csvContent);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

//     // Auto-size columns
//     const colWidths = csvContent[0]?.map((col, i) => {
//         return {
//             wch: Math.max(...csvContent?.map((row) => row[i]?.toString()?.length)),
//         };
//     });
//     ws['!cols'] = colWidths;

//     XLSX.writeFile(wb, `${fileName}.xlsx`);
// };
const downloadSamFile = () => {
  window.open(holidayworksamFile)
}
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
      {/* import File */}
      <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

      <AddHoliday
        isOpenAdd={isOpenAdd}
        handleCloseAdd={handleCloseAdd}
        fetchHolidayCalendarData={fetchHolidayCalendarData}
      />

      <TableStyle>
        <Box width="100%" pt={3}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"}>
              <Stack direction={"row"} spacing={2}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                  Add New
                </Button>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Upload File" arrow>
                  <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} onClick={() => setisOpenImport(true)}>
                    Import
                  </Button>
                </Tooltip>
                <Tooltip title="Download Sample File" arrow>
                  <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} onClick={downloadSamFile}>
                    Download
                  </Button>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    fetchData(newValue ? newValue.zoneName : '');
                  }}
                  options={zoneList}
                  getOptionLabel={(zone) => zone?.zoneName}
                  sx={{ width: 250 }}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} style={{ fontSize: '12px' }} placeholder="Select Zone" />
                  )}
                />
                <TextField
                  type='text'
                  size='small'
                  placeholder='Search'
                  onChange={(e) => fetchData(e.target.value)}
                />
              </Stack>
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
