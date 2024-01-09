/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiput } from '../../../../../service/api'
import { fetchZoneData } from '../../../../../redux/slice/GetZoneSlice'
import { fetchCityData } from '../../../../../redux/slice/GetCitySlice'

const ZoneManagement = () => {

    const [cityName, setCityName] = useState('');
    const [zoneList, setZoneList] = useState('');
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const cityList = useSelector((state) => state?.getCity?.data)
    const zoneData = useSelector((state) => state?.getZone?.data)


    const handlePageChnage = (e, page) => {
        setCurrentPage(page)
    }
    const handleChangeRowsPerPage = (e, page) => {
        const newRowsPerPage = parseInt(e.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
    }

    const currentListData = zoneList.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)


    const handleChange = (e) => {
        setCityName(e.target.value)
    }

    const handleSave = async (id) => {
        const payload = {
            _id: id,
            cityName,
        }
        const result = await apiput('/api/zone', payload);

        if (result && result.status === 200) {
            setCityName('')
            dispatch(fetchZoneData());
        }
    }

    const fetchData = (zone) => {
        const filteredCity = zoneData?.filter(({ zoneName }) => zoneName?.toLowerCase()?.includes(zone?.toLowerCase()));
        setZoneList(zone?.length > 0 ? (filteredCity?.length > 0 ? filteredCity : []) : zoneData);

    };

    useEffect(() => {
        dispatch(fetchZoneData());
        dispatch(fetchCityData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [zoneData])

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Zone Management</Typography>
                </Stack>
                <Box width="100%" pt={3}>
                    <Box py={2}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                fetchData(newValue ? newValue.zoneName : "");
                            }}
                            options={zoneList}
                            getOptionLabel={(zone) => zone?.zoneName}
                            style={{ textTransform: 'capitalize', width: "300px" }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ textTransform: 'capitalize' }}
                                    placeholder='Select Zone'
                                />
                            )}
                        />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ZONE NAME	</TableCell>
                                    <TableCell align="center">ZONE CODE</TableCell>
                                    <TableCell align="center">CITY NAME</TableCell>
                                    <TableCell align="center">UPDATE CITY</TableCell>
                                    <TableCell align="center">ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentListData && currentListData?.length > 0 && currentListData ? currentListData?.map((row, index) => (
                                    <TableRow
                                        key={row._id}
                                    >
                                        <TableCell align="center">{row.zoneName}</TableCell>
                                        <TableCell align="center">{row.zoneCode}</TableCell>
                                        <TableCell align="center">{row.cityName}</TableCell>
                                        <TableCell align="center">
                                            {/* <TextField size='small' onChange={(e) => handleChange(e)} /> */}
                                            <Autocomplete
                                                size="small"
                                                onChange={(event, newValue) => {
                                                    setCityName(newValue ? newValue?.cityName : "")
                                                }}
                                                fullWidth
                                                options={cityList}
                                                getOptionLabel={(city) => city?.cityName}
                                                style={{ textTransform: 'capitalize' }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        style={{ textTransform: 'capitalize', width: "300px" }}
                                                        placeholder='Select City'
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell align="center"><Button variant='contained' onClick={() => handleSave(row?._id)}>Update</Button></TableCell>
                                    </TableRow>
                                ))
                                    :
                                    <TableRow>
                                        <TableCell colSpan={6}><Typography textAlign={"center"}>Not Found</Typography></TableCell>
                                    </TableRow>

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <TablePagination
                            count={zoneList.length}
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

export default ZoneManagement