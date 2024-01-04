import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddMedia from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchMediaGalleryData } from '../../../redux/slice/GetMediaGallerySlice';
import CustomMenu from '../../../components/CustomMenu';

const MediaGallery = () => {

    const [mediaList, setMediaList] = useState([])
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const mediaGallery = useSelector((state) => state?.getMediaGallery?.data)

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
            width: 200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteMedia} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            type={"edit"}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
    ];

    const deleteMedia = async (id) => {
        const result = await apidelete(`/api/mediaGallery/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = mediaGallery?.filter(({ srNo, divisionName, name }) =>
            srNo?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            name?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setMediaList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : mediaGallery)
    };

    useEffect(() => {
        dispatch(fetchMediaGalleryData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [mediaGallery])

    return (
        <div>
            {/* Add Media */}
            <AddMedia isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchMediaGalleryData={fetchMediaGalleryData} />

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
                                onChange={fetchData}
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
