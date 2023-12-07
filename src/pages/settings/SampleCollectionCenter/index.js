import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddCollectionCenter from './Add';
import EditCollectionCenter from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'

const SampleCollectionCenter = () => {

    const [collectionCenterList, setCollectionCenterList] = useState([])
    const [collectionCenterData, setCollectionCenterData] = useState({})
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
            width:200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setCollectionCenterData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchCollectionCenterData={fetchCollectionCenterData} data={collectionCenterData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'centerName', headerName: 'Center Name', width:200 },
        { field: 'centerCode', headerName: 'Center Code', width:200 },
        { field: 'assignTo', headerName: 'Assigned To', width:200 },
        { field: 'category', headerName: 'Category', width:200 },
        { field: 'type', headerName: 'Center Type', width:200 },
        { field: 'zoneName', headerName: 'Zone', width:200 },
        { field: 'cityName', headerName: 'City', width:200 },
        { field: 'centerAddress', headerName: 'Center Address', width:200 },
    ];

    const deleteGroup = async (id) => {
        const result = await apidelete(`/api/sampleCollectionCenter/${id}`);
        setUserAction(result)
    }

    const fetchCollectionCenterData = async () => {
        const result = await apiget(`/api/sampleCollectionCenter`);
        if (result && result.status === 200) {
            setCollectionCenterList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchCollectionCenterData();
    }, [userAction])

    return (
        <div>
            {/* Add Collection Center */}
            <AddCollectionCenter isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchCollectionCenterData={fetchCollectionCenterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Sample Collection Center</Typography>

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
                                rows={collectionCenterList}
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

export default SampleCollectionCenter