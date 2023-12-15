/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Checkbox, Container, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddCallObjective from './Add';
import EditCallObjective from './Edit';
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api';

const CallObjective = () => {

  const [callObjectiveList, setCallObjectiveList] = useState([])
  const [callObjectiveData, setCallObjectiveData] = useState('')
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
          setCallObjectiveData(data);
          handleOpenEdit();
        };

        const handleClickDeleteBtn = async (data) => {
          setId(data?._id);
          handleOpenDeleteModel();
        };
        return (
          <Box>
            <EditCallObjective isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchCallObjectiveData={fetchCallObjectiveData} data={callObjectiveData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteCallObjective} id={id} />

            <Stack direction={"row"} spacing={2}>
              <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
              <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
            </Stack>
          </Box>
        );
      },
    },
    { field: 'objectiveName', headerName: 'Objective Name', flex: 1 },
    {
      field: 'promptShow/hide',
      headerName: 'promptShow/hide',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox />}/>
            </FormGroup>
          </Box>
        );
      },
    },
  ];

  const rows = [
    {
      _id: 1,
      objectiveName: 'Doctor',
    },
    {
      _id: 2,
      objectiveName: 'Abcd',
    },
  ];

  const deleteCallObjective = async (id) => {
    const result = await apidelete(`/api/callObjective/${id}`);
    setUserAction(result)
  }


  const fetchCallObjectiveData = async () => {
    const result = await apiget(`/api/callObjective`);
    if (result && result.status === 200) {
      setCallObjectiveList(result?.data?.result);
    }
  };

  useEffect(() => {
    fetchCallObjectiveData();
  }, [userAction])

  return (
    <div>
      <AddCallObjective isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchCallObjectiveData={fetchCallObjectiveData} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Call Objective</Typography>
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
                rows={callObjectiveList}
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

export default CallObjective;
