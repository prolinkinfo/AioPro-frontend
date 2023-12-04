import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProductIndication from './Add';
import EditProductIndication from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'

const SchemeMaster = () => {

    const [schemeMasterList, setSchemeMasterList] = useState([])
    const [schemeMasterData, setSchemeMasterListData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 250,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setSchemeMasterListData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditProductIndication isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchSchemeMasterData={fetchSchemeMasterData} data={schemeMasterData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSchemeMaster} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
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
                                color: params.value === 'active' ? '#B61D18' : '#22C55E',
                                background: params.value === 'active' ? '#ff563029' : '#22c55e29',
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

    const fetchSchemeMasterData = async () => {
        const result = await apiget(`/api/schememaster`);
        if (result && result.status === 200) {
            setSchemeMasterList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchSchemeMasterData();
    }, [userAction])

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
