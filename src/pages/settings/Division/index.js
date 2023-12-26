import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddDivision from './Add'
import EditDivision from './Edit'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';

const Division = () => {

    const [divisionList, setDivisionList] = useState([])
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [divisionData, setDivisionData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const division = useSelector((state) => state?.getDivision?.data)
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
                    setDivisionData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditDivision isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchDivisionData={fetchDivisionData} data={divisionData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteDivision} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        {
            field: 'appLogo',
            headerName: 'App Logo',
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params?.row?.appLogo}
                    alt="Avatar"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
            ),
        },
    ];

    const deleteDivision = async (id) => {
        const result = await apidelete(`/api/division/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = division?.filter(({ divisionName }) =>
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setDivisionList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : division)
    };

    useEffect(() => {
        dispatch(fetchDivisionData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [division])

    return (
        <div>
            {/* Add Division */}
            <AddDivision isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchDivisionData={fetchDivisionData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Division</Typography>

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
                                rows={divisionList}
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

export default Division
