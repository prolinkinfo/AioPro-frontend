import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddTypology from './Add'
import { apiget } from '../../../service/api'

const TestTypology = () => {

    const[typologyList,setTypologyList] = useState([])

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
        { field: 'typology', headerName: 'Typology', flex: 1 },
    ];

    const fetchTypologyData = async () => {
        const result = await apiget(`/api/testTypology`);
        if (result && result.status === 200) {
            setTypologyList(result?.data?.result);
        }
    };

    useEffect(()=>{
        fetchTypologyData();
    },[])

    return (
        <div>
            {/* Add Typology */}
            <AddTypology isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypologyData={fetchTypologyData}/>

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Test Typology</Typography>

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
                                rows={typologyList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                getRowId={row => row._id}
                                pageSizeOptions={[5, 10]}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default TestTypology
