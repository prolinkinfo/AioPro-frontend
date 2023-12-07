import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableStyleTwo from '../../../../../components/TableStyleTwo'
import Iconify from '../../../../../components/iconify'
import AddCountry from './AddCountry'
import AddState from './AddState'
import AddCity from './AddCity'
import { apiget } from '../../../../../service/api'

const ConutryMaster = () => {

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])

    const [isOpenCountry, setIsOpenCountry] = useState(false)
    const [isOpenState, setIsOpenState] = useState(false)
    const [isOpenCity, setIsOpenCity] = useState(false)

    const handleOpenCountry = () => setIsOpenCountry(true)
    const handleCloseCountry = () => setIsOpenCountry(false)
    const handleOpenState = () => setIsOpenState(true)
    const handleCloseState = () => setIsOpenState(false)
    const handleOpenCity = () => setIsOpenCity(true)
    const handleCloseCity = () => setIsOpenCity(false)

    const countryColumns = [
        { field: "countryId", headerName: "Country Id", flex: 1 },
        { field: "countryName", headerName: "Country Name", flex: 1 },
        { field: "countryCode", headerName: "Country Code", flex: 1 },
    ];

    const stateColumns = [
        { field: "stateId", headerName: "State Id", flex: 1 },
        { field: "stateName", headerName: "State Name", flex: 1 },
        { field: "countryName", headerName: "Country Name", flex: 1 },
    ];

    const cityColumns = [
        { field: "cityId", headerName: "City Id", flex: 1 },
        { field: "cityName", headerName: "City Name", flex: 1 },
        { field: "stateName", headerName: "State Name", flex: 1 },
    ];

    const fetchCountryData = async () => {
        const result = await apiget(`/api/countryMaster`);
        if (result && result.status === 200) {
            setCountryList(result?.data?.result);
        }
    };

    const fetchStateData = async () => {
        const result = await apiget(`/api/stateMaster`);
        if (result && result.status === 200) {
            setStateList(result?.data?.result);
        }
    };

    const fetchCityData = async () => {
        const result = await apiget(`/api/cityMaster`);
        if (result && result.status === 200) {
            setCityList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchCountryData();
        fetchStateData();
        fetchCityData();
    }, []);


    return (
        <div>
            {/* Add Country */}
            <AddCountry isOpenCountry={isOpenCountry} handleCloseCountry={handleCloseCountry} fetchCountryData={fetchCountryData} />

            {/* Add State */}
            <AddState isOpenState={isOpenState} handleCloseState={handleCloseState} fetchStateData={fetchStateData} />

            {/* Add City */}
            <AddCity isOpenCity={isOpenCity} handleCloseCity={handleCloseCity} fetchCityData={fetchCityData} />
            
            <Container maxWidth="xl">
                <Card>
                    <Box style={{ cursor: "pointer" }} p={2}>
                        <Grid container display="flex" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                                <Stack direction="row" spacing={1} alignItems={"center"}>
                                    <Typography variant="h5">Country Master</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                        onClick={handleOpenCountry}
                                    >
                                        Add New
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Box>
                    <TableStyleTwo>
                        <Box width="100%" height="50vh">
                            <DataGrid
                                rows={countryList}
                                columns={countryColumns}
                                getRowId={row => row._id}
                                columnHeaderHeight={40}
                            />
                        </Box>
                    </TableStyleTwo>
                </Card>

                <Card style={{ marginTop: "80px" }}>
                    <Box style={{ cursor: "pointer" }} p={2}>
                        <Grid container display="flex" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                                <Stack direction="row" spacing={1} alignItems={"center"}>
                                    <Typography variant="h5">State Master</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                        onClick={handleOpenState}
                                    >
                                        Add New
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Box>
                    <TableStyleTwo>
                        <Box width="100%" height="50vh">
                            <DataGrid
                                rows={stateList}
                                columns={stateColumns}
                                getRowId={row => row._id}
                                columnHeaderHeight={40}
                            />
                        </Box>
                    </TableStyleTwo>
                </Card>

                <Card style={{ marginTop: "80px" }}>
                    <Box style={{ cursor: "pointer" }} p={2}>
                        <Grid container display="flex" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                                <Stack direction="row" spacing={1} alignItems={"center"}>
                                    <Typography variant="h5">City Master</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                        onClick={handleOpenCity}
                                    >
                                        Add New
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Box>
                    <TableStyleTwo>
                        <Box width="100%" height="50vh">
                            <DataGrid
                                rows={cityList}
                                columns={cityColumns}
                                getRowId={row => row._id}
                                columnHeaderHeight={40}
                            />
                        </Box>
                    </TableStyleTwo>
                </Card>
            </Container>
        </div>
    )
}

export default ConutryMaster
