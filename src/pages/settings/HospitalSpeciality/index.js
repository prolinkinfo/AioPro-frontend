import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddHospitalSpeciality from './Add';
import EditHospitalSpeciality from './Edit'
import { apiget } from '../../../service/api'

const HospitalSpeciality = () => {

    const [specialityList, setSpecialityList] = useState([])
    const [specialityData, setSpecialityData] = useState({})

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setSpecialityData(data);
                    handleOpenEdit();
                };
                return (
                    <Box>
                        <EditHospitalSpeciality isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchSpecialityData={fetchSpecialityData} data={specialityData} />
                        <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={()=>handleClick(params?.row)}> Edit</Button>
                    </Box>
                );
            },
        },
        { field: 'hospitalSpeciality', headerName: 'Hospital Speciality', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const fetchSpecialityData = async () => {
        const result = await apiget(`/api/hospitalspeciality`);
        if (result && result.status === 200) {
            setSpecialityList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchSpecialityData();
    }, [])

    return (
        <div>
            {/* Add Hospital Speciality */}
            <AddHospitalSpeciality isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchSpecialityData={fetchSpecialityData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Hospital Speciality</Typography>

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
                            />
                        </Stack>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={specialityList}
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

export default HospitalSpeciality
