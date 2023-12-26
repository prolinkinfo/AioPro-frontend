/* eslint-disable react/self-closing-comp */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddExpense from './Add';
import { apidelete, apiget } from '../../../service/api';
import EditExpense from './Edit';
import DeleteModel from '../../../components/Deletemodle'

const Expenses = () => {
  const [typeList, setTypeList] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [activityTypeData, setActivityTypeData] = useState('')
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)

  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          setActivityTypeData(data);
          handleOpenEdit();
        };

        const handleClickDeleteBtn = async (data) => {
          setId(data?._id);
          handleOpenDeleteModel();
        };
        return (
          <Box>
            <EditExpense isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTypeData={fetchTypeData} data={activityTypeData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteActivityType} id={id} />

            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
              <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
            </Stack>
          </Box>
        );
      },
    },
    { field: 'head', headerName: 'Head', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'monthlyCap', headerName: 'Monthly Cap', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    {
      field: 'isEditable',
      headerName: 'Editable',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              style={{
                color: params.value === 'active' ? '#22C55E' : '#B61D18',
                background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                border: 'none',
              }}
            >
              {params.value}
            </Button>
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
    },
  ];

  const deleteActivityType = async (id) => {
    const result = await apidelete(`/api/activityType/${id}`);
    setUserAction(result)
  }

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
  }, [userAction]);

  return (
    <div>
      <AddExpense isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypeData={fetchTypeData} />
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

export default Expenses;
