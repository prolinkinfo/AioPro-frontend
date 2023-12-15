/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import { fetchDoctorData } from '../../../redux/slice/GetDoctorSlice';
import { apidelete } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'

const Doctor = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const doctorList = useSelector((state) => state?.getDoctor?.data)
    const navigate = useNavigate();
    const [userAction, setUserAction] = useState(null)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 350,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    navigate(`/${userRole}/dashboard/people/doctor/update_doctor/${data?._id}`)
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        {/* <EditProduct isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchProductGroupData={fetchProductGroupData} data={productGroupData} /> */}
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteDoctor} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            {/* <Button variant='outlined' startIcon={<EditIcon />} size='small'> Deactive</Button> */}
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: 'doctorId',
            headerName: 'Doctor ID',
            width: 120
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            width: 200,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.addressInformation?.city}
                    </Box>
                );
            },
        },
        {
            field: 'hospitalName',
            headerName: 'Hospital Name',
            width: 250
        },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 250,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.assignedTo}
                    </Box>
                );
            },
        },
        {
            field: 'immediateSenior',
            headerName: 'Immediate Senior',
            width: 250
        },
        {
            field: 'contactNumber',
            headerName: 'Contact Number',
            width: 200
        },
        {
            field: 'speciality',
            headerName: 'Speciality',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.speciality}
                    </Box>
                );
            },
        },
        {
            field: 'qualification',
            headerName: 'Qualification',
            width: 130,
        },
        {
            field: 'division',
            headerName: 'Division',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.addressInformation?.division}
                    </Box>
                );
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.category}
                    </Box>
                );
            },
        },
        {
            field: 'zone',
            headerName: 'Zone',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.addressInformation?.zone}
                    </Box>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 130
        },
        {
            field: 'dateOfBirth',
            headerName: 'DOB',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {moment(params?.row?.dateOfBirth).format("DD/MM/YYYY")}
                    </Box>
                );
            },
        },
        {
            field: 'anniversaryDate',
            headerName: 'Anniversary',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {moment(params?.row?.anniversaryDate).format("DD/MM/YYYY")}
                    </Box>
                );
            },
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.type}
                    </Box>
                );
            },
        },
        {
            field: 'firmName',
            headerName: 'Firm',
            width: 250,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.firmName}
                    </Box>
                );
            },
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 130,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.workInformation?.country}
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130
        },
    ];



    const deleteDoctor = async (id) => {
        const result = await apidelete(`/api/doctor/${id}`);
        setUserAction(result)
    }



    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
    ]

    useEffect(() => {
        dispatch(fetchDoctorData());
    }, [userAction])

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctors</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            <Link to={`/${userRole}/dashboard/people/doctor/add`} style={{ color: 'white', textDecoration: 'none' }}>Add Doctor</Link>
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />}>
                            Export
                        </Button>
                    </Stack>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    size='small'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} placeholder='Select Speciality' style={{ fontSize: "12px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    size='small'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} placeholder='Select Category' style={{ fontSize: "12px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    size='small'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    fullWidth
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select Status' />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    fullWidth
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select Division' />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    fullWidth
                                    options={top100Films}
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "15px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    fullWidth
                                    options={top100Films}
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select City' style={{ fontSize: "15px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    fullWidth
                                    options={top100Films}
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "15px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    fullWidth
                                    options={top100Films}
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select Manager' style={{ fontSize: "15px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"end"} mb={2}>
                                    <TextField
                                        type='text'
                                        size='small'
                                        placeholder='Search'
                                    />
                                    <Button variant='contained'>Go</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Card style={{ height: '72vh', marginTop: "10px" }}>
                            <DataGrid
                                rows={doctorList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={(row) => row._id}

                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default Doctor
