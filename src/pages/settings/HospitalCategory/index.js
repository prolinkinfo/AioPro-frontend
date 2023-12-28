import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddHospitalCategory from './Add'
import EditHospitalCategory from './Edit'
import { apiget } from '../../../service/api'
import { fetchHospitalCategoryData } from '../../../redux/slice/GetHospitalCategorySlice';

const HospitalCategory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [categoryData, setCategoryData] = useState({})
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const hospitalCategory = useSelector((state)=>state?.getHospitalCategory?.data);

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setCategoryData(data);
                    handleOpenEdit();
                };
                return (
                    <Box>
                        <EditHospitalCategory isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchHospitalCategoryData={fetchHospitalCategoryData} data={categoryData} />
                        <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={()=>handleClick(params?.row)}> Edit</Button>
                    </Box>
                );
            },
        },
        { field: 'hospitalCategory', headerName: 'Hospital Category', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = hospitalCategory?.filter(({ hospitalCategory }) =>
          hospitalCategory?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setCategoryList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : hospitalCategory)
      };
    

    useEffect(() => {
        fetchData();
    }, [hospitalCategory])

    useEffect(() => {
        dispatch(fetchHospitalCategoryData());
    }, [])

    return (
        <div>
            {/* Add Hospital Category */}
            <AddHospitalCategory isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchHospitalCategoryData={fetchHospitalCategoryData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Hospital Category</Typography>
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
                                rows={categoryList}
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

export default HospitalCategory
