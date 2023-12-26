/* eslint-disable arrow-body-style */
import { Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorSpecialityData } from '../../../../../redux/slice/GetDoctorSpecialitySlice'
import { apiput } from '../../../../../service/api'

const SpecialityManagement = () => {

    const [specialityName, setSpecialityName] = useState('');
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const specialityList = useSelector((state) => state?.getDoctorSpeciality?.data)

    const handlePageChnage = (e, page) => {
        setCurrentPage(page)
    }
    const handleChangeRowsPerPage = (e, page) => {
        const newRowsPerPage = parseInt(e.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
    }

    const currentListData = specialityList.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)


    const handleChange = (e) => {
        setSpecialityName(e.target.value)
    }

    const handleSave = async (id) => {
        const payload = {
            _id: id,
            specialityName,
        }
        const result = await apiput('/api/doctorspeciality', payload);

        if (result && result.status === 200) {
            dispatch(fetchDoctorSpecialityData());
            setSpecialityName('')
        }
    }

    useEffect(() => {
        dispatch(fetchDoctorSpecialityData());
    }, [])

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Speciality Management</Typography>
                </Stack>
                <Box width="100%" pt={3}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">SPECIALITY NAME</TableCell>
                                    <TableCell align="center">CORRECT SPECIALITY</TableCell>
                                    <TableCell align="center">ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentListData && currentListData?.length > 0 && currentListData?.map((row, index) => (
                                    <TableRow
                                        key={row.specialityName}
                                    >
                                        <TableCell align="center">{row.specialityName}</TableCell>
                                        <TableCell align="center">
                                            <TextField size='small' onChange={(e) => handleChange(e)} />
                                        </TableCell>
                                        <TableCell align="center"><Button variant='contained' onClick={() => handleSave(row?._id)}>Update</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <TablePagination
                            count={specialityList.length}
                            page={currentPage}
                            rowsPerPageOptions={[5, 10]}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handlePageChnage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </Box>
            </Container>

        </div>
    )
}

export default SpecialityManagement