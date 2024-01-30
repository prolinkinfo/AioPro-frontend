/* eslint-disable prefer-const */
import { Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddSampleGiftWithChallan from './Add'
import CustomMenu from '../../../components/CustomMenu'
import { fetchChallanData } from '../../../redux/slice/GetChallanSlice'
import samFile from '../../../assets/files/sample_gift_with_challan_samFile.xlsx'
import ImportFileModel from './components/ImportFileModel'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete } from '../../../service/api'

const SampleGiftWithChallan = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [challanData, setChallanData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [id, setId] = useState('')
    const [isOpenImport, setisOpenImport] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [userAction, setUserAction] = useState(null)
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClose = () => setAnchorEl(null);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
    const challanList = useSelector((state) => state?.getChallan?.data)

   

    const fullName = (name) => {
        let separatedNames = name?.split(/(?=[A-Z])/);
        let firstName = separatedNames && separatedNames[0];
        let lastName = separatedNames && separatedNames[1];

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
                    setChallanData(data);
                    setId(data?._id)
                };
                return (
                    <Box>
                        {/* <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchPromotionalGiftData={fetchPromotionalGiftData} data={promotionalGiftData} /> */}
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteData} id={id} />
                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            params={params}
                            id={id}
                            handleOpenEdit={handleOpenAdd}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'sampleGiftCode', headerName: 'Sample / Gift', width: 200 },
        {
            field: 'packSize',
            headerName: 'Pack Size',
            width: 200,

        },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'batchNo', headerName: 'Batch No', width: 200 },
        {
            field: 'expiryDate',
            headerName: 'Expiry Date',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {params?.row?.expiryDate ? moment(params?.row?.expiryDate).format("DD-MM-YYYY") : ""}
                </Box>
            )
        },
        { field: 'challanNo', headerName: 'Challan No', width: 200 },
        {
            field: 'fieldPerson',
            headerName: 'Field Person',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {fullName(params?.row?.fieldPerson)}
                </Box>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {params?.row?.date ? moment(params?.row?.date).format("DD-MM-YYYY") : ""}
                </Box>
            )
        },
    ];

    const deleteData = async (id) => {
        const result = await apidelete(`/api/sampleGiftWithChallan/${id}`);
        setUserAction(result)
    }

    const downloadSamFile = () => {
        window.open(samFile)
    }
    
    useEffect(() => {
        dispatch(fetchChallanData());
    }, [userAction])
    return (
        <div>

            {/* import File */}
            <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

            {/* Add Sample/Gift With Challan */}
            <AddSampleGiftWithChallan isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} challanData={challanData} setChallanData={setChallanData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Sample/Gift With Challan</Typography>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box>
                                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                            Add New
                                        </Button>
                                    </Box>
                                    <Stack direction={"row"} spacing={2}>
                                        <Tooltip title="Upload File" arrow>
                                            <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} onClick={() => setisOpenImport(true)}>
                                                Import
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Download Sample File" arrow>
                                            <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} onClick={downloadSamFile}>
                                                Download
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                            </Grid>

                        </Grid>
                        <Card style={{ height: '60vh' }}>
                            <DataGrid
                                rows={challanList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25, 50, 100]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default SampleGiftWithChallan