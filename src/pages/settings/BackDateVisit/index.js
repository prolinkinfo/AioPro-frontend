import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddBackDateVisit from './Add';
import EditBackDateVisit from './Edit'
import { apidelete, apiget } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'

const BackDateVisit = () => {

  const [backDateVisitList, setBackDateVisitList] = useState([])
  const [backDateVisitData, setBackDateVisitData] = useState('')
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
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
          setBackDateVisitData(data);
          handleOpenEdit();
        };

        const handleClickDeleteBtn = async (data) => {
          setId(data?._id);
          handleOpenDeleteModel();
        };
        return (
          <Box>
            <EditBackDateVisit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchBackDateVisitData={fetchBackDateVisitData} data={backDateVisitData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deletebackDateVisit} id={id} />

            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
              <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
            </Stack>
          </Box>
        );
      },
    },
    { field: 'employeeName', headerName: 'Employee Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    {
      field: 'fromDate',
      headerName: 'Visit Date',
      flex: 1,
      renderCell: (params) => (
        moment(params?.row?.fromDate).format("DD/MM/YYYY")
      ),
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      flex: 1,
      renderCell: (params) => (
        moment(params?.row?.deadline).format("DD/MM/YYYY")
      ),
    },
  ];

  const deletebackDateVisit = async (id) => {
    const result = await apidelete(`/api/backDateVisit/${id}`);
    setUserAction(result)
  }


  const fetchBackDateVisitData = async () => {
    const result = await apiget(`/api/backDateVisit`);
    if (result && result.status === 200) {
      setBackDateVisitList(result?.data?.result);
    }
  };

  useEffect(() => {
    fetchBackDateVisitData();
  }, [userAction])

  return (
    <div>
      <AddBackDateVisit isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchBackDateVisitData={fetchBackDateVisitData} />
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
                rows={backDateVisitList}
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
