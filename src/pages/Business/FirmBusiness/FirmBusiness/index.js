/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../../../components/iconify';
import { fetchZoneData } from '../../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../../redux/slice/GetDivisionSlice';
import { fetchEmployeeData } from '../../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../../redux/slice/GetFirmTypesSlice';

const data = [
    {
        _id: "1",
        sNo: "1",
        doctorName: "AKHILESH DEORAS",
        Speciality: "",
        City: "Bilaspur",
        empName: "JAYPRAKASH SAHU",
    },
    {
        _id: "2",
        sNo: "2",
        doctorName: "ARIHANT JAIN",
        Speciality: "Physician",
        City: "Bilaspur",
        empName: "JAYPRAKASH SAHU",
    }
]
const monthList = [
    { label: 'January', i: 0 },
    { label: 'February', i: 1 },
    { label: 'March', i: 2 },
    { label: 'April', i: 3 },
    { label: 'May', i: 4 },
    { label: 'June', i: 5 },
    { label: 'July', i: 6 },
    { label: 'August', i: 7 },
    { label: 'September', i: 8 },
    { label: 'October', i: 9 },
    { label: 'November', i: 10 },
    { label: 'December', i: 11 },
];

const yearList = [
    { label: '2022' },
    { label: '2023' },
    { label: '2024' },
    { label: '2025' },
    { label: '2026' },
    { label: '2027' },
];
const FirmBusiness = () => {
    const [employeeList, setEmployeeList] = useState([])
    const [business, setBusiness] = useState([])
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch()

    const zoneList = useSelector((state) => state?.getZone.data)
    const divisionList = useSelector((state) => state?.getDivision.data)
    const employee = useSelector((state) => state?.getEmployee?.data)
    const firmTypeList = useSelector((state) => state?.geFirmType?.data)

    const handleChange = (index, value) => {
        const newValues = [...business];
        newValues[index] = Number(value);
        setBusiness(newValues);

        const newTotal = newValues.reduce((acc, currentValue) => acc + (currentValue || 0), 0);
        setTotal(newTotal);
    };

    const fetchEmployee = (name) => {
        if (employee) {
            const filtered = employee?.filter(({ contactInformation }) =>
                contactInformation?.zone?.toLowerCase() === name?.toLowerCase()
            )
            setEmployeeList(name?.length > 0 ? (filtered?.length > 0 ? filtered : []) : employee)
        }
    }

    useEffect(() => {
        dispatch(fetchZoneData());
        dispatch(fetchDivisionData());
        dispatch(fetchEmployeeData());
        dispatch(firmaTypeData());
    }, [])

    useEffect(() => {
        fetchEmployee();
    }, [employee])

    return (
        <div>
            <Box width="100%" pt={3}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                fetchEmployee(newValue ? newValue.zoneName : "");
                            }}
                            id="combo-box-demo"
                            options={zoneList}
                            getOptionLabel={(zone) => zone?.zoneName}
                            size='small'
                            fullWidth
                            renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "12px" }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            onChange={(event, newValue) => {
                                // fetchEmployee(newValue ? newValue.divisionName : "");
                            }}
                            options={divisionList}
                            getOptionLabel={(division) => division?.divisionName}
                            size='small'
                            fullWidth
                            renderInput={(params) => <TextField {...params} placeholder='Select Division' style={{ fontSize: "12px" }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                                // fetchData(newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                            }}
                            id="combo-box-demo"
                            options={employeeList}
                            size='small'
                            fullWidth
                            getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                            renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "12px" }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                // fetchData(newValue || '');
                            }}
                            fullWidth
                            options={monthList}
                            getOptionLabel={(month) => month?.label}
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

                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                // fetchData(newValue || '');
                            }}
                            fullWidth
                            options={yearList}
                            getOptionLabel={(year) => year?.label}
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
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                // fetchData(newValue || '');
                            }}
                            fullWidth
                            options={firmTypeList?.filter((type) => type?.business === "yes")}
                            getOptionLabel={(type) => type?.firmType}
                            style={{ textTransform: 'capitalize' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ textTransform: 'capitalize' }}
                                    placeholder='Select Firm Type'
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Stack direction={"row"} spacing={1}>
                            <Button variant='contained'>Go</Button>
                            <Button variant='contained' startIcon={<Iconify icon="bxs:file-export" />}>Export</Button>
                        </Stack>
                    </Grid>
                    <Box width="100%" pt={3}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">S.No</TableCell>
                                        <TableCell align="left">Stockist Name</TableCell>
                                        <TableCell align="left">Employee Name</TableCell>
                                        <TableCell align="left">City</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Secondry Amount</TableCell>
                                        <TableCell align="left">Closing Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data?.length > 0 && data ? data?.map((row, index) => (
                                        <>
                                            <TableRow
                                                key={row._id}
                                            >
                                                <TableCell align="left">{row.sNo}</TableCell>
                                                <TableCell align="left">{row.doctorName}</TableCell>
                                                <TableCell align="left">{row.Speciality}</TableCell>
                                                <TableCell align="left">{row.City}</TableCell>
                                                <TableCell align="left">{row.empName}</TableCell>
                                                <TableCell align="left">
                                                    <TextField size='small' onChange={(e) => handleChange(index, e.target.value)} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField size='small' onChange={(e) => handleChange(index, e.target.value)} />
                                                </TableCell>
                                            </TableRow>

                                        </>
                                    ))
                                        :
                                        <TableRow>
                                            <TableCell colSpan={6}><Typography textAlign={"center"}>Not Found</Typography></TableCell>
                                        </TableRow>

                                    }
                                    <TableRow>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>{data[0]?.empName}</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>{total}</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>{total}</TableCell>
                                    </TableRow>

                                    <TableRow >
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Total</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>{total}</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>{total}</TableCell>
                                    </TableRow>

                                    <TableRow >
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">
                                            <Button variant='contained'>Save</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            {/* <TablePagination
                                count={data.length}
                                page={currentPage}
                                rowsPerPageOptions={[5, 10]}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handlePageChnage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                        </div>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default FirmBusiness