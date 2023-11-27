import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddZone from './Add'
import { apiget } from '../../../service/api'

const Zone = () => {

    const[zoneList,setZoneList] = useState([])

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
        { field: 'zoneName', headerName: 'Zone Name', flex: 1 },
        { field: 'zoneCode', headerName: 'Zone Code', flex: 1 },
    ];

    const fetchZoneData = async () => {
        const result = await apiget(`/api/zone`);
        if (result && result.status === 200) {
            setZoneList(result?.data?.result);
        }
    };

    useEffect(()=>{
        fetchZoneData();
    },[])

    return (
        <div>
            {/* Add Zone */}
            <AddZone isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchZoneData={fetchZoneData}/>

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Zone Mapping</Typography>

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
                                rows={zoneList}
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

export default Zone
