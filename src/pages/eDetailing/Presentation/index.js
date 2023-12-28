/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Iconify from '../../../components/iconify/Iconify'
import img1 from '../../../assets/images/Folder-icon.png'
import img2 from '../../../assets/images/Pdf-icon.png'
import CustomizedMenus from '../../../components/Menu'
import AddPresentation from './Add'
import EdiPresentation from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { fetchPresentationData } from '../../../redux/slice/GetPresentationSlice'
import { apidelete, apiget } from '../../../service/api'

const Presentation = () => {

    const [data, setData] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [presentationData, setPresentationData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = (data) => {
        setPresentationData(data)
        setIsOpenEdit(true);
    }
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = (id) => {
        setId(id)
        setIsOpenDeleteModel(true);
    }
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();

    const presentation = useSelector((state) => state?.getPresentation?.data)

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = presentation?.filter(({ presentationName, assigedType, assigedTo, division }) =>
            presentationName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            assigedType?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            assigedTo?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            division?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setData(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : presentation)
    }

    const openView = (id) => {
        navigate(`/${userRole}/dashboard/eDetailing/presentation/${id}`)
    }

    const deleteData = async () => {
        const result = await apidelete(`/api/presentation/${id}`);
        setUserAction(result)
    }

    useEffect(() => {
        fetchData();
    }, [presentation])

    useEffect(() => {
        dispatch(fetchPresentationData());
    }, [userAction])

    return (
        <div>
            {/* Add Presentation */}
            <AddPresentation isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchPresentationData={fetchPresentationData} />

            {/* Edit Presentation */}
            <EdiPresentation isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} presentationData={presentationData} fetchPresentationData={fetchPresentationData} />

            {/* Delete Model */}
            <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteData} id={id} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Presentation</Typography>
                </Stack>
                <Box width="100%" pt={3}>
                    <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add New
                        </Button>
                        <TextField type="text" size="small" placeholder="Search" onChange={fetchData} />
                    </Stack>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                        {
                            data && data?.length > 0 && data?.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={12} sm={6} md={4} >
                                            <Box mt={4}>
                                                <div>
                                                    <div style={{ position: "absolute" }}>
                                                        <CustomizedMenus
                                                            data={item}
                                                            handleOpenEdit={handleOpenEdit}
                                                            handleOpenDeleteModel={handleOpenDeleteModel}
                                                            openView={openView}
                                                        />
                                                    </div>
                                                    <img src={item?.slideImgs[0]?.image} width={450} height={300} />
                                                </div>
                                                <div>
                                                    <table className='presantationTable'>
                                                        <tr >
                                                            <th style={{ textAlign: "start" }}>Name :</th>
                                                            <td style={{ paddingLeft: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.presentationName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: "start" }}>Assigning Type :</th>
                                                            <td style={{ paddingLeft: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.assigedType}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: "start" }}>Assigning To :</th>
                                                            <td style={{ paddingLeft: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.assigedTo}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: "start" }}>division :</th>
                                                            <td style={{ paddingLeft: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.division}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: "start" }}>Date :</th>
                                                            <td style={{ paddingLeft: "100px" }}>{moment(item?.createdOn).format("lll")}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: "start" }}>Description :</th>
                                                            <td style={{ paddingLeft: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item?.description}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </Box>
                                        </Grid>
                                    </>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Presentation
