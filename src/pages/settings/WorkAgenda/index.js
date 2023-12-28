import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddAgenda from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditWorkAgenda from './Edit';
import { fetchWorkAgendaData } from '../../../redux/slice/GetWorkAgendaSlice';

const WorkAgenda = () => {

    const [agendaList, setAgendaList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [agendaData, setAgendaData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const workAgenda = useSelector((state) => state?.getWorkAgenda?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setAgendaData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditWorkAgenda isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchWorkAgendaData={fetchWorkAgendaData} data={agendaData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteAgenda} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'workAgenda', headerName: 'Work Agenda', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    ];

    const deleteAgenda = async (id) => {
        const result = await apidelete(`/api/workagenda/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = workAgenda?.filter(({ workAgenda }) =>
            workAgenda?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setAgendaList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : workAgenda)
    };

    useEffect(() => {
        dispatch(fetchWorkAgendaData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [workAgenda])

    return (
        <div>
            {/* Add Agenda */}
            <AddAgenda isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchWorkAgendaData={fetchWorkAgendaData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Work Agenda Reason</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                                onChange={fetchData}
                            />
                        </Stack>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={agendaList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default WorkAgenda
