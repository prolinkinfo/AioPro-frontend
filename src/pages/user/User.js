import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FcFlowChart } from 'react-icons/fc';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate, Link } from 'react-router-dom';
import Iconify from '../../components/iconify';
import AddUser from './Add';

import Event from './Event';
import { allusers, apidelete } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import DeleteModel from '../../components/Deletemodle';
import EditContact from './Edit';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCloseDelete = () => {
    setOpendelete(false);
  };

  const handleOpenDelete = () => {
    setOpendelete(true);
  };

  const deleteManyContact = async (data) => {
    console.log('data12345', data.join(''));
    const response = await apidelete('/api/users', data.join('').toString());
    console.log('responsedeleteuser', response);
    if (response?.status === 200) {
      fetchdata();
      handleCloseDelete();
    }
  };

  return (
    <GridToolbarContainer>
      {console.log('user?.id!==selectedRowIds', user?.id, selectedRowIds)}
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && user?.role === 'admin' && !selectedRowIds.includes(user?.id) && (
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
        opendelete={opendelete}
        handleClosedelete={handleCloseDelete}
        deletedata={deleteManyContact}
        id={selectedRowIds}
      />
    </GridToolbarContainer>
  );
}

const User = () => {
  const [alluser, setAllUser] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [id, setId] = useState('');
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openevent, setOpenevent] = useState(false);
  const handleOpenevent = () => setOpenevent(true);
  const handleCloseevent = () => setOpenevent(false);

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 2,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/user/view/${params.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      },
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      flex: 2,
    },
    {
      field: 'role',
      headerName: 'Role',
      cellClassName: 'name-column--cell--capitalize',
      flex: 2,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleFirstNameClick = async (data) => {
          setId(data);
          console.log('datarenderCell', data);
          handleOpenEdit();
        };
        return (
          <Box>
            <EditContact open={openEdit} handleClose={handleCloseEdit} id={id} fetchdata={fetchdata} />
            <Stack direction={'row'} spacing={2}>
              <Button variant="text" size="small" color="primary" onClick={() => handleFirstNameClick(params)}>
                <EditIcon />
              </Button>
            </Stack>
          </Box>
        );
      },
    },
    {
      field: 'event',
      headerName: 'Event',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          setdata(data);
          handleOpenevent();
        };
        return (
          <div>
            <Link to={`/dashboard/event/${params?.row?._id}`}>
              <EventNoteIcon />
            </Link>
          </div>
        );
      },
    },
    {
      field: 'hierarchy',
      headerName: 'Hierarchy',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          setdata(data);
          handleOpenevent();
        };
        return (
          <div>
            {console.log('datarenderCell', params)}
            <Link to={`/dashboard/hierarchy/${params?.row?._id}`}>
              <FcFlowChart color="black" size={22} />
            </Link>
          </div>
        );
      },
    },
  ];

  async function fetchdata() {
    const result = await allusers('/api/users');
    console.log('resultwwe', result);
    if (result && result.status === 200) {
      setAllUser(result?.data);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [openAdd, openEdit]);

  return (
    <>
      <AddUser open={openAdd} handleClose={handleCloseAdd} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">User</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
            New User
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '700px', paddingTop: '15px' }}>
              <DataGrid
                rows={alluser}
                columns={columns}
                components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchdata }) }}
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

export default User;
