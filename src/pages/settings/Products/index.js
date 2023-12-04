import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProduct from './Add';
import EditProduct from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]

const Product = () => {

    const [productList, setProductList] = useState([])
    const [productData, setProductData] = useState({})
    const [userAction, setUserAction] = useState(null)
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

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 130,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setProductData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditProduct isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchProductData={fetchProductData} data={productData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSchemeMaster} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                const chengStatus = async (data) => {

                };
                return (
                    <Box>
                        <Button
                            variant="outlined"
                            size='small'
                            style={{
                                color: params.value === 'active' ? '#22C55E' : '#B61D18',
                                background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                                border: 'none',
                            }}
                            onClick={() => chengStatus(params?.row)}
                        >
                            {params.value}
                        </Button>
                    </Box>
                );
            },
        },
        { field: 'productName', headerName: 'Product Name', width: 300, cellClassName: 'name-column--cell--capitalize' },
        { field: 'productCode', headerName: 'Product Code', width: 150 },
        { field: 'division', headerName: 'Division', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'compositionName', headerName: 'Composition Name', width: 200, cellClassName: 'name-column--cell--capitalize' },
        { field: 'mrp', headerName: 'MRP', width: 150 },
        { field: 'outPrice', headerName: 'Out Price', width: 150 },
        { field: 'packaging', headerName: 'Packaging', width: 150 },
        {
            field: 'taxType',
            headerName: 'Tax',
            width: 100,
            renderCell: (params) => (
                <Box>
                    {
                        params?.row?.taxType ? `${params?.row?.taxType}(${params?.row?.taxPercent}%)` : ""
                    }
                </Box>
            ),
        },
        { field: 'hsn', headerName: 'HSN', width: 150 },
        { field: 'productGroup', headerName: 'Group Name', width: 300, cellClassName: 'name-column--cell--capitalize' },
        { field: 'grade', headerName: 'Grade', width: 100, cellClassName: 'name-column--cell--capitalize' },
        { field: 'size', headerName: 'Size', width: 100 },

    ];

    const deleteSchemeMaster = async (id) => {
        const result = await apidelete(`/api/products/${id}`);
        setUserAction(result)
    }

    const fetchProductData = async () => {
        const result = await apiget(`/api/products`);
        if (result && result.status === 200) {
            setProductList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [userAction])

    return (
        <div>
            {/* Add Product */}
            <AddProduct isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProductData={fetchProductData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product</Typography>

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
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={top100Films}
                                        size='small'

                                        renderInput={(params) => <TextField {...params} placeholder='Filter By Status' style={{ fontSize: "12px" }} />}
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
                                rows={productList}
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

export default Product
