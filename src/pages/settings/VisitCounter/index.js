import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import AddVisit from './Add'
import EditVisit from './Edit';
import { fetchVisitCounterData } from '../../../redux/slice/GetVisitCounterSlice';

const VisitCounter = () => {

    const [counterList, setCounterList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [counterData, setCounterData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const visitCounter = useSelector((state) => state?.getVisitCounter?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setCounterData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditVisit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchVisitCounterData={fetchVisitCounterData} data={counterData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteCounter} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'clientId', headerName: 'Client Id', flex: 1 },
        { field: 'clientName', headerName: 'Client Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'employeeCode', headerName: 'Employee Code', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'employeeName', headerName: 'Employee Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'visitCounter', headerName: 'Count', flex: 1 },
    ];

    const deleteCounter = async (id) => {
        const result = await apidelete(`/api/visitCounter/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = visitCounter?.filter(({ clientId, clientName, employeeCode, employeeName, visitCounter, }) =>
            clientId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            clientName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            employeeCode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            visitCounter?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setCounterList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : visitCounter)
    };

    useEffect(() => {
        dispatch(fetchVisitCounterData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [visitCounter])

    return (
        <div>
            {/* Add Visit */}
            <AddVisit isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchVisitCounterData={fetchVisitCounterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Visit Counter</Typography>

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
                                rows={counterList}
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

export default VisitCounter
