/* eslint-disable prefer-const */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProductSample from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchProSampleDetails } from '../../../redux/slice/GetProductSampleDetailsSlice';
import CustomMenu from '../../../components/CustomMenu';

const ProductSample = () => {

    const [sampleList, setSampleList] = useState([])

    const [userAction, setUserAction] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id, setId] = useState('')
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const productSampleDetails = useSelector((state) => state?.getProductSampleDetails?.data)

    const fullName = (name) => {
        let separatedNames = name.split(/(?=[A-Z])/);
        let firstName = separatedNames[0];
        let lastName = separatedNames[1];

        return `${firstName} ${lastName}`
    }


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
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteProductSample} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            type={"edit"}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            flex: 1,
            cellClassName: 'name-column--cell--capitalize',
            renderCell: (params) => (
                <Box>
                    {fullName(params?.row?.employeeName)}
                </Box>
            )
        },
        { field: 'productName', headerName: 'Product Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
    ];

    const deleteProductSample = async (id) => {
        const result = await apidelete(`/api/productSampleDetails/${id}`);
        setUserAction(result)
    }
    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = productSampleDetails?.filter(({ employeeName, divisionName }) =>
            employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setSampleList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : productSampleDetails)
    };

    useEffect(() => {
        dispatch(fetchProSampleDetails());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [productSampleDetails])

    return (
        <div>
            {/* Add Product Sample */}
            <AddProductSample isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProSampleDetails={fetchProSampleDetails} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product Sample Details</Typography>

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
                                rows={sampleList}
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

export default ProductSample
