import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddZone from './Add'
import { apidelete } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditZone from './Edit';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import CustomMenu from '../../../components/CustomMenu';

const Zone = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();

    const [zoneList, setZoneList] = useState([])
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [zoneData, setZoneData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const zone = useSelector((state) => state?.getZone?.data)

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
                    setZoneData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditZone isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchZoneData={fetchZoneData} data={zoneData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteZone} id={id} />
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
        { field: 'zoneName', headerName: 'Zone Name', flex: 1 },
        { field: 'zoneCode', headerName: 'Zone Code', flex: 1 },
    ];

    const deleteZone = async (id) => {
        const result = await apidelete(`/api/zone/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = zone?.filter(({ zoneName, zoneCode }) =>
            zoneName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            zoneCode?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setZoneList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : zone)
    };


    useEffect(() => {
        dispatch(fetchZoneData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [zone])

    return (
        <div>
            {/* Add Zone */}
            <AddZone isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchZoneData={fetchZoneData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Zone Mapping</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <div>
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                    Add New
                                </Button>

                            </div>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                                onChange={fetchData}
                            />
                        </Stack>
                        <Card style={{ height: '60vh' }}>
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
