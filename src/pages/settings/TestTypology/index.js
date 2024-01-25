import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddTypology from './Add'
import { apidelete } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import { fetchTestTypologyData } from '../../../redux/slice/GetTestTypologySlice';
import CustomMenu from '../../../components/CustomMenu';

const TestTypology = () => {

    const [typologyList, setTypologyList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const typology = useSelector((state) => state?.getTestTypology?.data)

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
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteTypology} id={id} />

                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            type={"edit"}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'typology', headerName: 'Typology', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    ];

    const deleteTypology = async (id) => {
        const result = await apidelete(`/api/testTypology/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = typology?.filter(({ typology }) =>
            typology?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setTypologyList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : typology)
    };

    useEffect(() => {
        dispatch(fetchTestTypologyData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [typology])

    return (
        <div>
            {/* Add Typology */}
            <AddTypology isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTestTypologyData={fetchTestTypologyData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Test Typology</Typography>

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
                                rows={typologyList}
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

export default TestTypology
