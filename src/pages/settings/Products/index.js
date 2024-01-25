/* eslint-disable camelcase */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProduct from './Add';
import EditProduct from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget, apiput } from '../../../service/api'
import { fetchProductData } from '../../../redux/slice/GetProductSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import CustomMenu from '../../../components/CustomMenu';
import ImportFileModel from './components/ImportFileModel';
import product_samFile from '../../../assets/files/product_samFile.xlsx'

const statusList = [
    "Active",
    "Deactive"
]

const Product = () => {

    const [productList, setProductList] = useState([])
    const [productData, setProductData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenImport, setisOpenImport] = useState(false);
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
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();

    const product = useSelector((state) => state?.getProduct?.data);
    const divisionList = useSelector((state) => state?.getDivision?.data);

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 130,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setProductData(data)
                };
                return (
                    <Box>
                        <EditProduct isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchProductData={fetchProductData} data={productData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSchemeMaster} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            type={"delete"}
                            handleOpenEdit={handleOpenEdit}
                        />
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
                    const pyload = {
                        _id: data?._id,
                        status: data?.status === "active" ? "deactive" : data?.status === "deactive" ? "active" : "",
                    }
                    const result = await apiput(`/api/products/changeStatus`, pyload);
                    if (result && result.status === 200) {
                        dispatch(fetchProductData());
                    }
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
    const csvColumns = [
        { Header: "Product Name", accessor: "productName" },
        { Header: "Product Code", accessor: "productCode" },
        { Header: "Division", accessor: "division" },
        { Header: "Composition Name", accessor: "compositionName" },
        { Header: "MRP", accessor: "mrp" },
        { Header: "Out Price", accessor: "outPrice" },
        { Header: "Packaging", accessor: "packaging" },
        { Header: "Tax Type", accessor: "taxType" },
        { Header: "Tax Percent", accessor: "taxPercent" },
        { Header: "HSN", accessor: "hsn" },
        { Header: "Product Group", accessor: "productGroup" },
        { Header: "Grade", accessor: "grade" },
        { Header: "Size", accessor: "size" },
        { Header: "Status", accessor: "status" },
    ];

    const downloadExcel = () => {
        const AllRecords = productList?.map((rec) => {
            const selectedFieldsData = {};
            csvColumns.forEach((item) => {
                const accessor = item.accessor;
                // Check if the accessor has nested properties
                if (accessor.includes('.')) {
                    const nestedProperties = accessor.split('.');
                    let nestedValue = rec;
                    nestedProperties.forEach((prop) => {
                        nestedValue = nestedValue?.[prop];
                    });
                    selectedFieldsData[accessor] = nestedValue;
                } else {
                    selectedFieldsData[accessor] = rec[accessor];
                }
            });
            return selectedFieldsData;
        });
        convertJsonToExcel(AllRecords, csvColumns, 'product');
    };

    const convertJsonToExcel = (jsonArray, csvColumns, fileName) => {
        const csvHeader = csvColumns.map((col) => col.Header);
        const csvContent = [
            csvHeader,
            ...jsonArray.map((row) => csvColumns.map((col) => row[col.accessor])),
        ];

        const ws = XLSX.utils.aoa_to_sheet(csvContent);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        // Auto-size columns
        const colWidths = csvContent[0]?.map((col, i) => {
            return {
                wch: Math.max(...csvContent?.map((row) => row[i]?.toString()?.length)),
            };
        });
        ws['!cols'] = colWidths;

        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    
    const downloadSamFile = () => {
        window.open(product_samFile)
    }


    const deleteSchemeMaster = async (id) => {
        const result = await apidelete(`/api/products/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = product?.filter(({ productName, division, compositionName, mrp, outPrice, packaging, taxType, hsn, productGroup, grade, size, status }) =>
            productName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            division?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            compositionName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            outPrice?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            packaging?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            taxType?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            hsn?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            productGroup?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            grade?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            size?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            status?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setProductList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : product)
    };

    const filterData = (value) => {
        const filtered = product?.filter(({ division, status }) =>
            division?.toLowerCase()?.includes(value?.toLowerCase()) ||
            status?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setProductList(value?.length > 0 ? (filtered?.length > 0 ? filtered : []) : product)
    }

    useEffect(() => {
        dispatch(fetchProductData());
        dispatch(fetchDivisionData());
    }, [userAction])

    useEffect(() => {
        fetchData();
        filterData();
    }, [product])

    return (
        <div>
            {/* import File */}
            <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

            {/* Add Product */}
            <AddProduct isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProductData={fetchProductData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product</Typography>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                        Add New
                                    </Button>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                        <Link to={`/${userRole}/dashboard/setting/applicationMaster/productGroup`} style={{ color: 'white', textDecoration: 'none' }}>
                                            Add Group
                                        </Link>
                                    </Button>
                                    <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} style={{ marginLeft: '10px' }} onClick={downloadExcel}>
                                        Export
                                    </Button>
                                </Stack>
                                <Stack direction={"row"} spacing={2}>
                                    <Tooltip title="Upload File" arrow>
                                        <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} onClick={() => setisOpenImport(true)}>
                                            Import
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Download Sample File" arrow>
                                        <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} onClick={downloadSamFile}>
                                            Download
                                        </Button>
                                    </Tooltip>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} >
                                    <Stack direction={"row"} spacing={2}>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            onChange={(event, newValue) => {
                                                filterData(newValue ? newValue.divisionName : "")
                                            }}
                                            sx={{ width: 200 }}
                                            options={divisionList}
                                            size='small'
                                            getOptionLabel={(division) => division?.divisionName}
                                            renderInput={(params) => <TextField {...params} placeholder='Filter By Division' style={{ fontSize: "12px" }} />}
                                        />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={statusList}
                                            size='small'
                                            sx={{ width: 200 }}
                                            onChange={(event, newValue) => {
                                                filterData(newValue || "")
                                            }}
                                            getOptionLabel={(status) => status}
                                            renderInput={(params) => <TextField {...params} placeholder='Filter By Status' style={{ fontSize: "12px" }} />}
                                        />
                                    </Stack>
                                    <Box>
                                        <TextField
                                            type='text'
                                            size='small'
                                            placeholder='Search'
                                            onChange={fetchData}
                                        />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Card style={{ height: '60vh' }}>
                            <DataGrid
                                rows={productList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div >
    )
}

export default Product
