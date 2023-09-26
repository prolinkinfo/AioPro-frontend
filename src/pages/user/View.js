/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, Card, Container, FormLabel, Grid, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Actionbutton from '../../components/Actionbutton';
import Header from '../../components/Header';
import { apidelete, apiget, getsingleuser } from '../../service/api';
import AddUser from './Add'
import EditUser from './Edit'
import DeleteModel from '../../components/Deletemodle'
import Palette from '../../theme/palette'
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import General from './General';
import Security from './Security';

const View = () => {

    const [userDetails, setUserDetails] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const params = useParams()

    const userdata = JSON.parse(localStorage.getItem('user'));

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/user')
    }

    // fetch api
    const fetchdata = async () => {
        const result = await getsingleuser(`/api/users`, params.id)
        if (result && result.status === 200) {
            setUserDetails(result.data)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`user/delete/${params.id}`)
        navigate('/dashboard/user')
    }

    useEffect(() => {
        fetchdata();
    }, [openAdd])



    return (
        <div>

            {/* Add User Model */}
            <AddUser open={openAdd} handleClose={handleCloseAdd} />

            {/* Add Edit Model */}
            <EditUser open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchUser={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={`${userDetails?.firstName} ${userDetails?.lastName}`}
                            subtitle="Profile Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            <Button variant="contained" color="secondary" onClick={back} startIcon={<ArrowBackIosIcon />}>
                                Back
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="General" {...a11yProps(0)} />
                            <Tab label="Security" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <General />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Security />
                    </CustomTabPanel>
                </Box>
            </Container>
        </div>
    )
}

export default View
