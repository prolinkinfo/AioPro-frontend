import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import ActivityTypeAdd from './Add';
import { apidelete, apiget } from '../../../service/api';
import EditActivityType from './Edit';
import DeleteModel from '../../../components/Deletemodle'
import { fetchActivityTypeData } from '../../../redux/slice/GetActivityTypeSlice';
import CustomMenu from '../../../components/CustomMenu';

const ActivityType = () => {
  const [typeList, setTypeList] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [activityTypeData, setActivityTypeData] = useState('')
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)
  const dispatch = useDispatch();
  const typeData = useSelector((state) => state?.getActivityType?.data)
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const handleOpenEdit = () => setIsOpenEdit(true)
  const handleCloseEdit = () => setIsOpenEdit(false)
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

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
          setActivityTypeData(data)
          setId(data?._id)
        };
        return (
          <Box>
            <EditActivityType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchActivityTypeData={fetchActivityTypeData} data={activityTypeData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteActivityType} id={id} />
            
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
    { field: 'activityName', headerName: 'Activity Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
  ];

  const deleteActivityType = async (id) => {
    const result = await apidelete(`/api/activityType/${id}`);
    setUserAction(result)
  }


  const fetchTypeData = async (e) => {
    const searchText = e?.target?.value;
    const filtered = typeData?.filter(({ activityName }) =>
      activityName?.toLowerCase()?.includes(searchText?.toLowerCase()))
    setTypeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : typeData)
  };

  useEffect(() => {
    dispatch(fetchActivityTypeData());
  }, [userAction]);

  useEffect(() => {
    fetchTypeData();
  }, [typeData]);

  return (
    <div>
      <ActivityTypeAdd isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchActivityTypeData={fetchActivityTypeData} />
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
