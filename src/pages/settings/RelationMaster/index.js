import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddRelation from './Add'
import { apidelete, apiget } from '../../../service/api'
import EditRelation from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { fetchRelationMasterData } from '../../../redux/slice/GetRelationMasterSlice';
import CustomMenu from '../../../components/CustomMenu';

const RelationMaster = () => {

    const [relationList, setRelationList] = useState([])
    const [relationData, setRelationData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const relation = useSelector((state) => state?.getRelationMaster?.data);

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
                    setRelationData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditRelation isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchRelationMasterData={fetchRelationMasterData} data={relationData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteRelation} id={id} />
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
        { field: 'relationName', headerName: 'Relation Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },

    ];

    const deleteRelation = async (id) => {
        const result = await apidelete(`/api/relationmaster/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = relation?.filter(({ relationName }) =>
            relationName?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setRelationList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : relation)
    };


    useEffect(() => {
        dispatch(fetchRelationMasterData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [relation])

    return (
        <div>
            {/* Add Relation */}
            <AddRelation isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchRelationMasterData={fetchRelationMasterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Relation Master</Typography>

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
                                rows={relationList}
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

export default RelationMaster
