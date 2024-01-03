/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import AddTarget from './AddTarget';
import { fetchTargetData } from '../../../redux/slice/GetTargetSlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const yearList = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
]
const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const quarterList = [
    "1 Quarter",
    "2 Quarter",
    "3 Quarter",
    "4 Quarter",
]

const Target = () => {

    const [targetList, setTargetList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const dispatch = useDispatch();


    const target = useSelector((state) => state?.getTarget?.data)
    const zoneList = useSelector((state) => state?.getZone?.data)
    const divisionList = useSelector((state) => state?.getDivision?.data)
    const employee = useSelector((state) => state?.getEmployee?.data)


    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [taxData, setTaxData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const convertJsonToExcel = (jsonArray, fileName) => {
        const field = jsonArray?.map((item) => {
            return {
                "Sr No": item?.srNo,
                "Employee Name": item?.employeeName,
                "Headquarter": "",
                "Frequency": item?.frequency,
                "Month": item?.month,
                "Quarter": item?.quarter,
                "Year": item?.year,
                "Pob Sec Value": item?.pobSec,
                "Firm Sec Value": item?.firmSec,
                "No Of Dr Visit": item?.noOfDrVisit,
                "No Of Chemist Visit": item?.noOfChemistVisit,
                "No Of New Chemist Addition": item?.noOfNewChemistAdddition,
                "No Of New Doctor Addition": item?.noOfNewDoctorAdddition,
            };
        });
        const ws = XLSX.utils.json_to_sheet(field);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, `${fileName}.xls`);
    };

    const columns = [
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     sortable: false,
        //     flex: 1,
        //     // eslint-disable-next-line arrow-body-style
        //     renderCell: (params) => {
        //         const handleClick = async (data) => {
        //             setTaxData(data);
        //             handleOpenEdit();
        //         };

        //         const handleClickDeleteBtn = async (data) => {
        //             setId(data?._id);
        //             handleOpenDeleteModel();
        //         };
        //         return (
        //             <Box>
        //                 {/* <EditTax isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTaxData={fetchTaxData} data={taxData} /> */}
        //                 <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteTax} id={id} />

        //                 <Stack direction={"row"} spacing={2}>
        //                     <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
        //                     <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
        //                 </Stack>
        //             </Box>
        //         );
        //     },
        // },
        { field: 'srNo', headerName: 'Sr.No', width: 100 },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 300,
            cellClassName: 'name-column--cell--capitalize'

        },
        { field: 'headquarter', headerName: 'Headquarter', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'frequency', headerName: 'Frequency', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'month', headerName: 'Month', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'quarter', headerName: 'Quarter', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'year', headerName: 'Year', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'pobSec', headerName: 'POB SEC. Value', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'firmSec', headerName: 'FIRM SEC. Value', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'noOfDrVisit', headerName: 'No Of DR. Visit	', width: 150 },
        { field: 'noOfChemistVisit', headerName: 'No Of Chemist Visit	', width: 150 },
        { field: 'noOfNewChemistAdddition', headerName: 'No Of New Chemist Adddition	', width: 150 },
        {
            field: 'noOfNewDoctorAdddition', headerName: 'No Of New Doctor Adddition', width: 150
        },
    ];

    const fetchData = async (searchText) => {
        const filtered = target?.filter(({ zone, employeeName, month, quarter, year }) =>
            zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            month?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            quarter?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            year?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setTargetList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : target)
    };

    const fetchEmployee = (division) => {
        if (employee) {
            const filterEmp = employee?.filter((employee) => employee?.contactInformation?.division?.toLowerCase() === division?.toLowerCase())
            setEmployeeList(filterEmp);
        }
    }

    useEffect(() => {
        dispatch(fetchTargetData());
        dispatch(fetchZoneData());
        dispatch(fetchDivisionData());
        dispatch(fetchEmployeeData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [target])


    return (
        <div>
            {/* Add Target */}
            <AddTarget isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTargetData={fetchTargetData} />

            {/* <Container maxWidth="xl"> */}
            <TableStyle>
                <Box width="100%" pt={3}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                onChange={(event, newValue) => {
                                    fetchData(newValue ? newValue.zoneName : "");
                                }}
                                id="combo-box-demo"
                                options={zoneList}
                                getOptionLabel={(zone) => zone?.zoneName}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                onChange={(event, newValue) => {
                                    fetchEmployee(newValue ? newValue.divisionName : "");
                                }}
                                options={divisionList}
                                getOptionLabel={(division) => division?.divisionName}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Division' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                onChange={(event, newValue) => {
                                    fetchData(newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                                }}
                                id="combo-box-demo"
                                options={employeeList}
                                size='small'
                                fullWidth
                                getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                size="small"
                                onChange={(event, newValue) => {
                                    fetchData(newValue || '');
                                }}
                                fullWidth
                                options={monthList}
                                getOptionLabel={(month) => month}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select Month'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                size="small"
                                onChange={(event, newValue) => {
                                    fetchData(newValue || '');
                                }}
                                fullWidth
                                options={quarterList}
                                getOptionLabel={(quarter) => quarter}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select Quarter'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                size="small"
                                onChange={(event, newValue) => {
                                    fetchData(newValue || '');
                                }}
                                fullWidth
                                options={yearList}
                                getOptionLabel={(year) => year}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select Year'
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Stack direction={"row"} spacing={2} my={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add New
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={() => convertJsonToExcel(target, 'target')}>
                            Export
                        </Button>
                    </Stack>
                    <Card style={{ height: '72vh' }}>
                        <DataGrid
                            rows={targetList}
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
            {/* </Container> */}
        </div>
    )
}

export default Target
