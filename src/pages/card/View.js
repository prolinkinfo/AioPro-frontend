/* eslint-disable arrow-body-style */
import { Box, Button, Container, FormLabel, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { EmailEditor } from 'react-email-editor';
import { toast } from 'react-toastify';
import Header from '../../components/Header'
import { apidelete, apiget, apiput } from '../../service/api';
import DeleteModel from '../../components/Deletemodle'

const View = () => {

    const emailEditorRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [design, setDesign] = useState({})
    const [name, setName] = useState('');
    const [allDetails, setAllDetails] = useState({})
    const navigate = useNavigate()
    const params = useParams()

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    const saveDesign = () => {
        if (name !== "") {
            emailEditorRef.current?.editor?.exportHtml(async (allData) => {

                const { html } = allData
                const { design } = allData

                const data = {
                    _id: allDetails._id,
                    html,
                    design,
                    name,
                    modifiedOn: new Date()
                }
                const result = await apiput(`/api/greetingCard`, data)

                if (result && result.status === 200) {
                    navigate('/dashboard/greetingcardtemplate')
                }

            });
        } else {
            toast.error("Template Name is required")
        }
    }

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };


    const fetchData = async () => {
        const result = await apiget(`/api/greetingCard/${params.id}`)
        if (result && result.status === 200) {
            setDesign(result?.data?.design)
            setName(result?.data?.name)
            setAllDetails(result?.data)
        }
    };

    const remove = async () => {
        await apidelete(`/api/greetingCard/${params.id}`)
        navigate('/dashboard/greetingcardtemplate')
    }

    const back = () => {
        navigate('/dashboard/greetingcardtemplate')
    }

    useEffect(() => {
        fetchData();
    }, [params.id]);


    return (
        <div>
            <DeleteModel isOpenDeleteModel={opendelete} handleCloseDeleteModel={handleCloseDelete} deleteData={remove} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Grid container display="flex" alignItems="center">
                        <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                            <Header
                                title="View & Edit Template"
                            />
                            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                <Button variant="contained" color="secondary" onClick={togglePreview}>{preview ? "Hide Preview" : "Show Preview"}</Button>
                                <Button variant="contained" color="secondary" onClick={saveDesign}>Save</Button>
                                <Button variant="contained" color="error" onClick={handleOpenDelete}>Delete</Button>
                                <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon />} onClick={back}>Back</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <FormLabel>Template Name</FormLabel>
                <TextField
                    name='policyStartDate'
                    type=''
                    size='small'
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Box height={"680px"} bgcolor={"gray"} className="editerHeight" mt={1}>
                    <EmailEditor ref={emailEditorRef} onLoad={emailEditorRef?.current?.editor?.loadDesign(design)} />
                </Box>
            </Container>
        </div>
    )
}

export default View
