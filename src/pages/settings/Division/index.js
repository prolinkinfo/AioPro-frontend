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
import CustomMenu from '../../../components/CustomMenu';

const Division = () => {

    const [divisionList, setDivisionList] = useState([])
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
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
                    setDivisionData(data)
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditDivision isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchDivisionData={fetchDivisionData} data={divisionData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteDivision} id={id} />

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
                        <Card style={{ height: '60vh' }}>
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
