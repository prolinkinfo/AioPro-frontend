/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCityData } from '../../../../../redux/slice/GetCitySlice'
import { fetchStateData } from '../../../../../redux/slice/GetStateSlice'
import { apiput } from '../../../../../service/api'

const CityManagement = () => {

    const [cityName, setCityName] = useState('');
    const [cityList, setCityList] = useState([])
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const cityData = useSelector((state) => state?.getCity?.data)
    const stateList = useSelector((state) => state?.getState?.data)


    const handlePageChnage = (e, page) => {
        setCurrentPage(page)
    }
    const handleChangeRowsPerPage = (e, page) => {
        const newRowsPerPage = parseInt(e.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0);
    }

    const currentListData = cityList.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)


    const handleChange = (e) => {
        setCityName(e.target.value)
    }

    const handleSave = async (id) => {
        const payload = {
            _id: id,
            cityName,
        }
        const result = await apiput('/api/citymaster', payload);

        if (result && result.status === 200) {
            setCityName('')
            dispatch(fetchCityData());
        }
    }

    const fetchData = (sName) => {
        const filteredCity = cityData?.filter(({ stateName }) => stateName?.toLowerCase()?.includes(sName?.toLowerCase()));
        if (sName) {
            setCityList(filteredCity)
        } else {
            setCityList(cityData)
        }
    };

    useEffect(() => {
        dispatch(fetchCityData());
        dispatch(fetchStateData());
    }, [])

    useEffect(() => {
        fetchData();
    }, [cityData])

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">City Management</Typography>
                </Stack>
                <Box width="100%" pt={3}>
                    <Box py={2}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                fetchData(newValue ? newValue.stateName : "");
                            }}
                            options={stateList}
                            getOptionLabel={(state) => state?.stateName}
                            style={{ textTransform: 'capitalize', width: "300px" }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ textTransform: 'capitalize' }}
                                    placeholder='Select State'
                                />
                            )}
                        />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">CITY NAME	</TableCell>
                                    <TableCell align="center">STATE NAME</TableCell>
                                    <TableCell align="center">VERIFIED</TableCell>
                                    <TableCell align="center">SUGGESTIONS</TableCell>
                                    <TableCell align="center">UPDATE VALUE</TableCell>
                                    <TableCell align="center">ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentListData && currentListData?.length > 0 && currentListData ? currentListData?.map((row, index) => (
                                    <TableRow
                                        key={row._id}
                                    >
                                        <TableCell align="center">{row.cityName}</TableCell>
                                        <TableCell align="center">{row.stateName}</TableCell>
                                        <TableCell align="center">No</TableCell>
                                        <TableCell align="center">N/A</TableCell>
                                        <TableCell align="center">
                                            <TextField size='small' onChange={(e) => handleChange(e)} />
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
                            count={cityList.length}
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

export default CityManagement