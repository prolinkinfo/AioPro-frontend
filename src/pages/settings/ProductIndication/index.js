import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProductIndication from './Add';
import EditProductIndication from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchProductIndicationData } from '../../../redux/slice/GetProductIndicationSlice';
import CustomMenu from '../../../components/CustomMenu';

const ProductIndication = () => {

    const [productIndicationList, setProductIndicationList] = useState([])
    const [productIndicationData, setProductIndicationData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const productIndication = useSelector((state) => state?.getProductIndication?.data)

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
                    setProductIndicationData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditProductIndication isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchProductIndicationData={fetchProductIndicationData} data={productIndicationData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteProductIndication} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenEdit={handleOpenEdit}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'productName', headerName: 'Product Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'indication', headerName: 'indication', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const deleteProductIndication = async (id) => {
        const result = await apidelete(`/api/productindication/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = productIndication?.filter(({ productName, indication }) =>
            productName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            indication?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setProductIndicationList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : productIndication)
    };

    useEffect(() => {
        dispatch(fetchProductIndicationData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [productIndication])

    return (
        <div>
            {/* Add Product Indication */}
            <AddProductIndication isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProductIndicationData={fetchProductIndicationData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product Indication</Typography>

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
                                rows={productIndicationList}
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

export default ProductIndication
