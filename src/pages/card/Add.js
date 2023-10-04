/* eslint-disable arrow-body-style */
import { Box, Button, Container, FormLabel, Grid, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { EmailEditor } from 'react-email-editor';
import { toast } from 'react-toastify';
import { apipost } from '../../service/api';
import Header from '../../components/Header'

const Add = () => {
    const emailEditorRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const { id } = JSON.parse(localStorage.getItem('user'));

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };

    const saveDesign = () => {
        if (name !== "") {
            emailEditorRef.current?.editor?.exportHtml(async (allData) => {
                const { html } = allData
                const { design } = allData

                console.log(allData, "allData")

                const data = {
                    html,
                    design,
                    name,
                    createdBy: id

                }
                const result = await apipost('/api/greetingCard', data)
                if (result && result.status === 201) {
                    toast.success(result.data.message)
                    setName('')
                }
                navigate('/dashboard/greetingcardtemplate')
            });
        } else {
            toast.error("Template Name is required")
        }

    };

    const back = () => {
        navigate('/dashboard/greetingcardtemplate')
    }

    return (
        <div>
            <Container>
                <Grid container display="flex" alignItems="center">
                    <Grid container display="flex" alignItems="center">
                        <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                            <Header
                                title="Create Template"
                            />
                            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                <Button variant="contained" color="secondary" onClick={togglePreview}>{preview ? "Hide Preview" : "Show Preview"}</Button>
                                <Button variant="contained" color="secondary" onClick={saveDesign}>Save</Button>
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
                <Box height={"680px"} bgcolor={"#e8ebee"} className="editerHeight" mt={1}>
                    <EmailEditor ref={emailEditorRef} />
                </Box>
            </Container>
        </div>
    )
}

export default Add
