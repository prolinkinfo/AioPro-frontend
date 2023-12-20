import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddZone from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditZone from './Edit';

const Zone = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();

    const [zoneList, setZoneList] = useState([])
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [zoneData, setZoneData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const navigate = useNavigate();
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
                    setZoneData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditZone isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchZoneData={fetchZoneData} data={zoneData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteZone} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'zoneName', headerName: 'Zone Name', flex: 1 },
        { field: 'zoneCode', headerName: 'Zone Code', flex: 1 },
    ];

    const deleteZone = async (id) => {
        const result = await apidelete(`/api/zone/${id}`);
        setUserAction(result)
    }


    const fetchZoneData = async () => {
        const result = await apiget(`/api/zone`);
        if (result && result.status === 200) {
            setZoneList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchZoneData();
    }, [userAction])

    return (
        <div>
            {/* Add Zone */}
            <AddZone isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchZoneData={fetchZoneData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Zone Mapping</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <div>
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                    Add New
                                </Button>
                                
                            </div>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                            />
                        </Stack>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={zoneList}
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

export default Zone
