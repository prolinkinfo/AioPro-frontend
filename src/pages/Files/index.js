/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-key */
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Iconify from '../../components/iconify'
import AddFolder from './Folder/Add';
import Upload from './Upload';
import { apidelete, apiget } from '../../service/api';
import folderimg from '../../assets/images/Folder-icon.png'
import pdfimg from '../../assets/images/Pdf-icon.png'
import xlsimg from '../../assets/images/xls-icon.png'
import EditFolder from './Folder/Edit';
import DeleteModel from '../../components/Deletemodle'


const Files = () => {

    const [folderList, setFolderList] = useState([])
    const [folderId, setFolderId] = useState('')
    const [data, setData] = useState("")
    const [type, setType] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = (data) => {
        setData(data);
        setIsOpenEdit(true);
    };
    const handleCloseEdit = () => setIsOpenEdit(false);
    const handleOpenUpload = () => setIsOpenUpload(true);
    const handleCloseUpload = () => setIsOpenUpload(false);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const handleOpen = (id) => {
        setFolderId(id)
        setIsOpen(true)
    }

    const handleClickDeleteBtn = async (data) => {
        setData(data?.id);
        setType(data?.type)
        handleOpenDeleteModel();
    };

    const fetchFolder = async () => {
        const result = await apiget(`/api/folder`);
        if (result && result.status === 200) {
            setFolderList(result?.data?.result);
        }
    };

    const deleteFolder = async (id) => {
        const result = await apidelete(type === "file" ? `/api/files/${id}` : `/api/folder/${id}`);
        if (result && result.status === 200) {
            fetchFolder();
        }
    };

    const back = () => {
        setIsOpen(false)
        setFolderId('')
    }

    useEffect(() => {
        fetchFolder();
    }, [])

    return (
        <div>
            {/* Create Folder */}
            <AddFolder isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchFolder={fetchFolder} />

            {/* Update Folder */}
            <EditFolder isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchFolder={fetchFolder} data={data} />

            {/* Upload File */}
            <Upload isOpenUpload={isOpenUpload} handleCloseUpload={handleCloseUpload} folderId={folderId} fetchFolder={fetchFolder} />

            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteFolder} id={data} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Files</Typography>
                    <Stack direction="row" spacing={2}>

                        {
                            isOpen === true ?
                                <>
                                    <Button variant="contained" startIcon={<Iconify icon="material-symbols:upload" />} onClick={handleOpenUpload}>
                                        Upload
                                    </Button><Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={back}>
                                        Back
                                    </Button>
                                </>
                                :
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                    Create Folder
                                </Button>
                        }

                    </Stack>
                </Stack>
                <Box style={{ marginTop: "50px" }}>
                    {
                        isOpen === false ?
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
                                                        <Button size='small' color='error' startIcon={<Iconify icon="material-symbols:delete-outline" />} onClick={() => handleClickDeleteBtn({ id: folder?._id, type: "folder" })}>delete</Button>
                                                        <Button size='small' startIcon={<Iconify icon="fluent-mdl2:repair" />}>Permissions</Button>
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
                            :
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                {
                                    folderList?.filter((folder) => folder?._id === folderId)?.map((folder) => (
                                        folder?.filesName && folder?.filesName?.length > 0 ?
                                            folder?.filesName?.map((file) => (
                                                // <Grid item xs={2} sm={3} md={3}>
                                                //     <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                //         <div key={file._id}>
                                                //             <a href={file?.filePath} target='_blank' rel="noreferrer"><img src={file?.fileType === "image/png" ? file?.filePath : file?.fileType === "application/pdf" ? pdfimg : file?.fileType === "application/vnd.ms-excel" ? xlsimg :""} alt="img" style={{ cursor: "pointer", height: "100px" }} /></a>
                                                //         </div>
                                                //         <div>
                                                //             <Typography style={{ marginTop: "7px" }} variant='inherit'>{file?.fileName}</Typography>
                                                //             <Typography style={{ fontSize: "15px" }} >{file?.createdOn ? moment(file?.createdOn).format('DD MMM YYYY hh:mm A') : ""}</Typography>
                                                //             <Stack direction={"row"} spacing={1}>
                                                // <Button size='small' color='error' startIcon={<Iconify icon="material-symbols:delete-outline" />} onClick={() => handleClickDeleteBtn({ id: file?._id, type: "file" })}>delete</Button>
                                                // <Button size='small' startIcon={<Iconify icon="fluent-mdl2:repair" />}>Permissions</Button>
                                                //             </Stack>
                                                //         </div>
                                                //     </div>
                                                // </Grid>
                                                <Grid item xs={2} sm={3} md={3}>
                                                    <Card style={{ width: "300px" }}>
                                                        <CardMedia alt="green iguana" />
                                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                                            <a href={file?.filePath} target='_blank' rel="noreferrer"><img src={file?.fileType === "image/png" || file?.fileType === "image/jpeg" ? file?.filePath : file?.fileType === "application/pdf" ? pdfimg : file?.fileType === "application/vnd.ms-excel" ? xlsimg : ""} alt="img" style={{ cursor: "pointer", height: "150px", width: "200px" }} /></a>
                                                        </div>
                                                        <CardContent style={{ padding: "3px" }}>
                                                            <Typography gutterBottom variant="button" component="div" align='center'>
                                                                {file?.fileName}
                                                            </Typography>
                                                            <Typography gutterBottom variant="button" component="div" align='center'>
                                                                {file?.createdOn ? moment(file?.createdOn).format('DD MMM YYYY hh:mm A') : ""}
                                                            </Typography>
                                                        </CardContent>
                                                        <Divider />
                                                        <CardActions>
                                                            <Button size='small' color='error' startIcon={<Iconify icon="material-symbols:delete-outline" />} onClick={() => handleClickDeleteBtn({ id: file?._id, type: "file" })}>delete</Button>
                                                            <Button size='small' startIcon={<Iconify icon="fluent-mdl2:repair" />}>Permissions</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                            )
                                            :
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "250px" }}>
                                                <Typography variant='h5'>No Files Found</Typography>
                                            </div>
                                    )
                                    )
                                }
                            </Grid>
                    }
                </Box>
            </Container>
        </div >
    )
}

export default Files