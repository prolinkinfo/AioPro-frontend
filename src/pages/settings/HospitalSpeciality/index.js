import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddHospitalSpeciality from './Add';
import EditHospitalSpeciality from './Edit'
import { apiget } from '../../../service/api'
import { fetchHospitalSpecialityData } from '../../../redux/slice/GetHospitalSpecialitySlice';
import CustomMenu from '../../../components/CustomMenu';

const HospitalSpeciality = () => {

    const [specialityList, setSpecialityList] = useState([])
    const [specialityData, setSpecialityData] = useState({})
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const hospitalSpeciality = useSelector((state) => state?.getHospitalSpeciality?.data)


    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setSpecialityData(data)
                };
                return (
                    <Box>
                        <EditHospitalSpeciality isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchHospitalSpecialityData={fetchHospitalSpecialityData} data={specialityData} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            handleOpenEdit={handleOpenEdit}
                            type={"delete"}
                        />
                    </Box>
                );
            },
        },
        { field: 'hospitalSpeciality', headerName: 'Hospital Speciality', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = hospitalSpeciality?.filter(({ hospitalSpeciality, divisionName }) =>
            hospitalSpeciality?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setSpecialityList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : hospitalSpeciality)
    };

    useEffect(() => {
        dispatch(fetchHospitalSpecialityData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [hospitalSpeciality])

    return (
        <div>
            {/* Add Hospital Speciality */}
            <AddHospitalSpeciality isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchHospitalSpecialityData={fetchHospitalSpecialityData} />

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
                                onChange={fetchData}
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
