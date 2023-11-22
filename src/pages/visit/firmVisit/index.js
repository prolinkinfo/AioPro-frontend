import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'

const FirmVisit = () => {


    const columns = [
        { field: 'firmId', headerName: 'Firm Id', width: 120 },
        { field: 'firmName', headerName: 'Firm Name', width: 130 },
        {
            field: 'visitAddress',
            headerName: 'Visit Address',
            width: 200,
        },
        {
            field: 'firmAddress',
            headerName: 'Firm Address',
            width: 200,
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
        },
        {
            field: 'visitDate',
            headerName: 'Visit Date',
            width: 120,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
        },


    ];

    const rows = [
        { id: 1, firmId: '1001383', firmName: 'T.k. Saikiya', visitAddress: '1, Akurli Road, Ashok Nagar, Kandivali East, Mumbai, Maharashtra 400101, India', firmAddress: '1, Akurli Road, Ashok Nagar, Kandivali East, Mumbai, Maharashtra 400101, India', zone: 'Madhya Pradesh', city: 'Jabalpur', employeeName: 'Vaibhav Shrivastava', visitDate: '20/11/2016', status: 'open' },
        { id: 2, firmId: '1001355', firmName: 'Sarita Singh', visitAddress: 'A-202, Dattani Park Rd, Dattani Park, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101, In', firmAddress: 'A-202, Dattani Park Rd, Dattani Park, Thakur Village, Kandivali East, Mumbai, Maharashtra 400101, In', zone: 'Madhya Pradesh', city: 'Satna', employeeName: 'Vikas Gautam', visitDate: '20/11/2016', status: 'open' },
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
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Firm Visit</Typography>
                    <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />}>
                        Export
                    </Button>
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
                                renderInput={(params) => <TextField {...params} placeholder='Select Division' />}
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

export default FirmVisit
