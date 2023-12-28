import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProduct from './Add';
import EditProduct from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchProductGroupData } from '../../../redux/slice/GetProductGroupSlice';

const ProductGroup = () => {

    const [productGroupList, setProductGroupList] = useState([])
    const [productGroupData, setProductGroupData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const productGroup = useSelector((state) => state?.getProductGroup?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setProductGroupData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditProduct isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchProductGroupData={fetchProductGroupData} data={productGroupData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'groupName', headerName: 'Group Name', flex: 1 },
        { field: 'groupCategory', headerName: 'Group Category', flex: 1 },
        { field: 'orderBy', headerName: 'Order By', flex: 1 },
    ];

    const deleteGroup = async (id) => {
        const result = await apidelete(`/api/productgroup/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = productGroup?.filter(({ groupCategory, groupName, orderBy }) =>
            groupCategory?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            groupName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            orderBy?.toLowerCase()?.includes(searchText?.toLowerCase()) 
        )
        setProductGroupList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : productGroup)
    };

    useEffect(() => {
        dispatch(fetchProductGroupData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [productGroup])

    return (
        <div>
            {/* Add Product Group */}
            <AddProduct isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProductGroupData={fetchProductGroupData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product Group</Typography>

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
                                rows={productGroupList}
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

export default ProductGroup
