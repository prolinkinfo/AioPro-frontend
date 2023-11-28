import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddReason from './Add'
import { apiget } from '../../../service/api'
import EditReason from './Edit';

const OtherReason = () => {

    const [reasonList, setReasonList] = useState([])
    const [reasonData, setReasonData] = useState({})
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setReasonData(data);
                    handleOpenEdit();
                };
                return (
                    <Box >
                        <EditReason isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchReasonData={fetchReasonData} data={reasonData} />
                        <Button variant='outlined' startIcon={<EditIcon />} onClick={()=>handleClick(params?.row)}> Edit</Button>
                    </Box>
                );
            },
        },
        { field: 'priorityName', headerName: 'Priority Name', flex: 1 },
    ];

    const fetchReasonData = async () => {
        const result = await apiget(`/api/otherReason`);
        if (result && result.status === 200) {
            setReasonList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchReasonData();
    }, [])

    return (
        <div>
            {/* Add Reason */}
            <AddReason isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchReasonData={fetchReasonData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Other Reason</Typography>

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
                                rows={reasonList}
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

export default OtherReason
