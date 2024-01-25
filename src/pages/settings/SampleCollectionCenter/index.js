/* eslint-disable prefer-const */
import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddCollectionCenter from './Add';
import EditCollectionCenter from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'
import { fetchSamCollectionCenterData } from '../../../redux/slice/GetSampleCollectionCenterSlice';
import CustomMenu from '../../../components/CustomMenu';

const SampleCollectionCenter = () => {

    const [collectionCenterList, setCollectionCenterList] = useState([])
    const [collectionCenterData, setCollectionCenterData] = useState({})
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

    const collectionCenter = useSelector((state) => state?.getSampleCollectionCenter?.data)
    
    const fullName = (name) => {
        let separatedNames = name.split(/(?=[A-Z])/);
        let firstName = separatedNames[0];
        let lastName = separatedNames[1];

        return `${firstName} ${lastName}`
    }
    
    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setCollectionCenterData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchSamCollectionCenterData={fetchSamCollectionCenterData} data={collectionCenterData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
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
        { field: 'centerName', headerName: 'Center Name', width: 200 },
        { field: 'centerCode', headerName: 'Center Code', width: 200 },
        {
            field: 'assignTo',
            headerName: 'Assigned To',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {fullName(params?.row?.assignTo)}
                </Box>
            )
        },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'type', headerName: 'Center Type', width: 200 },
        { field: 'zoneName', headerName: 'Zone', width: 200 },
        { field: 'cityName', headerName: 'City', width: 200 },
        { field: 'centerAddress', headerName: 'Center Address', width: 200 },
    ];

    const deleteGroup = async (id) => {
        const result = await apidelete(`/api/sampleCollectionCenter/${id}`);
        setUserAction(result)
    }


    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = collectionCenter?.filter(({ centerName, centerCode, assignTo, category, type, zoneName, cityName, centerAddress }) =>
            centerName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            centerCode?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            assignTo?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            category?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            type?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            zoneName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            cityName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            centerAddress?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setCollectionCenterList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : collectionCenter)
    };


    useEffect(() => {
        dispatch(fetchSamCollectionCenterData());
    }, [userAction])

    useEffect(() => {
        fetchData();
    }, [collectionCenter])

    return (
        <div>
            {/* Add Collection Center */}
            <AddCollectionCenter isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchSamCollectionCenterData={fetchSamCollectionCenterData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Sample Collection Center</Typography>

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
                                rows={collectionCenterList}
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

export default SampleCollectionCenter
