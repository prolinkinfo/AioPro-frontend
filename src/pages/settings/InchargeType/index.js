import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddQualification from './Add';
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchInchargeTypeData } from '../../../redux/slice/GetInchargeTypeSlice';
import CustomMenu from '../../../components/CustomMenu';

const InchargeType = () => {

    const [typeList, setTypeList] = useState([])
    const [userAction, setUserAction] = useState(null)
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const inchargeType = useSelector((state) => state?.getInchargeType?.data)

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
                    setId(data?._id)
                };
                return (
                    <Box>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteType} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                            type={"edit"}
                        />
                    </Box>
                );
            },
        },
        { field: 'inchargeType', headerName: 'Incharge Type', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const deleteType = async (id) => {
        const result = await apidelete(`/api/inchargetype/${id}`);
        setUserAction(result)
    }

        ;

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = inchargeType?.filter(({ inchargeType }) =>
            inchargeType?.toLowerCase()?.includes(searchText?.toLowerCase()))
        setTypeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : inchargeType)
    };

    useEffect(() => {
        fetchData();
    }, [inchargeType])

    useEffect(() => {
        dispatch(fetchInchargeTypeData());
    }, [userAction])

    return (
        <div>

            {/* Add Incharge Type */}
            <AddQualification isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchInchargeTypeData={fetchInchargeTypeData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Incharge Type</Typography>

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
                                rows={typeList}
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

export default InchargeType
