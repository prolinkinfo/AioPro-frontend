import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddTax from './Add'
import { apidelete } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditTax from './Edit';
import { fetchTaxMasterData } from '../../../redux/slice/GetTaxMasterSlice';
import CustomMenu from '../../../components/CustomMenu';

const TaxMaster = () => {

    const [taxList, setTaxList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [taxData, setTaxData] = useState('')
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

    const taxMaster = useSelector((state) => state?.getTaxMaster?.data)

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
                    setTaxData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditTax isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTaxMasterData={fetchTaxMasterData} data={taxData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteTax} id={id} />

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
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'taxType', headerName: 'Tax Type', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'percent', headerName: 'Percentage Of Tax', flex: 1 },
    ];

    const deleteTax = async (id) => {
        const result = await apidelete(`/api/taxmaster/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = taxMaster?.filter(({ id, taxType, percent }) =>
            id?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            taxType?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            percent?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setTaxList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : taxMaster)
    };

    useEffect(() => {
        dispatch(fetchTaxMasterData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [taxMaster])
    return (
        <div>
            {/* Add Tax */}
            <AddTax isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTaxMasterData={fetchTaxMasterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Tax Master</Typography>

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
                                rows={taxList}
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

export default TaxMaster
