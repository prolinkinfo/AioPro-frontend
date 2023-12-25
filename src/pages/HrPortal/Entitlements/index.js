/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import Add from './Add'
import Edit from './Edit'
import { fetchLeaveEntitlementData } from '../../../redux/slice/GetLeaveEntitlementSlice';
import DeleteModel from '../../../components/Deletemodle'
import { apidelete } from '../../../service/api';

const Entitlements = () => {


    const dispatch = useDispatch();
    const leaveEntitlementList = useSelector((state) => state?.getLeaveEntitlement?.data)
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [data, setData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)


    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 250,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <Edit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchLeaveEntitlementData={fetchLeaveEntitlementData} data={data} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteData} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'entitlementName', headerName: 'Entitlement Name', width: 200, cellClassName: 'name-column--cell--capitalize', },
        { field: 'daysPerYear', headerName: 'Days Per Year', width: 200, cellClassName: 'name-column--cell--capitalize', },
        { field: 'maximumPerMonth', headerName: 'Maximum Per Month', width: 200, cellClassName: 'name-column--cell--capitalize', },
        { field: 'maximumDaysAdvance', headerName: 'Maximum Days Advance', width: 200, cellClassName: 'name-column--cell--capitalize', },
        { field: 'maximumDaysBackDate', headerName: 'maximum Days BackDate', width: 200, cellClassName: 'name-column--cell--capitalize', },
        {
            field: 'canCarryForward',
            headerName: 'Can Carry Forward',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.canCarryForward === true ? "Yes" : "No"}
                </Box>
            },
        },
        {
            field: 'sandwiched',
            headerName: 'Sandwiched',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.sandwiched === true ? "Yes" : "No"}
                </Box>
            },
        },
        { field: 'abbreviation', headerName: 'Abbreviation', width: 200, cellClassName: 'name-column--cell--capitalize', },
        {
            field: 'paid',
            headerName: 'Paid',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.paid === true ? "Yes" : "No"}
                </Box>
            },
        },
        {
            field: 'minimumLeavePeriod',
            headerName: 'Minimum Leave Period',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.minimumLeavePeriod === true ? "Yes" : "No"}
                </Box>
            },
        },
        {
            field: 'balanceVisible',
            headerName: 'Balance Visible',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.balanceVisible === true ? "Yes" : "No"}
                </Box>
            },
        },
        {
            field: 'encachable',
            headerName: 'Encachable',
            width: 200,
            renderCell: (params) => {
                return <Box>
                    {params?.row?.balanceVisible === true ? "Yes" : "No"}
                </Box>
            },
        },
    ];
    const deleteData = async (id) => {
        const result = await apidelete(`/api/leaveEntitlement/${id}`);
        setUserAction(result)
    }
 

    useEffect(() => {
        dispatch(fetchLeaveEntitlementData());
    }, [userAction])

    return (
        <div>
            {/* Add */}
            <Add isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchLeaveEntitlementData={fetchLeaveEntitlementData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Leave Entitlements</Typography>

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
                                rows={leaveEntitlementList}
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

export default Entitlements
