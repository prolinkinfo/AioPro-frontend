/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Papa from 'papaparse';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddVisit from './Add'
import { fetchDoctorVisitData } from '../../../redux/slice/GetDoctorVisitSlice'
import { apiget } from '../../../service/api'
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice'
import { fetchCityData } from '../../../redux/slice/GetCitySlice'
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice'

const Visit = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const dispatch = useDispatch();

    const doctorVisit = useSelector((state) => state?.getDoctorVisit?.data)
    const zoneList = useSelector((state) => state?.getZone?.data)
    const cityList = useSelector((state) => state?.getCity?.data)
    const employeeList = useSelector((state) => state?.getEmployee?.data)

    const columns = [
        {
            headerName: 'Action',
            sortable: false,
            width: 250,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async () => {
                };
                return (
                    <Box onClick={handleClick}>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<Iconify icon="carbon:view" />} size='small' onClick={() => handleClick(params?.row)}> View</Button>
                            <Button variant='outlined' color='error' startIcon={<Iconify icon="material-symbols-light:print-outline" />} size='small'> Print</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'visitId', headerName: 'Visit ID', width: 120 },
        { field: 'doctorId', headerName: 'Doctor ID', width: 150 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 150 },
        {
            field: 'clinicAddress',
            headerName: 'Clinic Address',
            width: 250,

        },
        {
            field: 'zoneName',
            headerName: 'Zone',
            width: 150,
        },
        {
            field: 'cityName',
            headerName: 'City',
            width: 150,
        },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 200,
        },
        {
            field: 'visitDate',
            headerName: 'Date',
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
            width: 100,
        },
    ];

    const rows = [
        { id: 1, visitId: '1001383', doctorId: '525', doctorName: 'T.k. Saikiya', clinicAddress: 'jai nagar Rd, Kamla Nehru Nagar, Yadav Colony, Jabalpur, Madhya Pradesh 482002, India', zone: 'Madhya Pradesh', city: 'Jabalpur', employeeName: 'Vaibhav Shrivastava', date: '20/11/2016', status: 'open' },
        { id: 2, visitId: '1001355', doctorId: '1650', doctorName: 'Sarita Singh', clinicAddress: 'Panna Khajuraho Rd, Satna, Madhya Pradesh 485001, India', zone: 'Madhya Pradesh', city: 'Satna', employeeName: 'Vikas Gautam', date: '20/11/2016', status: 'open' },
    ];

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
    ]

    const downloadCSV = async () => {
        await apiget('/api/doctorvisit/export-csv');
    }

    useEffect(() => {
        dispatch(fetchDoctorVisitData());
        dispatch(fetchZoneData());
        dispatch(fetchCityData());
        dispatch(fetchEmployeeData());
    }, [])

    return (
        <div>
            <AddVisit isOpen={isOpenAdd} handleClose={handleCloseAdd} fetchDoctorVisitData={fetchDoctorVisitData} />
            <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Visit</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add Visit
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={downloadCSV}>
                            Export
                        </Button>
                    </Stack>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction="row" spacing={2} my={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Type' style={{ fontSize: "12px" }} />}
                            />
                            <Autocomplete
                                size="small"
                                // onChange={(event, newValue) => {
                                //     formik.setFieldValue('zone', newValue ? newValue.zoneName : "");
                                //     fetchDoctor(newValue ? newValue.zoneName : "")
                                //     fetchEmployee(newValue ? newValue.zoneName : "")
                                // }}
                                fullWidth
                                options={zoneList}
                                value={zoneList.find(zone => zone.zoneName) || null}
                                getOptionLabel={(zone) => zone?.zoneName}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select Zone'
                                    />
                                )}
                            />
                            <Autocomplete
                                size="small"
                                // onChange={(event, newValue) => {
                                //     formik.setFieldValue('city', newValue ? newValue.cityName : "");
                                // }}
                                fullWidth
                                options={cityList}
                                value={cityList.find(city => city.cityName) || null}
                                getOptionLabel={(city) => city?.cityName}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select City'
                                    // error={formik.touched.city && Boolean(formik.errors.city)}
                                    // helperText={formik.touched.city && formik.errors.city}
                                    />
                                )}
                            />
                            <Autocomplete
                                size="small"
                                // onChange={(event, newValue) => {
                                //     formik.setFieldValue('employee', newValue ? newValue?.basicInformation?.employeesName : "");
                                // }}
                                fullWidth
                                options={employeeList}
                                value={employeeList.find(employee => employee?.basicInformation?.employeesName) || null}
                                getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                                style={{ textTransform: 'capitalize' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ textTransform: 'capitalize' }}
                                        placeholder='Select Employee'
                                        // error={formik.touched.employee && Boolean(formik.errors.employee)}
                                        // helperText={formik.touched.employee && formik.errors.employee}
                                    />
                                )}
                            />
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

                        </Stack>
                        <Card style={{ height: '72vh', paddingTop: '15px' }}>
                            <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"end"} mb={2}>
                                <TextField
                                    type='text'
                                    size='small'
                                    placeholder='Search'
                                />
                                <Button variant='contained'>Go</Button>
                            </Stack>
                            <DataGrid
                                rows={doctorVisit}
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

export default Visit
