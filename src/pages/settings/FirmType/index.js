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

const FirmType = () => {

    const [typeList, setTypeList] = useState([])
    const [typeData, setTypeData] = useState({})
    const [id, setId] = useState('')
    const [checked, setChecked] = useState('');
    const dispatch = useDispatch();
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const firmType = useSelector((state) => state?.geFirmType?.data)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    console.log(firmType, "firmType")

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setTypeData(data);
                    handleOpenEdit();
                };
                return (
                    <Box>
                        <EditType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} firmaTypeData={firmaTypeData} data={typeData} />
                        <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
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
                const handleClick = async (e, params) => {
                    setChecked(e.target.checked)
                    console.log(checked)
                    const pyload = {
                        _id: params?.row?._id,
                        business: e.target.checked,
                        modifiedOn: new Date()
                    }
                    const result = await apiput('/api/firmtype', pyload);

                };
                return (
                    <Box>
                        <Checkbox checked={params?.row?.business} handleChange={handleClick} />
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
                        <Card style={{ height: '72vh' }}>
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
