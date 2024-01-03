/* eslint-disable prefer-const */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import ActionBtn from '../../../components/actionbtn/ActionBtn';
import AddBackDateVisit from './Add';
import EditBackDateVisit from './Edit'
import { apidelete, apiget } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'
import { fetchBackDateVisitData } from '../../../redux/slice/GetBackDateVisitSlice';
import CustomMenu from '../../../components/CustomMenu';

const BackDateVisit = () => {

  const [backDateVisitList, setBackDateVisitList] = useState([])
  const [backDateVisitData, setBackDateVisitData] = useState('')
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const [id, setId] = useState('')
  const [userAction, setUserAction] = useState(null)
  const dispatch = useDispatch();
  const backDateVisit = useSelector((state) => state?.getBackDateVisit?.data)
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
          setBackDateVisitData(data)
          setId(data?._id)
        };
        return (
          <Box>
            <EditBackDateVisit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchBackDateVisitData={fetchBackDateVisitData} data={backDateVisitData} />
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deletebackDateVisit} id={id} />

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
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        fullName(params?.row?.employeeName)
      ),
    },
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

  const fullName = (name) => {
    let separatedNames = name.split(/(?=[A-Z])/);
    let firstName = separatedNames[0];
    let lastName = separatedNames[1];

    return `${firstName} ${lastName}`
  }

  const deletebackDateVisit = async (id) => {
    const result = await apidelete(`/api/backDateVisit/${id}`);
    setUserAction(result)
  }


  const fetchData = async (e) => {
    const searchText = e?.target?.value;
    const filtered = backDateVisit?.filter(({ employeeName }) =>
      employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()))
    setBackDateVisitList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : backDateVisit)
  };

  useEffect(() => {
    dispatch(fetchBackDateVisitData());
  }, [userAction])

  useEffect(() => {
    fetchData();
  }, [backDateVisit])

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
              <TextField type="text" size="small" placeholder="Search" onChange={fetchData} />
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
