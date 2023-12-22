import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import AddTarget from './AddTarget';
import { fetchTargetData } from '../../../redux/slice/GetTargetSlice';

const Target = () => {

    const [taxList, setTaxList] = useState([])
    const dispatch = useDispatch();

    const targetList = useSelector((state)=>state?.getTarget?.data)

    console.log(targetList,"targetList")

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [taxData, setTaxData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
    ]


    const columns = [
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     sortable: false,
        //     flex: 1,
        //     // eslint-disable-next-line arrow-body-style
        //     renderCell: (params) => {
        //         const handleClick = async (data) => {
        //             setTaxData(data);
        //             handleOpenEdit();
        //         };

        //         const handleClickDeleteBtn = async (data) => {
        //             setId(data?._id);
        //             handleOpenDeleteModel();
        //         };
        //         return (
        //             <Box>
        //                 {/* <EditTax isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchTaxData={fetchTaxData} data={taxData} /> */}
        //                 <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteTax} id={id} />

        //                 <Stack direction={"row"} spacing={2}>
        //                     <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
        //                     <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
        //                 </Stack>
        //             </Box>
        //         );
        //     },
        // },
        { field: 'srNo', headerName: 'Sr.No', width: 100 },
        { field: 'employeeName', headerName: 'Employee Name', width: 300, cellClassName: 'name-column--cell--capitalize' },
        { field: 'headquarter', headerName: 'Headquarter', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'frequency', headerName: 'Frequency', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'month', headerName: 'Month', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'quarter', headerName: 'Quarter', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'year', headerName: 'Year', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'pobSec', headerName: 'POB SEC. Value', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'firmSec', headerName: 'FIRM SEC. Value', width: 150, cellClassName: 'name-column--cell--capitalize' },
        { field: 'noOfDrVisit', headerName: 'No Of DR. Visit	', width: 150 },
        { field: 'noOfChemistVisit', headerName: 'No Of Chemist Visit	', width: 150 },
        { field: 'noOfNewChemistAdddition', headerName: 'No Of New Chemist Adddition	', width: 150 },
        {
            field: 'noOfNewDoctorAdddition', headerName: 'No Of New Doctor Adddition', width: 150
        },
    ];

 

    useEffect(() => {
        dispatch(fetchTargetData());
    }, [])
    return (
        <div>
            {/* Add Target */}
            <AddTarget isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchTargetData={fetchTargetData} />

            {/* <Container maxWidth="xl"> */}
            <TableStyle>
                <Box width="100%" pt={3}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Zone' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Division' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                size='small'
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder='Select Employee' style={{ fontSize: "12px" }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                fullWidth
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select Month' />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                fullWidth
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select Quarter' />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                fullWidth
                                options={top100Films}
                                size='small'
                                renderInput={(params) => <TextField {...params} placeholder='Select Year' style={{ fontSize: "15px" }} />}
                            />
                        </Grid>

                    </Grid>
                    <Stack direction={"row"} spacing={2} my={2}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                            Add New
                        </Button>
                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} onClick={handleOpenAdd}>
                            Export
                        </Button>
                    </Stack>
                    <Card style={{ height: '72vh' }}>
                        <DataGrid
                            rows={targetList}
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
            {/* </Container> */}
        </div>
    )
}

export default Target
