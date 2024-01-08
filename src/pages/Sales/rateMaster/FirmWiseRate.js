import { Autocomplete, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconify from '../../../components/iconify'
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchfirmData } from '../../../redux/slice/GetFirmSlice';

// eslint-disable-next-line arrow-body-style
const FirmWiseRate = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [firmList, setFirmList] = useState([])
    const dispatch = useDispatch()
    const employeeList = useSelector((state) => state?.getEmployee?.data)
    const firmDate = useSelector((state) => state?.getFirm?.data)


    const handlePageChnage = (e, page) => {
        setCurrentPage(page)
    }
    const handleChangeRowsPerPage = (e, page) => {
        const newRowsPerPage = parseInt(e.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
    }

    const rows = [
        {
            srNo: 1,
            productName: "NITROTHEA CR 2.6 TAB",
            distributor: 0,
            stockist: 154.28,
            retailer: 171.42,
        },
        {
            srNo: 2,
            productName: "PALMAT CAP",
            distributor: 0,
            stockist: 182.44,
            retailer: 202.71,
        },
        {
            srNo: 3,
            productName: "ROSTHEA CV CAP",
            distributor: 0,
            stockist: 96.3,
            retailer: 107,
        },
        {
            srNo: 4,
            productName: "ROSTHEA GOLD CAP",
            distributor: 0,
            stockist: 105.94,
            retailer: 117.71,
        },
        {
            srNo: 5,
            productName: "ROSTHEA TAB",
            distributor: 0,
            stockist: 72.32,
            retailer: 80.35,
        },
        {
            srNo: 6,
            productName: "ROTSAN 40",
            distributor: 0,
            stockist: 244.2,
            retailer: 271.42,
        },
        {
            srNo: 7,
            productName: "ROZDOM CAP",
            distributor: 0,
            stockist: 71.22,
            retailer: 79.14,
        },
        {
            srNo: 8,
            productName: "UB-150 CAP",
            distributor: 0,
            stockist: 243.45,
            retailer: 270.5,
        },
        {
            srNo: 9,
            productName: "VO-D 60 S/G",
            distributor: 0,
            stockist: 70.58,
            retailer: 78.42,
        },
        {
            srNo: 10,
            productName: "VOHANCE CAP",
            distributor: 0,
            stockist: 143.87,
            retailer: 159.85,
        },
        {
            srNo: 11,
            productName: "VOHANCE PRO-D(400MG)",
            distributor: 0,
            stockist: 548.54,
            retailer: 609.49,
        },
    ]

    const currentListData = rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)

    const fetchFirm = (employeeName) => {
        if (firmDate) {
            const filterEmp = firmDate?.filter((firm) => firm?.assignedTo?.toLowerCase() === employeeName?.toLowerCase())
            setFirmList(filterEmp);
        }
    }

    useEffect(() => {
        dispatch(fetchEmployeeData());
        dispatch(fetchfirmData());
    }, []);

    return (
        <div>
            {/* <Container maxWidth="xl"> */}
            <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                <Stack direction={"row"} spacing={2} >
                    <Autocomplete
                        disablePortal
                        name="employee"
                        id="combo-box-demo"
                        onChange={(event, newValue) =>
                            // formik.setFieldValue("employee", newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : "")
                            fetchFirm(newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : "")
                        }
                        options={employeeList}
                        getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                        size="small"

                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select Employee" style={{ fontSize: '12px', width: "100%" }} />
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        name="firm"
                        id="combo-box-demo"
                        // onChange={(event, newValue) =>
                        //     // formik.setFieldValue("employee", newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : "")
                        // }
                        options={firmList}
                        getOptionLabel={(firm) => firm?.firmName}
                        size="small"

                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select Firm" style={{ fontSize: '12px', width: "100%" }} />
                        )}
                    />
                </Stack>
                <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} >
                    Export
                </Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Product Name</TableCell>
                            <TableCell align="left">Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentListData.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" style={{ cursor: "not-allowed" }}>
                                    <TextField size='small'
                                        value={row.productName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        disabled
                                    /></TableCell>
                                <TableCell align="left"><TextField size='small' value={0} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <TablePagination
                    count={rows.length}
                    page={currentPage}
                    rowsPerPageOptions={[5, 10]}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChnage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            {/* </Container> */}
        </div>
    )
}

export default FirmWiseRate
