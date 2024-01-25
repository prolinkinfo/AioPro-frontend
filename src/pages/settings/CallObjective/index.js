/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Checkbox, Container, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddCallObjective from './Add';
import EditCallObjective from './Edit';
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api';
import { fetchCallObjectiveData } from '../../../redux/slice/GetCallObjectiveSlice';
import CustomMenu from '../../../components/CustomMenu';

const CallObjective = () => {

  const [callObjectiveList, setCallObjectiveList] = useState([]);
  const [callObjectiveData, setCallObjectiveData] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)
  const dispatch = useDispatch();
  const callObjective = useSelector((state) => state?.getCallObjective?.data)
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

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
          setCallObjectiveData(data)
          setId(data?._id)
        };
        return (
          <Box>
            <EditCallObjective isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchCallObjectiveData={fetchCallObjectiveData} data={callObjectiveData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteCallObjective} id={id} />

            <CustomMenu
              open={open}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleOpenEdit={handleOpenEdit}
              params={params}
              handleOpenDeleteModel={handleOpenDeleteModel}
            />
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
              <FormControlLabel control={<Checkbox />} />
            </FormGroup>
          </Box>
        );
      },
    },
  ];

  const deleteCallObjective = async (id) => {
    const result = await apidelete(`/api/callObjective/${id}`);
    setUserAction(result)
  }

  const fetchData = async (e) => {
    const searchText = e?.target?.value;
    const filtered = callObjective?.filter(({ objectiveName }) =>
      objectiveName?.toLowerCase()?.includes(searchText?.toLowerCase()))
    setCallObjectiveList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : callObjective)
  };

  useEffect(() => {
    dispatch(fetchCallObjectiveData());
  }, [userAction])

  useEffect(() => {
    fetchData();
  }, [callObjective])

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
              <TextField type="text" size="small" placeholder="Search" onChange={fetchData} />
            </Stack>
            <Card style={{ height: '60vh' }}>
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
