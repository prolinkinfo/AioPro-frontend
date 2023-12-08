import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddSpeciality from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditDoctorSpeciality from './Edit'

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]
const DoctorSpeciality = () => {

    const [specialityList, setSpecialityList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [activityTypeData, setActivityTypeData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

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
                    setActivityTypeData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditDoctorSpeciality isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchSpecialityData={fetchSpecialityData} data={activityTypeData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSpeciality} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'specialityName', headerName: 'Speciality Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'group', headerName: 'Group', flex: 1, cellClassName: 'name-column--cell--capitalize' }, 0
    ];

    const deleteSpeciality = async (id) => {
        const result = await apidelete(`/api/doctorspeciality/${id}`);
        setUserAction(result)
    }


    const fetchSpecialityData = async () => {
        const result = await apiget(`/api/doctorspeciality`);
        if (result && result.status === 200) {
            setSpecialityList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchSpecialityData();
    }, [userAction])

    return (
        <div>
            {/* Add Speciality */}
            <AddSpeciality isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchSpecialityData={fetchSpecialityData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Speciality</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                        Add New
                                    </Button>
                                    <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} style={{ marginLeft: '10px' }}>
                                        Export
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"end"}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={top100Films}
                                        size='small'

                                        renderInput={(params) => <TextField {...params} placeholder='Filter By Division' style={{ fontSize: "12px" }} />}
                                    />
                                    <TextField
                                        type='text'
                                        size='small'
                                        placeholder='Search'
                                        style={{ width: "200px" }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={specialityList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5,10, 25, 50]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default DoctorSpeciality
