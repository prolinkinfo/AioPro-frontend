/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unneeded-ternary */
import { Autocomplete, Box, Button, Card, Checkbox, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddType from './Add';
import EditType from './Edit'
import { apiget, apiput } from '../../../service/api'
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';
import CustomMenu from '../../../components/CustomMenu';

const FirmType = () => {

    const [typeList, setTypeList] = useState([])
    const [typeData, setTypeData] = useState({})
    const [id, setId] = useState('')
    // const [checked, setChecked] = useState('');
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const firmType = useSelector((state) => state?.geFirmType?.data)

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
                    setTypeData(data)
                };
                return (
                    <Box>
                        <EditType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} firmaTypeData={firmaTypeData} data={typeData} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            handleOpenEdit={handleOpenEdit}
                            type={"delete"}
                        />
                    </Box>
                );
            },
        },
        { field: 'firmTypeId', headerName: 'Firm Type Id', flex: 1 },
        { field: 'firmType', headerName: 'Firm Type', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'level', headerName: 'Level', flex: 1 },
        {
            field: 'business',
            headerName: 'Business',
            flex: 1,
            renderCell: (params) => {
                const chengStatus = async (data) => {
                    const pyload = {
                        _id: data?._id,
                        business: data?.business === "yes" ? "no" : data?.business === "no" ? "yes" : "",
                    }
                    const result = await apiput(`/api/firmtype/changeStatus`, pyload);
                    if (result && result.status === 200) {
                        dispatch(firmaTypeData());
                    }
                };
                return (
                    <Box>
                        <Button
                            variant="outlined"
                            style={{
                                color: params.value === 'yes' ? '#22C55E' : '#B61D18',
                                background: params.value === 'yes' ? '#22c55e29' : '#ff563029',
                                border: 'none',
                            }}
                            onClick={() => chengStatus(params?.row)}
                        >
                            {params.value}
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = firmType?.filter(({ firmTypeId, firmType, level }) =>
            firmTypeId?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            firmType?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setTypeList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : firmType)
    };


    useEffect(() => {
        dispatch(firmaTypeData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [firmType])

    return (
        <div>
            {/* Add Type */}
            <AddType isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} firmaTypeData={firmaTypeData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Firm Type</Typography>

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

export default FirmType
