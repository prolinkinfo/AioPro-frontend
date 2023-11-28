import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import BackDateVisitModel from './Add';

const BackDateVisit = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          console.log(data, 'data');
        };
        return (
          <Box onClick={handleClick}>
            <Button>Edit</Button>
          </Box>
        );
      },
    },
    { field: 'employeeName', headerName: 'Employee Name', flex: 1 },
    { field: 'visitDate', headerName: 'Visit Date', flex: 1 },
    { field: 'deadline', headerName: 'Deadline',flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      employeeName: 'jaysukh gujariya',
      visitDate: '10/11/2023',
      deadline: '27/11/2023',
    },
    {
      id: 2,
      employeeName: 'jaysukh gujariya',
      visitDate: '12/12/2023',
      deadline: '28/12/2023',
    },
  ];

  return (
    <div>
      <BackDateVisitModel isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypeData={'hhhhhhh'} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Back Date Visit</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                Add New
              </Button>
              <TextField type="text" size="small" placeholder="Search" />
            </Stack>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                getRowId={(row) => row._id}
                pageSizeOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default BackDateVisit;
