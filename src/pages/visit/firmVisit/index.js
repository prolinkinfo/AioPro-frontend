/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import { fetchFirmVisitData } from '../../../redux/slice/GetFirmVisitSlice'
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice'
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice'
import { fetchCityData } from '../../../redux/slice/GetCitySlice'
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';


const filterType = [
    {
        label: "Closed Visits",
        value: "Closed"
    },
    {
        label: "Open Visits",
        value: "Open"
    },
    {
        label: "Rescheduled Visits",
        value: "Rescheduled"
    },
    {
        label: "Skipped Visits",
        value: "Skipped"
    },
]

const FirmVisit = () => {

    const dispatch = useDispatch();
    const [employeeList, setEmployeeList] = useState([]);
    const [firmVisitList, setFirmVisitList] = useState([])
    const firmVisit = useSelector((state) => state?.getFirmVisit?.data);
    const zoneList = useSelector((state) => state?.getZone?.data);
    const divisionList = useSelector((state) => state?.getDivision?.data);
    const cityList = useSelector((state) => state?.getCity?.data);
    const employee = useSelector((state) => state?.getEmployee?.data)

    const columns = [
        { field: 'firmId', headerName: 'Firm Id', width: 120 },
        { field: 'firmName', headerName: 'Firm Name', width: 200 },
        {
            field: 'visitAddress',
            headerName: 'Visit Address',
            width: 400,
        },
        {
            field: 'firmAddress',
            headerName: 'Firm Address',
            width: 400,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
        },
        {
            field: 'zone',
            headerName: 'Zone',
            width: 150,
        },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 300,
            renderCell: (params) => {
                return (
                    <Box>
                        {fullName(params?.row?.employeeName)}
                    </Box>
                );
            },
        },
        {
            field: 'visitDate',
            headerName: 'Visit Date',
            width: 120,
            renderCell: (params) => {
                return (
                    <Box>
                        {moment(params?.row?.visitDate).format("DD/MM/YYYY")}
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
        },


    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();


    const fullName = (name) => {
        let separatedNames = name.split(/(?=[A-Z])/);
        let firstName = separatedNames[0];
        let lastName = separatedNames[1];
    
        return `${firstName} ${lastName}`
      }

    const getLastWeekDates = () => {
        const today = new Date();
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(lastWeekStart);
            date.setDate(lastWeekStart.getDate() + i);
            dates.push(date.toISOString().split('T')[0]).toString();
        }

        return dates;
    };

    const lastWeekDates = getLastWeekDates();


    const visitList = [
        {
            name: "Today Visits",
            date: moment(currentDate).format("YYYY-MM-DD")
        },
        {
            name: "This Week Visits",
            date: lastWeekDates
        },
        {
            name: "This Month Visits",
            date: currentMonth.toString()
        },
        {
            name: "This Year Visits",
            date: currentYear.toString()
        },
    ]


    const fetchData = (searchText) => {
        const filtered = firmVisit?.filter(({ firmId, firmName, visitAddress, firmAddress, city, zone, employeeName, visitDate, status }) =>
            firmId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            firmName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            visitAddress?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            firmAddress?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            city?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            zone?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            employeeName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            moment(visitDate)?.format("YYYY-MM-DD")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            moment(visitDate)?.format("MM")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            moment(visitDate)?.format("YYYY")?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            status?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setFirmVisitList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : firmVisit);
    }

 
    const convertJsonToExcel = (jsonArray, fileName) => {
        const field = jsonArray?.map((item) => {
            return {
                "Firm Id": item?.firmId,
                "Firm Name": item?.firmName,
                "Visit Address": item?.visitAddress,
                "Firm Address": item?.firmAddress,
                "City": item?.city,
                "Zone": item?.zone,
                "Employee Name": fullName(item?.employeeName),
                "Visit Date": moment(item?.visitDate).format("DD/MM/YYYY"),
                "Status": item?.status,
            };
        });
    
        const ws = XLSX.utils.json_to_sheet(field);
    
        // Bold the header
        const headerRange = XLSX.utils.decode_range(ws['!ref']);
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
            if (ws[headerCell]) {
                ws[headerCell].s = { font: { bold: true } };
            }
        }
    
        // Auto-size columns based on data content
        const dataRange = XLSX.utils.decode_range(ws['!ref']);
        for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
            let maxLen = 0;
            for (let R = dataRange.s.r; R <= dataRange.e.r; ++R) {
                const cell = XLSX.utils.encode_cell({ r: R, c: C });
                if (ws[cell] && ws[cell].v) {
                    const cellValue = ws[cell].v.toString().length + 2;
                    if (cellValue > maxLen) {
                        maxLen = cellValue;
                    }
                }
            }
            ws['!cols'] = ws['!cols'] || [];
            ws['!cols'][C] = { wch: maxLen };
        }
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, `${fileName}.xls`);
    };

    const fetchEmployee = (name) => {
        if (employee) {
            const filtered = employee?.filter(({ contactInformation }) =>
                contactInformation?.division?.toLowerCase() === name?.toLowerCase() ||
                contactInformation?.zone?.toLowerCase() === name?.toLowerCase()
            )
            setEmployeeList(name?.length > 0 ? (filtered?.length > 0 ? filtered : []) : employee)

        }
    }

    useEffect(() => {
        dispatch(fetchFirmVisitData());
        dispatch(fetchZoneData());
        dispatch(fetchDivisionData());
        dispatch(fetchCityData());
        dispatch(fetchEmployeeData());
    }, [])

    useEffect(() => {
        fetchData()
    }, [firmVisit])

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Firm Visit</Typography>
                    <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={()=>convertJsonToExcel(firmVisitList,"firm_visit")}>
                        Export
                    </Button>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                            <Grid item xs={12} sm={4} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(event, newValue) => {
                                        fetchData(newValue ? newValue?.value : "");
                                    }}
                                    options={filterType}
                                    getOptionLabel={(type) => type?.label}
                                    size='small'
                                    fullWidth
                                    style={{ textTransform: "capitalize" }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px", textTransform: "capitalize" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(event, newValue) => {
                                        fetchData(newValue ? newValue?.date : "");
                                    }}
                                    options={visitList}
                                    getOptionLabel={(visit) => visit?.name}
                                    size='small'
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px" }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={2}>
                                <Autocomplete
                                    disablePortal
                                    onChange={(event, newValue) => {
                                        fetchData(newValue ? newValue.zoneName : "");
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
                            <Grid item xs={12} sm={4} md={2}>
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
                            <Grid item xs={12} sm={4} md={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(event, newValue) => {
                                        fetchData(newValue ? newValue.cityName : "");
                                    }}
                                    options={cityList}
                                    getOptionLabel={(city) => city?.cityName}
                                    fullWidth
                                    size='small'
                                    renderInput={(params) => <TextField {...params} placeholder='Select City' />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={2}>
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
                            <Grid item xs={12} sm={4} md={2}>
                                <TextField
                                    type='text'
                                    size='small'
                                    fullWidth
                                    placeholder='Search'
                                    onChange={(e) => fetchData(e.target.value)}
                                />
                            </Grid>
                            {/* <TextField
                                type='date'
                                size='small'
                                label="From Date"
                                variant='outlined'
                                fullWidth
                            />
                            <TextField
                                type='date'
                                size='small'
                                label='To Date'
                                fullWidth
                            /> */}

                        </Grid>
                        <Card style={{ height: '67vh', paddingTop: '15px' }}>
                            <DataGrid
                                rows={firmVisitList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25, 50, 100]}
                                getRowId={(row) => row._id}

                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default FirmVisit
