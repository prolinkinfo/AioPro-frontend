import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddMedia from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'

const MediaGallery = () => {

    const [mediaList, setMediaList] = useState([])
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const columns = [
        { field: 'srNo', headerName: 'Sr.No', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'divisionName', headerName: 'division', flex: 1 },
        {
            field: 'image',
            headerName: 'Images',
            flex: 1,
            renderCell: (params) => (
                <a href={params?.row?.image} target='_blank' rel="noreferrer"><img
                src={params?.row?.image}
                alt="Avatar"
                style={{ width: 50, height: 50, borderRadius: '50%' }}
            /></a>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width:200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteMedia} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
    ];

    const deleteMedia = async (id) => {
        const result = await apidelete(`/api/mediaGallery/${id}`);
        setUserAction(result)
    }


    const fetchMediaData = async () => {
        const result = await apiget(`/api/mediaGallery`);
        if (result && result.status === 200) {
            setMediaList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchMediaData();
    }, [userAction])

    return (
        <div>
            {/* Add Media */}
            <AddMedia isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchMediaData={fetchMediaData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Media Gallery</Typography>
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
                                rows={mediaList}
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

export default MediaGallery
