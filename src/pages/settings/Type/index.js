import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddType from './Add';
import { apidelete, apiget } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'
import EdiType from './Edit';

const Type = () => {
  const [typeList, setTypeList] = useState([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [typeData, setTypeData] = useState('')
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
            setTypeData(data);
              handleOpenEdit();
          };

          const handleClickDeleteBtn = async (data) => {
              setId(data?._id);
              handleOpenDeleteModel();
          };
          return (
              <Box>
                  <EdiType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTypeData={fetchTypeData} data={typeData} />
                  <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteType} id={id} />

                  <Stack direction={"row"} spacing={2}>
                      <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                      <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                  </Stack>
              </Box>
          );
      },
  },
    { field: 'typeName', headerName: 'Type Name', flex: 1 ,cellClassName: 'name-column--cell--capitalize'},
  ];

  const deleteType = async (id) => {
    const result = await apidelete(`/api/type/${id}`);
    setUserAction(result)
}

  const fetchTypeData = async (e) => {
    const searchText = e?.target?.value;
    const result = await apiget(`/api/type`);
    if (result && result.status === 200) {
      const filteredBooks = result?.data?.result?.filter(({ typeName }) =>
        typeName?.toLowerCase()?.includes(searchText?.toLowerCase())
      );

      setTypeList(searchText?.length > 0 ? (filteredBooks?.length > 0 ? filteredBooks : []) : result?.data?.result);
    }
  };

  useEffect(() => {
    fetchTypeData();
  }, [userAction]);

  return (
    <div>
      {/* Add Type */}
      <AddType isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypeData={fetchTypeData} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Type</Typography>
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
                pageSizeOptions={[5, 10]}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default Type;
