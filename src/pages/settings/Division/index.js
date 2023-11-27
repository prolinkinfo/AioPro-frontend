import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddDivision from './Add'
import { apiget } from '../../../service/api'

const Division = () => {

    const [divisionList, setDivisionList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const columns = [
        {
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    console.log(data, 'data');
                };
                return (
                    <Box onClick={handleClick}>
                        <ActionBtn data={[{ name: 'Edit' }]} />
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', flex: 1 },
        {
            field: 'appLogo',
            headerName: 'App Logo',
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params?.row?.appLogo}
                    alt="Avatar"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
            ),
        },
    ];

    const fetchDivisionData = async () => {
        const result = await apiget(`/api/division`);
        if (result && result.status === 200) {
            setDivisionList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchDivisionData();
    }, [])

    return (
        <div>
            {/* Add Division */}
            <AddDivision isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchDivisionData={fetchDivisionData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Division</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                            />
                        </Stack>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={divisionList}
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

export default Division
