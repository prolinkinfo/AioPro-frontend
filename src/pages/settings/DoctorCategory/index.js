import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddCategory from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import CustomMenu from '../../../components/CustomMenu';

const DoctorCategory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [userAction, setUserAction] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id, setId] = useState('')
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const doctorCategory = useSelector((state) => state?.getDoctorCategory?.data)

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
                    setId(data?._id)
                };
                return (
                    <Box>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteCategory} id={id} fetchData={fetchCategoryData} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            type={"edit"}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'categoryName', headerName: 'Category Name', flex: 1 },
        { field: 'minimumPreference', headerName: 'Minimum Preference', flex: 1 },
        { field: 'maximumPreference', headerName: 'Maximum Preference', flex: 1 },
    ];

    const deleteCategory = async (id) => {
        const result = await apidelete(`/api/doctorcategory/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = doctorCategory?.filter(({ categoryName }) =>
            categoryName?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setCategoryList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : doctorCategory)
    };


    useEffect(() => {
        dispatch(fetchCategoryData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [doctorCategory])

    return (
        <div>
            {/* Add Category */}
            <AddCategory isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchCategoryData={fetchCategoryData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Category</Typography>

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

export default DoctorCategory
