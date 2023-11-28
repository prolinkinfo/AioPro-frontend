import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import ActivityTypeAdd from './Add';
import { apiget } from '../../../service/api';

const ActivityType = () => {
  const [typeList, setTypeList] = useState([]);
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
    { field: 'activityName', headerName: 'Activity Name',flex: 1 },
  ];

  const fetchTypeData = async (e) => {
    const searchText = e?.target?.value;
    const result = await apiget(`/api/activityType`);
    if (result && result.status === 200) {
      const filteredBooks = result?.data?.filter(({ activityName }) =>
        activityName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );
      setTypeList(searchText?.length > 0 ? (filteredBooks?.length > 0 ? filteredBooks : []) : result?.data);
    }
  };

  useEffect(() => {
    fetchTypeData();
  }, []);

  return (
    <div>
      <ActivityTypeAdd isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypeData={fetchTypeData} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Activity Type</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                Add New
              </Button>
              <TextField type="text" size="small" placeholder="Search" onChange={fetchTypeData} />
            </Stack>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={typeList}
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

export default ActivityType;
