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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Iconify from '../../components/iconify';
// sections
// mock
import AddContact from './Add';
import TableStyle from '../../components/TableStyle';
import { apiget, deleteManyApi } from '../../service/api';
import DeleteModel from '../../components/Deletemodle';
import EditContact from './Edit';
import Showmore from './Showmore';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);

  const handleCloseDelete = () => {
    setOpendelete(false);
  };

  const handleOpenDelete = () => {
    setOpendelete(true);
  };

  const deleteManyContact = async (data) => {
    console.log('data12345', data);
    // await deleteManyApi('contact/deletemany', data);
    // fetchdata();
    handleCloseDelete();
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
        deletedata={deleteManyContact}
        id={selectedRowIds}
      />
    </GridToolbarContainer>
  );
}

const Contact = () => {
  const [contactList, setContactList] = useState([
    {
      _id: 1,
      additionalEmailAddress: 'rajkumarbind555@gmail.com',
      address: 'gujrat',
      alternatePhoneNumber: 8115735444,
      createdBy: '64f716e557bcef5aac895ea0',
      dateOfBirth: '2023-09-08',
      emailAddress: 'jaysukh.specscale@gmail.com',
      firstName: 'raj ',
      gender: 'Male',
      instagramProfile: 'http://localhost:3000/login',
      lastName: 'bind',
      phoneNumber: 8115735448,
      preferencesForMarketingCommunications: 'Opt-out',
      preferredContactMethod: 'media',
      preferredLanguage: 'eng',
      referralContactName: 'wwe',
      referralSource: 'Professional Networks',
      relationshipToReferrer: 'errr',
      twitterProfile: 'http://localhost:3000/login',
    },
    {
      _id: 2,
      firstName: 'rajkumar',
      lastName: 'ind',
      phoneNumber: 8115735448,
      gender: 'male',
      action: 'reply',
      emailAddress: 'raj123456@gmail.com',
    },
    {
      _id: 3,
      firstName: 'vaibhav',
      lastName: 'modi',
      phoneNumber: 1234567890,
      gender: 'male',
      action: 'reply',
      emailAddress: 'vaibhav123456@gmail.com',
    },
  ]);
  const [userAction, setUserAction] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [showdata, setshowdata] = useState({});
  const [openshowdata, setopenshowdata] = useState(false);
  const handleOpendatashow = () => setopenshowdata(true);
  const handleClosedatashow = () => setopenshowdata(false);

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('userRole');

  // open add model
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  // open edit model
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/contact/view/${params.id}`);
        };

        return <Box onClick={handleFirstNameClick}>{params.value}</Box>;
      },
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
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
            <EditContact open={openEdit} handleClose={handleCloseEdit} id={id} fetchContact={fetchdata} />
            <Stack direction={'row'} spacing={2}>
              <Button variant="text" size="small" color="primary" onClick={() => handleFirstNameClick(params.row._id)}>
                <EditIcon />
              </Button>
            </Stack>
          </Box>
        );
      },
    },

    {
      field: 'showmore',
      headerName: 'Show More',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleshowClick = async (data) => {
          setshowdata(data);
          console.log('datarenderCell', data);
          handleOpendatashow();
        };
        return (
          <Box>
            <Showmore
              open={openshowdata}
              handleClose={handleClosedatashow}
              showdata={showdata}
              fetchContact={fetchdata}
            />
            <Stack direction={'row'} spacing={2}>
              <Button variant="text" size="small" color="primary" onClick={() => handleshowClick(params?.row)}>
                <MoreVertIcon />
              </Button>
            </Stack>
          </Box>
        );
      },
    },
  ];

  const fetchdata = async () => {
    // alert('fetchdata');
    const result = await apiget(userRole === 'admin' ? `/contact/list` : `/contact/list/?createdBy=${userid}`);
    console.log('result1111', result, userRole);
    if (result && result.status === 200) {
      setContactList(result?.data?.result);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [userAction]);
  return (
    <>
      {/* Add Contact Model */}
      <AddContact open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

      <Container>
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Contact</Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Contact
            </Button>
          </Stack>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={contactList}
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

export default Contact;
