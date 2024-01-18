/* eslint-disable prefer-const */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddPromotionalGift from './Add';
import EditCollectionCenter from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchPromotionalGiftData } from '../../../redux/slice/GetPromotionalGiftSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import CustomMenu from '../../../components/CustomMenu';
import ImportFileModel from './components/ImportFileModel';
import promotionalGiftSamFile from '../../../assets/files/promotionalGift_samFile.xlsx'

const PromotionalGifts = () => {

    const [promotionalGiftList, setPromotionalGiftList] = useState([])
    const [promotionalGiftData, setpromotionalGiftData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [isOpenImport, setisOpenImport] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const promotionalGift = useSelector((state) => state?.getPromotionalGift?.data)

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
            width: 200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setpromotionalGiftData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchPromotionalGiftData={fetchPromotionalGiftData} data={promotionalGiftData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
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
        { field: 'divisionName', headerName: 'Division Name', width: 200 },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {fullName(params?.row?.employeeName)}
                </Box>
            )
        },
        { field: 'giftName', headerName: 'Gift Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'remaining', headerName: 'Remaining', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) =>
            // const chengStatus = async(data) => {
            //   const pyload = {
            //     _id: data?._id,
            //     status: data?.status === "active" ? "deactive" : data?.status === "deactive" ? "active" : "",
            //   }
            //   const result = await apiput(`/api/users/changeStatus`, pyload);
            //   if (result && result.status === 200) {
            //     fetchdata();
            //   }
            // };
            (
                <Box>
                    <Button
                        variant="outlined"
                        style={{
                            color: params.value === 'active' ? '#22C55E' : '#B61D18',
                            background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                            border: 'none',
                        }}

                    >
                        {params.value}
                    </Button>
                </Box>
            )
            ,
        },
    ];

    //  const csvColumns = [
    //     { Header: "Division Name", accessor: "divisionName" },
    //     { Header: "Employee Name", accessor: "employeeName" },
    //     { Header: "Gift Name", accessor: "giftName" },
    //     { Header: "Quantity", accessor: "quantity" },
    //     { Header: "Status", accessor: "status" },
    // ];

    // const downloadExcel = () => {
    //     const AllRecords = promotionalGiftList?.map((rec) => {
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
    //     convertJsonToExcel(AllRecords, csvColumns, 'promotionalGift');
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
        window.open(promotionalGiftSamFile)
    }

    const deleteGroup = async (id) => {
        const result = await apidelete(`/api/promotionalGift/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = promotionalGift?.filter(({ divisionName, employeeName, giftName, status }) =>
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            giftName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            status?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setPromotionalGiftList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : promotionalGift)
    };

    useEffect(() => {
        dispatch(fetchPromotionalGiftData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [promotionalGift])

    return (
        <div>
            {/* import File */}
            <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

            {/* Add Promotional Gift */}
            <AddPromotionalGift isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchPromotionalGiftData={fetchPromotionalGiftData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Promotional Gifts</Typography>
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
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={promotionalGiftList}
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

export default PromotionalGifts
