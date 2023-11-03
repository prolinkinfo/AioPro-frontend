import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, nbNO } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FcFlowChart } from 'react-icons/fc';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Iconify from '../../components/iconify';
import { allusers, apidelete, apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import DeleteModel from '../../components/Deletemodle';
import ChemistAdd from './addChemist';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, chemistGetApi }) {
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

  const handleCloseDelete = () => {
    setIsOpenDeleteModel(false);
  };

  const handleOpenDelete = () => {
    setIsOpenDeleteModel(true);
  };

  const deleteManyOpd = async (data) => {
    const response = await deleteManyApi('/api/chemist/deleteMany', data);
    if (response?.status === 200) {
      chemistGetApi();
      handleCloseDelete();
    }
  };

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && (
        <Button
          variant="text"
          sx={{ textTransform: 'capitalize' }}
          startIcon={<DeleteOutline />}
          onClick={handleOpenDelete}
        >
          Delete
        </Button>
      )}
      <DeleteModel
        isOpenDeleteModel={isOpenDeleteModel}
        handleCloseDeleteModel={handleCloseDelete}
        deleteData={deleteManyOpd}
        id={selectedRowIds}
      />
    </GridToolbarContainer>
  );
}

export const Chemist = () => {
  const [opdList, setOpdList] = useState([]);
  const [chemistList, setChemistList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [isOpenView, setIsOpenView] = useState(false);
  const [opdData, setOpdData] = useState({});
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem('user'));

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleOpenView = () => setIsOpenView(true);
  const handleCloseView = () => setIsOpenView(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const dateFormat = 'MMM DD, YYYY';

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/place/${latitude}N+${longitude}E/@${latitude},${longitude},15z`;
    window.open(url, '_blank');
  };

  const columns = [
    {
      field: 'event',
      headerName: 'Event',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          // setdata(data);
          // handleOpenevent();
        };
        return (
          <div>
            {/* <Link to={`/dashboard/event/${params?.row?._id}`}>
              <EventNoteIcon />
            </Link> */}
            <button style={{padding:"0px 10px",cursor:"pointer",border:"none",backgroundColor:'transparent'}} onClick={()=>openGoogleMaps(21.229395,72.897493)}>
              <LocationOnIcon />
            </button>
          </div>
        );
      },
    },
    {
      field: 'doctorName',
      headerName: 'Dr Name',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'doctorMslNumber',
      headerName: 'Dr Msl Number',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'shopName',
      headerName: 'Shop Name',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'chemisContactNumber',
      headerName: 'Chemis Contact Number',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'pincode',
      headerName: 'Pincode',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    // {
    //   field: 'state',
    //   headerName: 'state',
    //   cellClassName: 'name-column--cell--capitalize',
    //   flex: 2,
    // },
    // {
    //   field: 'city',
    //   headerName: 'city',
    //   cellClassName: 'name-column--cell--capitalize',
    //   flex: 2,
    // },
    {
      field: 'chemistAddress',
      headerName: 'Chemist Address',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'contactPersonName',
      headerName: 'Contact Person Name',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'contactPersonNumber',
      headerName: 'Contact Person Number',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) =>  (
          <Box>
            <Button
              variant="outlined"
              style={{
                color: params.value === 'active' ? '#22C55E' : '#B61D18',
                // background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                border: 'none',
                padding:'0px'
              }}
            >
              {params.value}
            </Button>
          </Box>
        )
    },
  ];

  // <button
  //   style={{ padding: '0px 10px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}
  //   onClick={() => openGoogleMaps(21.229395, 72.897493)}
  // >
  //   <LocationOnIcon />
  // </button>;

  const chemistGetApi = async () => {
    const result = await apiget(`/api/chemist`);
    if (result && result.status === 200) {
      setChemistList(result?.data);
    }
  };

  useEffect(() => {
    chemistGetApi();
  }, []);


  return (
    <>
      <ChemistAdd isOpen={isOpen} handleClose={handleClose} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Chemist List</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            Add new
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '700px', paddingTop: '15px' }}>
              <DataGrid
                rows={chemistList}
                columns={columns}
                components={{ Toolbar: () => CustomToolbar({ selectedRowIds, chemistGetApi }) }}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                getRowId={(row) => row._id}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};
