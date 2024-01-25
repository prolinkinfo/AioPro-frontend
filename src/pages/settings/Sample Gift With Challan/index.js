import { Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddSampleGiftWithChallan from './Add'

const SampleGiftWithChallan = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);

    const columns = [
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     sortable: false,
        //     width: 200,
        //     // eslint-disable-next-line arrow-body-style
        //     renderCell: (params) => {
        //         const handleClick = async (data, e) => {
        //             setAnchorEl(e.currentTarget);
        //             setpromotionalGiftData(data);
        //             setId(data?._id)
        //         };
        //         return (
        //             <Box>
        //                 <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchPromotionalGiftData={fetchPromotionalGiftData} data={promotionalGiftData} />
        //                 <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
        //                 <CustomMenu
        //                     open={open}
        //                     handleClick={handleClick}
        //                     anchorEl={anchorEl}
        //                     handleClose={handleClose}
        //                     params={params}
        //                     id={id}
        //                     handleOpenEdit={handleOpenEdit}
        //                     handleOpenDeleteModel={handleOpenDeleteModel}
        //                 />
        //             </Box>
        //         );
        //     },
        // },
        { field: 'sampleGift', headerName: 'Sample / Gift', width: 200 },
        {
            field: 'packSize',
            headerName: 'Pack Size',
            width: 200,

        },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'batchNo', headerName: 'Batch No', width: 200 },
        { field: 'expiryDate', headerName: 'Expiry Date', width: 200 },
        { field: 'challanNo', headerName: 'Challan No', width: 200 },
        {
            field: 'fieldPerson',
            headerName: 'Field Person',
            width: 200,
            renderCell: (params) => (
                <Box>
                    {/* {fullName(params?.row?.employeeName)} */}
                </Box>
            )
        },
        { field: 'date', headerName: 'Date', width: 200 },
    ];

    return (
        <div>
            {/* Add Sample/Gift With Challan */}
            <AddSampleGiftWithChallan isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd}/>

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
                                            <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} >
                                                Import
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Download Sample File" arrow>
                                            <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} >
                                                Download
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"}>
                                <TextField
                                    type='text'
                                    size='small'
                                    placeholder='Search'
                                // style={{ width: "300px" }}
                                // onChange={fetchData}
                                />
                            </Grid>
                        </Grid>
                        <Card style={{ height: '60vh' }}>
                            <DataGrid
                                rows={nbNO}
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

export default SampleGiftWithChallan