import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddReason from './Add'
import { apiget } from '../../../service/api'
import EditReason from './Edit';
import { fetchOtherReasonData } from '../../../redux/slice/GetOtherReasonSlice';
import CustomMenu from '../../../components/CustomMenu';

const OtherReason = () => {

    const [reasonList, setReasonList] = useState([])
    const [reasonData, setReasonData] = useState({})
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const otherReason = useSelector((state) => state?.getOtherReason?.data)

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
                    setReasonData(data)
                };
                return (
                    <Box >
                        <EditReason isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchOtherReasonData={fetchOtherReasonData} data={reasonData} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            type={"delete"}
                            handleOpenEdit={handleOpenEdit}
                        />
                    </Box>
                );
            },
        },
        { field: 'priorityName', headerName: 'Priority Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    ];


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = otherReason?.filter(({ priorityName }) =>
            priorityName?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setReasonList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : otherReason)
    };

    useEffect(() => {
        dispatch(fetchOtherReasonData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [otherReason])

    return (
        <div>
            {/* Add Reason */}
            <AddReason isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchOtherReasonData={fetchOtherReasonData} />

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
                                onChange={fetchData}
                            />
                        </Stack>
                        <Card style={{ height: '60vh' }}>
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
