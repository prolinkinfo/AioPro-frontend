import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';

const CallObjective = () => {
  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      width: 320,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          console.log(data, 'data');
        };
        return (
          <Box onClick={handleClick}>
            <ActionBtn data={[{ name: 'Edit' }]} />
          </Box>
        );
      },
    },
    { field: 'activityTyple', headerName: 'ActivityTyple', width: 400 },
  ];

  const rows = [
    {
      id: 1,
      activityTyple: 'Doctor',
    },
    {
      id: 2,
      activityTyple: 'Abcd',
    },
  ];

  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Call Objective</Typography>
          <div>
            <TextField type="text" size="small" placeholder="Search" style={{margin:"0px 10px"}} />
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add
            </Button>
          </div>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default CallObjective;
