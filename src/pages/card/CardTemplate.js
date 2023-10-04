import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, nbNO } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
import { apiget, deleteManyApi } from '../../service/api';
import DeleteModel from '../../components/Deletemodle';
import SendTemplate from './sendTemplate';

const CardTemplate = () => {
  const [designList, setDesignList] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [sendTemplete, setSendTemplete] = useState(false);
  const [templetId, setTempletId] = useState({});
  const navigate = useNavigate();

  const openSendTemplete = () => setSendTemplete(true);

  const handleSendTemplete = () => setSendTemplete(false);

  const { id } = JSON.parse(localStorage.getItem('user'));

  const columns = [
    {
      field: 'name',
      headerName: 'Template Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      // renderCell: (params) => {
      //     const handleFirstNameClick = () => {
      //         navigate(`/dashboard/cardtemplate/${params.row._id}`)
      //     };

      //     return (
      //         <Box onClick={handleFirstNameClick}>
      //             {params.value}
      //         </Box>
      //     );
      // }
    },
    {
      field: 'createdOn',
      headerName: 'CreatedOn',
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: 'modifiedOn',
      headerName: 'ModifiedOn',
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleFirstNameClick = async (data) => {
          navigate(`/dashboard/greetingcardtemplate/${params.row._id}`);
        };
        return (
          <Box>
            {/* <View isOpenView={isOpenView} handleCloseView={handleCloseView} opdData={opdData} /> */}
            {/* <EditContact open={openEdit} handleClose={handleCloseEdit} user={editUser} fetchdata={fetchdata} /> */}
            <Stack direction={'row'} spacing={2}>
              <Button variant="text" size="small" color="primary" onClick={() => handleFirstNameClick(params)}>
                <VisibilityIcon />
              </Button>
              <Button
                variant="text"
                size="small"
                color="primary"
                onClick={() => {
                  setSendTemplete(true);
                  setTempletId(params);
                }}
              >
                <SendIcon />
              </Button>
            </Stack>
          </Box>
        );
      },
    },
  ];

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const fetchdata = async () => {
    const result = await apiget(`/api/greetingCard/?createdBy=${id}`);
    if (result && result.status === 200) {
      setDesignList(result?.data);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <TableStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Card Templates</Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link to="/dashboard/greetingcardtemplate/add" style={{ textDecoration: 'none', color: 'white' }}>
                New Template
              </Link>
            </Button>
          </Stack>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={designList}
                columns={columns}
                // components={{ Toolbar: () => CustomToolbar({ selectedRowIds }) }}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                getRowId={(row) => row._id}
              />
            </Card>
          </Box>
        </TableStyle>

        <SendTemplate open={sendTemplete} handleClose={handleSendTemplete} data={templetId} />
      </Container>
    </div>
  );
};

export default CardTemplate;
