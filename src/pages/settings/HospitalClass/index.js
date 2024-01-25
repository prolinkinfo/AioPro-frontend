import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddHospitalClass from './Add';
import EditHospitalClass from './Edit'
import { apiget } from '../../../service/api'
import { fetchHospitalClassData } from '../../../redux/slice/GetHospitalClassSlice';
import CustomMenu from '../../../components/CustomMenu';

const HospitalClass = () => {

    const [classList, setClassList] = useState([])
    const [classData, setClassData] = useState({})
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const hospitalClass = useSelector((state) => state?.getHospitalClass?.data)

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
                    setClassData(data)
                };
                return (
                    <Box>
                        <EditHospitalClass isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchHospitalClassData={fetchHospitalClassData} data={classData} />
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
        { field: 'hospitalClass', headerName: 'Hospital Class', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = hospitalClass?.filter(({ hospitalClass }) =>
            hospitalClass?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setClassList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : hospitalClass)
    };

    useEffect(() => {
        fetchData();
    }, [hospitalClass])

    useEffect(() => {
        dispatch(fetchHospitalClassData());
    }, [])

    return (
        <div>
            {/* Add Hospital Class */}
            <AddHospitalClass isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchHospitalClassData={fetchHospitalClassData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Hospital Class</Typography>

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
                        <Card style={{ height: '60vh' }}>
                            <DataGrid
                                rows={classList}
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

export default HospitalClass
