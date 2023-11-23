import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddVisit from './Add'

const Visit = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);

    const columns = [
        {
            headerName: 'Action',
            sortable: false,
            width: 120,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    console.log(data, "data")
                };
                return (
                    <Box onClick={handleClick}>
                        <ActionBtn />
                    </Box>
                );
            },
        },
        { field: 'visitId', headerName: 'Visit ID', width: 120 },
        { field: 'doctorId', headerName: 'Doctor ID', width: 150 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 130 },
        {
            field: 'clinicAddress',
            headerName: 'Clinic Address',
            width: 250,

        },
        {
            field: 'zone',
            headerName: 'Zone',
            width: 150,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
        },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            width: 200,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
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
    return (
        <div>
            <AddVisit isOpen={isOpenAdd} handleClose={handleCloseAdd} />
            <Container maxWidth="xl" style={{ height: '72vh', paddingTop: '15px' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Visit</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add Visit
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />}>
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
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                fullWidth
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select Zone' />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                fullWidth
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select City' />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                fullWidth
                                options={top100Films}
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "15px" }} />}
                            />
                            <TextField
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
                            />

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
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default Visit
