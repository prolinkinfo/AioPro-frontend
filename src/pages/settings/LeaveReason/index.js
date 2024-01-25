import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddLeaveReason from './Add'
import EditLeaveReason from './Edit'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchLeaveReasonData } from '../../../redux/slice/GetLeaveReasonSlice';
import CustomMenu from '../../../components/CustomMenu';

const LeaveReason = () => {

    const [leaveReasonList, setLeaveReasonList] = useState([])
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [leaveReasonData, setLeaveReasonData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const leaveReason = useSelector((state) => state?.getLeaveReason?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setLeaveReasonData(data)
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditLeaveReason isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchLeaveReasonData={fetchLeaveReasonData} data={leaveReasonData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteReason} id={id} />

                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenEdit={handleOpenEdit}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'leaveReason', headerName: 'Leave Reason Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'leaveEntitlement', headerName: 'Leave Entitlement', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    ];


    const deleteReason = async (id) => {
        const result = await apidelete(`/api/leavereason/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = leaveReason?.filter(({ leaveEntitlement, leaveReason }) =>
            leaveEntitlement?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            leaveReason?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setLeaveReasonList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : leaveReason)
    };

    useEffect(() => {
        fetchData();
    }, [leaveReason])

    useEffect(() => {
        dispatch(fetchLeaveReasonData());
    }, [userAction])

    return (
        <div>
            {/* Add Leave Reason */}
            <AddLeaveReason isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchLeaveReasonData={fetchLeaveReasonData} />

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
                                onChange={fetchData}
                            />
                        </Stack>
                        <Card style={{ height: '60vh' }}>
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
