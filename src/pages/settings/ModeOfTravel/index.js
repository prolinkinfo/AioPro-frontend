import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddTravel from './Add'
import EditTravel from './Edit'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchModeOfTravelData } from '../../../redux/slice/GetModeOfTravelSlice';
import CustomMenu from '../../../components/CustomMenu';

const ModeOfTravel = () => {

    const [travelList, setTravelList] = useState([])
    const [travelData, setTravelData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const modeOfTravel = useSelector((state) => state?.getModeOfTravel?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 250,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setTravelData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditTravel isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchModeOfTravelData={fetchModeOfTravelData} data={travelData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteModeOfTravel} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                            handleOpenEdit={handleOpenEdit}
                        />
                    </Box>
                );
            },
        },
        { field: 'mode', headerName: 'Mode', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => {
                const chengStatus = async (data) => {

                };
                return (
                    <Box>
                        <Button
                            variant="outlined"
                            size='small'
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

    const deleteModeOfTravel = async (id) => {
        const result = await apidelete(`/api/modeoftravel/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = modeOfTravel?.filter(({ mode, status }) =>
            mode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            status?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setTravelList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : modeOfTravel)
    };

    useEffect(() => {
        dispatch(fetchModeOfTravelData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [modeOfTravel])


    return (
        <div>
            {/* Add Travel */}
            <AddTravel isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchModeOfTravelData={fetchModeOfTravelData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Mode Of Travel</Typography>

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
                                rows={travelList}
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

export default ModeOfTravel
