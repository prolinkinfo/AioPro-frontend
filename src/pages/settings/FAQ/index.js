import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import { apiget } from '../../../service/api';

const FaqMaster = () => {
  const [typeList, setTypeList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const columns = [
    {
      headerName: 'Action',
      sortable: false,
      with: 190,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          console.log(data, 'data');
        };
        return (
          <Box onClick={handleClick}>
            <Button variant="outlined">Edit</Button>
          </Box>
        );
      },
    },
    { field: 'answer', headerName: 'Answer', flex: 1 },
    { field: 'question', headerName: 'Question', flex: 1 },
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
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">FAQ Bank</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                <Link
                  to={`/${userRole}/dashboard/setting/faqMaster/add`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Add New
                </Link>
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

export default FaqMaster;
