/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-key */
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../components/iconify'
import AddFolder from './Folder/Add';
import Upload from './Upload';
import { apidelete, apiget } from '../../service/api';
import folderimg from '../../assets/images/Folder-icon.png'
import pdfimg from '../../assets/images/Pdf-icon.png'
import xlsimg from '../../assets/images/xls-icon.png'
import xlsximg from '../../assets/images/xlsx-icon.png'
import pngimg from '../../assets/images/png-icon.png'
import jpgimg from '../../assets/images/jpg-icon.png'
import csvimg from '../../assets/images/csv-icon.png'
import fileimg from '../../assets/images/file-icon.png'
import EditFolder from './Folder/Edit';
import DeleteModel from '../../components/Deletemodle'
import Permissions from './Permissions';
import { fetchFolder } from '../../redux/slice/GetFolderSlice';

const Files = () => {

    const [folderId, setFolderId] = useState('')
    const [data, setData] = useState("")
    const [type, setType] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
    const [isOpenPreModel, setIsOpenPreModel] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const folderList = useSelector((state) => state?.getFolder?.data)
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = (data) => {
        setData(data);
        setIsOpenEdit(true);
    };
    const handleCloseEdit = () => setIsOpenEdit(false);

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const handleOpen = (id) => {
        navigate(`/${userRole}/dashboard/file/${id}`)
        setFolderId(id)
    }

    const handleClickDeleteBtn = async (id) => {
        setData(id);
        handleOpenDeleteModel();
    };


    const deleteFolder = async (id) => {
        const result = await apidelete(`/api/folder/${id}`);
        if (result && result.status === 200) {
            dispatch(fetchFolder());
        }
    };

    useEffect(() => {
        dispatch(fetchFolder());
    }, [])

    return (
        <div>
            {/* Permissions */}
            <Permissions isOpen={isOpenPreModel} handleClose={() => setIsOpenPreModel(false)} />

            {/* Create Folder */}
            <AddFolder isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchFolder={fetchFolder} />

            {/* Update Folder */}
            <EditFolder isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchFolder={fetchFolder} data={data} />

            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteFolder} id={data} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Files</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Create Folder
                        </Button>
                    </Stack>
                </Stack>
                <Box style={{ marginTop: "50px" }}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                        {folderList && folderList?.length > 0 ?
                            folderList?.map((folder) => (
                                <Grid item xs={2} sm={3} md={3}>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div key={folder._id}>
                                            <img src={folderimg} alt="Folder Icon" height={90} onClick={() => handleOpen(folder?._id)} style={{ cursor: "pointer" }} />
                                        </div>
                                        <div>
                                            <Typography style={{ marginTop: "7px" }} variant='inherit'>{folder?.folderName}</Typography>
                                            <Typography style={{ fontSize: "15px" }} >{moment(folder?.createdOn).format('DD MMM YYYY hh:mm A')}</Typography>
                                            <Stack direction={"row"} spacing={1}>
                                                <Button size='small' startIcon={<Iconify icon="bxs:edit" />} onClick={() => handleOpenEdit(folder)} >edit</Button>
                                                <Button size='small' color='error' startIcon={<Iconify icon="material-symbols:delete-outline" />} onClick={() => handleClickDeleteBtn(folder?._id)}>delete</Button>
                                                <Button size='small' startIcon={<Iconify icon="fluent-mdl2:repair" />} onClick={() => setIsOpenPreModel(true)}>Permissions</Button>
                                            </Stack>
                                        </div>
                                    </div>
                                </Grid>
                            ))
                            :
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "250px" }}>
                                <Typography variant='h5'>No Folders Found</Typography>
                            </div>
                        }
                    </Grid>
                </Box>
            </Container>
        </div >
    )
}

export default Files