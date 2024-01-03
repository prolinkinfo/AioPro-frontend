import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import TableStyleTwo from '../../../../components/TableStyleTwo'
import Iconify from '../../../../components/iconify'
import AddClinicAddress from './Add'
import { fetchDoctorData } from '../../../../redux/slice/GetDoctorSlice'
import { apiget } from '../../../../service/api'
import Edit from "./Edit"

const ClinicAddress = ({ data, setUserAction, clinicAddress }) => {

    const [clinicAddressDetails, setClinicAddressDetails] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const handleOpenAdd = () => setIsOpen(true)
    const handleCloseAdd = () => setIsOpen(false)
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const params = useParams();
    // const [data, setData] = useState({});

    const d =(value1,value2)=>{
        const percentage = (value1 / value2) * 100;
        return percentage
    }

    console.log(d(10,50));

    const columns = [
        {
            field: "",
            headerName: "Action",
            cellClassName: "name-column--cell name-column--cell--capitalize",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setClinicAddressDetails(data);
                    handleOpenEdit();
                };
                return (
                    <Box>
                        <Edit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit}  data={clinicAddressDetails} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: "doctorName",
            headerName: "Doctor Name",
            cellClassName: "name-column--cell name-column--cell--capitalize",
            width: 300,

        },
        {
            field: "clinicAddress",
            headerName: "Clinic Address",
            width: 300,

        },
        {
            field: "city",
            headerName: "City",
            width: 150,

        },
        {
            field: "preferredDay",
            headerName: "Preferred Day",
            width: 300,

        },
        {
            field: "preferredTime",
            headerName: "Preferred Time",
            width: 300,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.row?.startTime} - {params?.row?.endTime}
                    </Box>
                );
            },
        },
        {
            field: "latitude",
            headerName: "Latitude",
            width: 300,
        },
        {
            field: "longitude",
            headerName: "Longitude",
            width: 300,

        },
    ];

    console.log(clinicAddress, "clinicAddress")

    return (
        <div>
            <AddClinicAddress isOpen={isOpen} handleClose={handleCloseAdd} data={data} setUserAction={setUserAction} />

            <Box style={{ cursor: "pointer" }} p={2}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            <Typography variant="h5">Clinic Address</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                                onClick={handleOpenAdd}
                            >
                                Add New
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Box>
            <TableStyleTwo>
                <Box width="100%" height="30vh">
                    <DataGrid
                        rows={clinicAddress}
                        columns={columns}
                        getRowId={row => row._id}
                        columnHeaderHeight={40}
                    />
                </Box>
            </TableStyleTwo>
        </div>
    )
}

export default ClinicAddress
