/* eslint-disable prefer-const */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddProductSample from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchProSampleDetails } from '../../../redux/slice/GetProductSampleDetailsSlice';
import CustomMenu from '../../../components/CustomMenu';
import ImportFileModel from './components/ImportFileModel';
import productSamplessamFile from '../../../assets/files/productSamples_samFile.xlsx'

const ProductSample = () => {

    const [sampleList, setSampleList] = useState([])

    const [userAction, setUserAction] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [isOpenImport, setisOpenImport] = useState(false);
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
    // const csvColumns = [
    //     { Header: "Division Name", accessor: "divisionName" },
    //     { Header: "Employee Name", accessor: "employeeName" },
    //     { Header: "Product Name", accessor: "productName" },
    //     { Header: "Quantity", accessor: "quantity" },
    // ];

    // const downloadExcel = () => {
    //     const AllRecords = sampleList?.map((rec) => {
    //         const selectedFieldsData = {};
    //         csvColumns.forEach((item) => {
    //             const accessor = item.accessor;
    //             // Check if the accessor has nested properties
    //             if (accessor.includes('.')) {
    //                 const nestedProperties = accessor.split('.');
    //                 let nestedValue = rec;
    //                 nestedProperties.forEach((prop) => {
    //                     nestedValue = nestedValue?.[prop];
    //                 });
    //                 selectedFieldsData[accessor] = nestedValue;
    //             } else {
    //                 selectedFieldsData[accessor] = rec[accessor];
    //             }
    //         });
    //         return selectedFieldsData;
    //     });
    //     convertJsonToExcel(AllRecords, csvColumns, 'productSamples');
    // };

    // const convertJsonToExcel = (jsonArray, csvColumns, fileName) => {
    //     const csvHeader = csvColumns.map((col) => col.Header);
    //     const csvContent = [
    //         csvHeader,
    //         ...jsonArray.map((row) => csvColumns.map((col) => row[col.accessor])),
    //     ];

    //     const ws = XLSX.utils.aoa_to_sheet(csvContent);
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    //     // Auto-size columns
    //     const colWidths = csvContent[0]?.map((col, i) => {
    //         return {
    //             wch: Math.max(...csvContent?.map((row) => row[i]?.toString()?.length)),
    //         };
    //     });
    //     ws['!cols'] = colWidths;

    //     XLSX.writeFile(wb, `${fileName}.xlsx`);
    // };
    const downloadSamFile = () => {
        window.open(productSamplessamFile)
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
            {/* import File */}
            <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

            {/* Add Product Sample */}
            <AddProductSample isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchProSampleDetails={fetchProSampleDetails} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Product Sample Details</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        {/* <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                                onChange={fetchData}
                            />
                        </Stack> */}
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box>
                                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                            Add New
                                        </Button>
                                        
                                    </Box>
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
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                                <TextField
                                    type='text'
                                    size='small'
                                    placeholder='Search'
                                    // style={{ width: "300px" }}
                                    onChange={fetchData}
                                />
                            </Grid>
                        </Grid>
                        <Card style={{ height: '60vh' }}>
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
