/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddExpenseHead from './Add';
import { apidelete, apiget, apiput } from '../../../service/api';
import EditExpenseHead from './Edit';
import DeleteModel from '../../../components/Deletemodle'
import { fetchExpenseHeadData } from '../../../redux/slice/GetExpenseHeadSlice';

const ExpenesHead = () => {
  const [headList, setHeadList] = useState([]);
  const dispatch = useDispatch();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [headData, setHeadData] = useState('')
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)

  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

  const expenseHeadData = useSelector((state) => state?.getExpenseHead?.data)


  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleClick = async (data) => {
          setHeadData(data);
          handleOpenEdit();
        };

        const handleClickDeleteBtn = async (data) => {
          setId(data?._id);
          handleOpenDeleteModel();
        };
        return (
          <Box>
            <EditExpenseHead isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} data={headData} fetchExpenseHeadData={fetchExpenseHeadData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteHead} id={id} />

            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
              {/* <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button> */}
            </Stack>
          </Box>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Head',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
    },
    {
      field: 'monthlyCap',
      headerName: 'Monthly Cap',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
    },
    {
      field: 'isEditable',
      headerName: 'Editable',
      cellClassName: 'name-column--cell--capitalize',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              style={{
                color: params.value === "Yes" ? '#22C55E' : '#B61D18',
                background: params.value === "Yes" ? '#22c55e29' : '#ff563029',
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
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        const chengStatus = async (data) => {
          const pyload = {
            _id: data?._id,
            status: data?.status === "active" ? "deactive" : data?.status === "deactive" ? "active" : "",
          }
          const result = await apiput(`/api/expenseHead/changeStatus`, pyload);
          if (result && result.status === 200) {
            dispatch(fetchExpenseHeadData());
          }
        };

        return (
          <Box>
            <Button
              variant="outlined"
              style={{
                color: params.value === 'active' ? '#22C55E' : '#B61D18',
                background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                border: 'none',
              }}
              onClick={() => chengStatus(params?.row)}

            >
              {params.value}
            </Button>
          </Box>
        );
      },
    },
  ];

  const fetchHeadData = async (e) => {
    const searchText = e?.target?.value;
    const filteredHead = expenseHeadData?.filter(({ title, monthlyCap, status, isEditable }) =>
      title?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      monthlyCap?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      status?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      isEditable?.toLowerCase()?.includes(searchText?.toLowerCase()) 
    )
    setHeadList(searchText?.length > 0 ? (filteredHead?.length > 0 ? filteredHead : []) : expenseHeadData)
  };

  const deleteHead = async (id) => {
    const result = await apidelete(`/api/expenseHead/${id}`);
    setUserAction(result)
  }

  useEffect(() => {
    dispatch(fetchExpenseHeadData());
  }, [userAction]);

  useEffect(() => {
    fetchHeadData()
  }, [expenseHeadData]);

  return (
    <div>
      <AddExpenseHead isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchExpenseHeadData={fetchExpenseHeadData} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Expense Head</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                Add New
              </Button>
              <TextField type="text" size="small" placeholder="Search" onChange={fetchHeadData} />
            </Stack>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={headList}
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

export default ExpenesHead;
