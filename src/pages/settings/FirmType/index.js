import { Autocomplete, Box, Button, Card, Checkbox, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddType from './Add';
import EditType from './Edit'
import { apiget, apiput } from '../../../service/api'

const FirmType = () => {

    const [typeList, setTypeList] = useState([])
    const [typeData, setTypeData] = useState({})
    const [id, setId] = useState('')
    const [checked, setChecked] = useState('');

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }
    
    console.log(checked)
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
                        <EditType isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTypeData={fetchTypeData} data={typeData} />
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
                const handleClick = async (e,params) => {
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
                        <Checkbox checked={params?.row?.business} handleChange={handleClick}  />
                    </Box>
                );
            },
        },
    ];


    const fetchTypeData = async () => {
        const result = await apiget(`/api/firmtype`);
        if (result && result.status === 200) {
            setTypeList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchTypeData();
    }, [])

    return (
        <div>
            {/* Add Type */}
            <AddType isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTypeData={fetchTypeData} />

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
