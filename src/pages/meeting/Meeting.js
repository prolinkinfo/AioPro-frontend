/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

// sections
// mock
import { apiget, deleteManyApi, getmeeting, deletemeetingApi, deleteManymeeting } from '../../service/api';
import DeleteModel from '../../components/Deletemodle';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import AddMeeting from '../../components/meeting/Addmeetings';
import Editmeeting from '../../components/meeting/Editmeetings';
// ----------------------------------------------------------------------
function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);

  const handleCloseDelete = () => setOpendelete(false);
  const handleOpenDelete = () => setOpendelete(true);

  const deleteManyMettings = async (data) => {
    console.log('data', data);
    if (data.length === 1) {
      const response = await deletemeetingApi('/api/meeting', data.join('').toString());
      if (response?.status === 200) {
        fetchdata();
        handleCloseDelete();
      }
    } else {
      const response = await deleteManymeeting('/api/meeting/deleteMany', data);
      console.log('deleteMany', response);
      if (response?.status === 200) {
        fetchdata();
        handleCloseDelete();
      }
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
        opendelete={opendelete}
        handleClosedelete={handleCloseDelete}
        deletedata={deleteManyMettings}
        id={selectedRowIds}
      />
    </GridToolbarContainer>
  );
}

const Meeting = () => {
  const [openMeeting, setOpenMeeting] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [allMeeting, setAllMeeting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('userRole');

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  // open Meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/meeting/view/${params.row._id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      },
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    // {
    //   field: allMeeting.relatedTo === "Lead" ? "lead_id" : "contact_id",
    //   headerName: "Related To",
    //   cellClassName: "name-column--cell name-column--cell--capitalize",
    //   flex: 1,
    //   renderCell: (params) => {
    //     const handleFirstNameClick = () => {
    //       navigate(params?.row?.relatedTo === "Lead" ? `/dashboard/lead/view/${params?.row?.lead_id?._id}` : `/dashboard/contact/view/${params?.row?.contact_id?._id}`)
    //     };
    //     return (
    //       <Box onClick={handleFirstNameClick}>
    //         {params?.row?.relatedTo === "Lead" ? `${params?.row?.lead_id?.firstName} ${params?.row?.lead_id?.lastName}` : `${params?.row?.contact_id?.firstName} ${params?.row?.contact_id?.lastName}`
    //         }
    //       </Box>
    //     );
    //   }
    // },
    {
      field: 'createdBy',
      headerName: 'createdBy',
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      flex: 1,
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
            <Editmeeting open={openEdit} handleClose={handleCloseEdit} id={id} fetchdata={fetchdata} />
            <Stack direction={'row'} spacing={2}>
              <Button variant="text" size="small" color="primary" onClick={() => handleFirstNameClick(params)}>
                <EditIcon />
              </Button>
            </Stack>
          </Box>
        );
      },
    },
  ];

  const fetchdata = async () => {
    const result = await getmeeting('/api/meeting');

    if (result && result.status === 200) {
      console.log('result', result?.data);
      const data = result?.data.filter((item) => item.userid === userid);

      console.log('result', data);
      setAllMeeting(data);
    }
  };
  const getdata = () => {};
  useEffect(() => {
    fetchdata();
  }, [userAction]);

  return (
    <>
      {/* Add Meeting */}
      <AddMeeting open={openMeeting} handleClose={handleCloseMeeting} setUserAction={setUserAction} getdata={getdata} />

      <Container>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Meetings List</Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMeeting}>
              New Meeting
            </Button>
          </Stack>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={allMeeting}
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

export default Meeting;
