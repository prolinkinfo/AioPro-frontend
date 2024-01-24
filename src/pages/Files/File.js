/* eslint-disable react/jsx-key */
/* eslint-disable arrow-body-style */
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Iconify from '../../components/iconify'
import Upload from './Upload'
import { fetchFolder } from '../../redux/slice/GetFolderSlice'
import pdfimg from '../../assets/images/Pdf-icon.png'
import xlsimg from '../../assets/images/xls-icon.png'
import xlsximg from '../../assets/images/xlsx-icon.png'
import pngimg from '../../assets/images/png-icon.png'
import jpgimg from '../../assets/images/jpg-icon.png'
import csvimg from '../../assets/images/csv-icon.png'
import fileimg from '../../assets/images/file-icon.png'
import { apidelete, apiget } from '../../service/api'
import DeleteModel from '../../components/Deletemodle'
import Permissions from './Permissions'

const File = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileId, setFileId] = useState('');
    const [folderData, setFolderData] = useState({})
    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
    const [isOpenPreModel, setIsOpenPreModel] = useState(false);
    const handleOpenUpload = () => setIsOpenUpload(true);
    const handleCloseUpload = () => setIsOpenUpload(false);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    
    const fetchData = async () => {
        const result = await apiget(`/api/folder/${id}`)
        if (result && result.status === 200) {
            setFolderData(result?.data?.result[0])
        }
    }

        const deleteFile = async (id) => {
            const result = await apidelete(`/api/files/${id}`);
            if (result && result.status === 200) {
               fetchData();
            }
        };

    const handleClickDeleteBtn = async (id) => {
        setFileId(id);
        handleOpenDeleteModel();
    };

    const back = () => {
        navigate(-1);
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {/* Permissions */}
            <Permissions isOpen={isOpenPreModel} handleClose={() => setIsOpenPreModel(false)} />

            {/* Upload File */}
            <Upload isOpenUpload={isOpenUpload} handleCloseUpload={handleCloseUpload} folderId={id} fetchFolder={fetchData} />

            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteFile} id={fileId} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Files</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="material-symbols:upload" />} onClick={handleOpenUpload}>
                            Upload
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={back}>
                            Back
                        </Button>
                    </Stack>
                </Stack>
                <Box style={{ marginTop: "50px" }}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 3 }}>
                        {
                            folderData && folderData?.filesName?.length > 0 ?
                                folderData?.filesName?.map((file) => (
                                    <Grid item xs={2} sm={3} md={3}>
                                        <div style={{ display: "flex" }}>
                                            <div key={file._id}>
                                                <a href={file?.filePath} target='_blank' rel="noreferrer"><img src={file?.fileType === "application/pdf" ? pdfimg : file?.fileType === "application/vnd.ms-excel" ? xlsimg : file?.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? xlsximg : file?.fileType === "text/csv" ? csvimg : file?.fileType === "image/jpeg" ? jpgimg : file?.fileType === "image/png" ? pngimg : fileimg} alt="img" style={{ cursor: "pointer", height: "100px" }} /></a>
                                            </div>
                                            <div>
                                                <Typography style={{ marginTop: "7px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} variant='inherit'>{file?.fileName}</Typography>
                                                <Typography style={{ fontSize: "15px" }} >{file?.createdOn ? moment(file?.createdOn).format('DD MMM YYYY hh:mm A') : ""}</Typography>
                                                <Stack direction={"row"} spacing={1}>
                                                    <Button size='small' color='error' startIcon={<Iconify icon="material-symbols:delete-outline" />} onClick={() => handleClickDeleteBtn(file?._id)}>delete</Button>
                                                    <Button size='small' startIcon={<Iconify icon="fluent-mdl2:repair" />} onClick={() => setIsOpenPreModel(true)}>Permissions</Button>
                                                </Stack>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                                )
                                :
                                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "250px" }}>
                                    <Typography variant='h5'>No Files Found</Typography>
                                </div>
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default File