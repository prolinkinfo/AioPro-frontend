import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddAdministrator from './Add'

const Administrator = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);

    const columns = [
        { field: 'name', headerName: 'Name', width: 120 },
        { field: 'email', headerName: 'Email', width: 130 },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
        },
        {
            field: 'contact',
            headerName: 'Contact',
            width: 150,
        },
        {
            field: 'division',
            headerName: 'Division',
            width: 300,
        },
        {
            field: 'zone',
            headerName: 'Zone',
            width: 120,
        },
        {
            field: 'adminType',
            headerName: 'Admin Type',
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
    return (
        <div>
            <AddAdministrator isOpen={isOpenAdd} handleClose={handleCloseAdd}/>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Administrator's</Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                        Add Administrator
                    </Button>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Card style={{ height: '72vh', paddingTop: '15px' }}>
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

export default Administrator
