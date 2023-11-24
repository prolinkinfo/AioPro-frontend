import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddLeaveReason from './Add'
import EditLeaveReason from './Edit'
import { apiget } from '../../../service/api'

const LeaveReason = () => {

    const [leaveReasonList, setLeaveReasonList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const columns = [
        { field: 'leaveReason', headerName: 'Leave Reason Name', flex: 1 },
        { field: 'leaveEntitlement', headerName: 'Leave Entitlement', flex: 1 },
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
    ];


    const fetchLeaveData = async () => {
        const result = await apiget(`/api/leavereason`);
        if (result && result.status === 200) {
            setLeaveReasonList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchLeaveData();
    }, [])

    return (
        <div>
            {/* Add Leave Reason */}
            <AddLeaveReason isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchLeaveData={fetchLeaveData} />

            {/* Edit Leave Reason */}
            <EditLeaveReason isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchLeaveData={fetchLeaveData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Leave Reason</Typography>

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
                                rows={leaveReasonList}
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

export default LeaveReason
