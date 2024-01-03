import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddCategory from './Add'
import EditCategory from './Edit'
import { apiget } from '../../../service/api'
import { fetchFirmCategoryData } from '../../../redux/slice/GetFirmCategorySlice';
import CustomMenu from '../../../components/CustomMenu';

const FirmCategory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [categoryData, setCategoryData] = useState({})
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const firmCategory = useSelector((state) => state?.getFirmCategory?.data)

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
                    setCategoryData(data)
                };
                return (
                    <Box>
                        <EditCategory isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchFirmCategoryData={fetchFirmCategoryData} data={categoryData} />
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
        { field: 'firmCategory', headerName: 'Firm Category', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = firmCategory?.filter(({ firmCategory }) =>
            firmCategory?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setCategoryList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : firmCategory)
    };

    useEffect(() => {
        dispatch(fetchFirmCategoryData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [firmCategory])

    return (
        <div>
            {/* Add Category */}
            <AddCategory isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchFirmCategoryData={fetchFirmCategoryData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Firm Category</Typography>

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

export default FirmCategory
