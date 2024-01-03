import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProductIndication from './Add';
import EditProductIndication from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchSchemeMasterData } from '../../../redux/slice/GetSchemeMasterSlice';
import CustomMenu from '../../../components/CustomMenu';

const SchemeMaster = () => {

    const [schemeMasterList, setSchemeMasterList] = useState([])
    const [schemeMasterData, setSchemeMasterData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const schemeMaster = useSelector((state) => state?.getSchemeMaster?.data)

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
                    setSchemeMasterData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditProductIndication isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchSchemeMasterData={fetchSchemeMasterData} data={schemeMasterData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSchemeMaster} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenEdit={handleOpenEdit}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'srNo', headerName: 'Sr. No.', width: 100 },
        { field: 'schemeName', headerName: 'Scheme Name', width: 400, cellClassName: 'name-column--cell--capitalize', },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        { field: 'schemeQuatity', headerName: 'Scheme Quatity', width: 200 },
        { field: 'numberOfFreeItems', headerName: 'Number Of Free Items', width: 200 },
        { field: 'productName', headerName: 'Product', width: 300 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                const chengStatus = async (data) => {

                };
                return (
                    <Box>
                        <Button
                            variant="outlined"
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

    const deleteSchemeMaster = async (id) => {
        const result = await apidelete(`/api/schememaster/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = schemeMaster?.filter(({ srNo, schemeName, productName, status }) =>
            srNo?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            schemeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            productName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            status?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setSchemeMasterList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : schemeMaster)
    };



    useEffect(() => {
        dispatch(fetchSchemeMasterData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [schemeMaster])

    return (
        <div>
            {/* Add Scheme Mastert */}
            <AddProductIndication isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchSchemeMasterData={fetchSchemeMasterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Scheme Master</Typography>

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
                                rows={schemeMasterList}
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

export default SchemeMaster
