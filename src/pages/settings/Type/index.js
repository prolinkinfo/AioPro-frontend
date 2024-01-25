import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import AddType from './Add';
import { apidelete } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'
import EdiType from './Edit';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import CustomMenu from '../../../components/CustomMenu';

const Type = () => {
  const [typeList, setTypeList] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [typeData, setTypeData] = useState('')
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

  const type = useSelector((state) => state?.getType?.data)

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data, e) => {
          setAnchorEl(e.currentTarget);
          setTypeData(data);
          setId(data?._id)
        };
        return (
          <Box>
            <EdiType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTypeData={fetchTypeData} data={typeData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteType} id={id} />

            <CustomMenu
              open={open}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              params={params}
              id={id}
              handleOpenEdit={handleOpenEdit}
              handleOpenDeleteModel={handleOpenDeleteModel}
            />
          </Box>
        );
      },
    },
    { field: 'typeName', headerName: 'Type Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
  ];

  const deleteType = async (id) => {
    const result = await apidelete(`/api/type/${id}`);
    setUserAction(result)
  }

  const fetchData = async (e) => {
    const searchText = e?.target?.value;
    const filtered = type?.filter(({ typeName }) =>
      typeName?.toLowerCase()?.includes(searchText?.toLowerCase())
    )
    setTypeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : type)
  };

  useEffect(() => {
    dispatch(fetchTypeData());
  }, [userAction]);

  useEffect(() => {
    fetchData();
  }, [type]);

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
              <TextField type="text" size="small" placeholder="Search" onChange={fetchData} />
            </Stack>
            <Card style={{ height: '60vh' }}>
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
