/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { Autocomplete, Box, Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Iconify from '../../../../components/iconify';
import { fetchZoneData } from '../../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../../redux/slice/GetDivisionSlice';
import { fetchEmployeeData } from '../../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../../redux/slice/GetFirmTypesSlice';


const monthList = [
    { label: 'January', i: 0 },
    { label: 'February', i: 1 },
    { label: 'March', i: 2 },
    { label: 'April', i: 3 },
    { label: 'May', i: 4 },
    { label: 'June', i: 5 },
    { label: 'July', i: 6 },
    { label: 'August', i: 7 },
    { label: 'September', i: 8 },
    { label: 'October', i: 9 },
    { label: 'November', i: 10 },
    { label: 'December', i: 11 },
];

const yearList = [
    { label: '2022' },
    { label: '2023' },
    { label: '2024' },
    { label: '2025' },
    { label: '2026' },
    { label: '2027' },
];

const weekList = [
    { id: "week1", weekName: "Week 1" },
    { id: "week2", weekName: "Week 2" },
    { id: "week3", weekName: "Week 3" },
    { id: "week4", weekName: "Week 4" },
    { id: "week5", weekName: "Week 5" },
    { id: "week6", weekName: "Week 6" },
]

const weekmain = [
    {
        "month": "January",
        "year": "2022",
        "weekDates": {
            "week1": {
                "startDate": "2024-01-18",
                "endDate": "2024-01-24",
                "submissionDeadline": "2024-01-23"
            },
            "week2": {
                "startDate": "2024-01-19",
                "endDate": "2024-01-18",
                "submissionDeadline": "2024-01-10"
            },
            "week3": {
                "startDate": "2024-01-18",
                "endDate": "2024-01-11",
                "submissionDeadline": "2024-01-03"
            },
            "week4": {
                "startDate": "2024-01-19",
                "endDate": "2024-01-24",
                "submissionDeadline": "2024-01-18"
            },
            "week5": {
                "startDate": "2024-01-19",
                "endDate": "2024-01-24",
                "submissionDeadline": "2024-01-11"
            },
            "week6": {
                "startDate": "2024-01-20",
                "endDate": "2024-01-24",
                "submissionDeadline": "2024-01-30"
            }
        }
    }
]

const WeekMaintenance = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [weekData, setWeekData] = useState([]);
    const [data, setData] = useState([]);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [weekDates, setWeekDates] = useState([]);

    const handleDateChange = (weekId, field, value) => {
        setWeekDates((prevDates) => ({
            ...prevDates,
            [weekId]: {
                ...prevDates[weekId],
                [field]: value,
            },
        }));
    };

    const handleSearch = () => {
        setMonth(selectedMonth);
        setYear(selectedYear)
        setWeekDates("");
        const filtered = weekmain?.filter(({ month, year }) =>
            month?.toLowerCase() === selectedMonth?.toLowerCase() &&
            year?.toLowerCase() === selectedYear?.toLowerCase()
        )
        setWeekDates({
            week1: {
                startDate: filtered[0]?.weekDates?.week1?.startDate,
                endDate: filtered[0]?.weekDates?.week1?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week1?.submissionDeadline
            },
            week2: {
                startDate: filtered[0]?.weekDates?.week2?.startDate,
                endDate: filtered[0]?.weekDates?.week2?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week2?.submissionDeadline
            },
            week3: {
                startDate: filtered[0]?.weekDates?.week3?.startDate,
                endDate: filtered[0]?.weekDates?.week3?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week3?.submissionDeadline
            },
            week4: {
                startDate: filtered[0]?.weekDates?.week4?.startDate,
                endDate: filtered[0]?.weekDates?.week4?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week4?.submissionDeadline
            },
            week5: {
                startDate: filtered[0]?.weekDates?.week5?.startDate,
                endDate: filtered[0]?.weekDates?.week5?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week5?.submissionDeadline
            },
            week6: {
                startDate: filtered[0]?.weekDates?.week6?.startDate,
                endDate: filtered[0]?.weekDates?.week6?.endDate,
                submissionDeadline: filtered[0]?.weekDates?.week5?.submissionDeadline
            },
        });

        setWeekData(filtered)
        console.log(filtered, "filtered")
    }

    const handleSubmit = () => {
        setMonth(selectedMonth);
        setYear(selectedYear)
        const d = {
            month: month,
            year: year,
            weekDates
        }
        setData([...data, d])
        setWeekData([...weekData, d])
    }

    const handleEdit = (data) => {
        setSelectedMonth(data?.month);
        setSelectedYear(data?.year);
        setMonth(data?.month)
        setYear(data?.year)
        setWeekDates({
            week1: {
                startDate: data?.weekDates?.week1?.startDate,
                endDate: data?.weekDates?.week1?.endDate,
                submissionDeadline: data?.weekDates?.week1?.submissionDeadline
            },
            week2: {
                startDate: data?.weekDates?.week2?.startDate,
                endDate: data?.weekDates?.week2?.endDate,
                submissionDeadline: data?.weekDates?.week2?.submissionDeadline
            },
            week3: {
                startDate: data?.weekDates?.week3?.startDate,
                endDate: data?.weekDates?.week3?.endDate,
                submissionDeadline: data?.weekDates?.week3?.submissionDeadline
            },
            week4: {
                startDate: data?.weekDates?.week4?.startDate,
                endDate: data?.weekDates?.week4?.endDate,
                submissionDeadline: data?.weekDates?.week4?.submissionDeadline
            },
            week5: {
                startDate: data?.weekDates?.week5?.startDate,
                endDate: data?.weekDates?.week5?.endDate,
                submissionDeadline: data?.weekDates?.week5?.submissionDeadline
            },
            week6: {
                startDate: data?.weekDates?.week6?.startDate,
                endDate: data?.weekDates?.week6?.endDate,
                submissionDeadline: data?.weekDates?.week5?.submissionDeadline
            },
        });
    }

    const fetchData = async (e) => {
        setWeekData(weekmain)
    };

    useEffect(() => {
        fetchData();
    }, [weekmain])

    console.log(weekData, "weekData")
    return (
        <div>
            <Box width="100%" pt={3}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                setSelectedMonth(newValue ? newValue?.label : "");
                                // fetchData(newValue ? newValue?.label : "")
                            }}
                            fullWidth
                            value={monthList.find(month => month?.label === selectedMonth) || null}
                            options={monthList}
                            getOptionLabel={(month) => month?.label}
                            style={{ textTransform: 'capitalize' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ textTransform: 'capitalize' }}
                                    placeholder='Select Month'
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} md={1.5}>
                        <Autocomplete
                            size="small"
                            onChange={(event, newValue) => {
                                setSelectedYear(newValue ? newValue?.label : "");
                                // fetchData(newValue ? newValue?.label : "")
                            }}
                            fullWidth
                            options={yearList}
                            value={yearList.find(year => year?.label === selectedYear) || null}
                            getOptionLabel={(year) => year?.label}
                            style={{ textTransform: 'capitalize' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ textTransform: 'capitalize' }}
                                    placeholder='Select Year'
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} md={1.5}>
                        <Button variant='contained' onClick={handleSearch}>Go</Button>
                    </Grid>
                    <Box width="100%" pt={3}>
                        {
                            month && year ?
                                <>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableBody >
                                                {
                                                    weekList?.map((week) => (
                                                        <TableRow key={week?.id}>
                                                            <TableCell align="left" style={{ fontWeight: "bold", }}>{week?.weekName}</TableCell>
                                                            <TableCell align="left">
                                                                <div style={{ display: "flex", alignItems: "center", }}>
                                                                    <span>From</span><span style={{ margin: "0px 15px 0px 15px" }}>-</span><TextField size='small' type='date' value={weekDates[week.id]?.startDate || ''}
                                                                        onChange={(e) =>
                                                                            handleDateChange(week.id, 'startDate', e.target.value)
                                                                        } /> <span style={{ margin: "0px 15px 0px 15px" }}>-</span> <span>To</span> <span style={{ margin: "0px 15px 0px 15px" }}>-</span> <TextField size='small' type='date' value={weekDates[week.id]?.endDate || ''} onChange={(e) =>
                                                                            handleDateChange(week?.id, 'endDate', e.target.value)
                                                                        } />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="left" style={{ display: "flex", alignItems: "center", }}>
                                                                <span style={{ fontWeight: "bold" }}>Submission Deadline </span> <TextField size='small' type='date' value={weekDates[week.id]?.submissionDeadline || ''} onChange={(e) =>
                                                                    handleDateChange(week?.id, 'submissionDeadline', e.target.value)
                                                                } style={{ marginLeft: "15px" }} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                <TableRow>
                                                    <TableCell align="left" style={{}}></TableCell>
                                                    <TableCell align="left"></TableCell>
                                                    <TableCell align="center">
                                                        <Button variant='contained' onClick={handleSubmit}>Save</Button>
                                                    </TableCell>

                                                </TableRow>
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </>
                                :
                                ""
                        }
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, marginTop: "20px" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Action</TableCell>
                                        <TableCell align="left">Year</TableCell>
                                        <TableCell align="left">Month</TableCell>
                                        <TableCell align="left">Week 1	</TableCell>
                                        <TableCell align="left">Week 2	</TableCell>
                                        <TableCell align="left">Week 3	</TableCell>
                                        <TableCell align="left">Week 4	</TableCell>
                                        <TableCell align="left">Week 5	</TableCell>
                                        <TableCell align="left">Week 6	</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        weekData ?
                                            weekData?.map((item) => (
                                                <TableRow >
                                                    <TableCell align="left">
                                                        <Button variant='outlined' color='primary' onClick={() => handleEdit(item)}>Edit</Button>
                                                    </TableCell>
                                                    <TableCell align="left">{item?.month}</TableCell>
                                                    <TableCell align="left">{item?.year}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week1?.startDate ? moment(item?.weekDates?.week1?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week1?.endDate ? moment(item?.weekDates?.week1?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week2?.startDate ? moment(item?.weekDates?.week2?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week2?.endDate ? moment(item?.weekDates?.week2?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week3?.startDate ? moment(item?.weekDates?.week3?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week3?.endDate ? moment(item?.weekDates?.week3?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week4?.startDate ? moment(item?.weekDates?.week4?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week4?.endDate ? moment(item?.weekDates?.week4?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week5?.startDate ? moment(item?.weekDates?.week5?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week5?.endDate ? moment(item?.weekDates?.week5?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                    <TableCell align="left">{`${item?.weekDates?.week5?.startDate ? moment(item?.weekDates?.week5?.startDate).format("DD/MM/YYYY") : "-"} To ${item?.weekDates?.week5?.endDate ? moment(item?.weekDates?.week5?.endDate).format("DD/MM/YYYY") : "-"}`}</TableCell>
                                                </TableRow>
                                            ))

                                            : ""
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default WeekMaintenance