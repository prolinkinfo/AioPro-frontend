import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, nbNO } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FcFlowChart } from 'react-icons/fc';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate, Link } from 'react-router-dom';
import Iconify from '../../components/iconify';

import { allusers, apidelete, apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import DeleteModel from '../../components/Deletemodle';
import OpdAdd from './Add'

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchOpd }) {
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCloseDelete = () => {
    setIsOpenDeleteModel(false);
  };

  const handleOpenDelete = () => {
    setIsOpenDeleteModel(true);
  };

  const deleteManyOpd = async (data) => {
    const response = await deleteManyApi('/api/opd/deleteMany', data);
    if (response?.status === 200) {
      fetchOpd();
      handleCloseDelete();
    }
  };

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 &&  (
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

const Opd = () => {
  const [opdList, setOpdList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const navigate = useNavigate();


  const handleSelectionChange = (selectionModel) => {
    console.log(selectedRowIds,"selectionModel")
    setSelectedRowIds(selectionModel);
  };

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const user = JSON.parse(localStorage.getItem('user'))

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 2,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: 'location',
      headerName: 'Location',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'doctors',
      headerName: 'Doctors',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },

  ];

  const fetchOpd = async () => {
    const result = await apiget('/api/opd')
    if (result && result.status === 200) {
      setOpdList(result?.data)
    }
  }

  useEffect(() => {
    fetchOpd();
  }, [])


  return (
    <>
      <OpdAdd isOpen={isOpen} handleClose={handleClose} fetchOpd={fetchOpd}/>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Opd List</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            New Opd
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '700px', paddingTop: '15px' }}>
              <DataGrid
                rows={opdList}
                columns={columns}
                components={{ Toolbar: () => CustomToolbar({ selectedRowIds,fetchOpd }) }}
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

export default Opd;
