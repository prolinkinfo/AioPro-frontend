/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import { Autocomplete, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apipost, apiput } from '../../../../service/api';
import { fetchDoctorMonthMaintenance } from '../../../../redux/slice/GetDoctorMonthMaintenanceSlice';

const yearList = [
  { label: '2022' },
  { label: '2023' },
  { label: '2024' },
  { label: '2025' },
  { label: '2026' },
  { label: '2027' },
];

const monthList = [
  { id: "month1", label: 'January' },
  { id: "month2", label: 'February' },
  { id: "month3", label: 'March' },
  { id: "month4", label: 'Apridl' },
  { id: "month5", label: 'May' },
  { id: "month6", label: 'June' },
  { id: "month7", label: 'July' },
  { id: "month8", label: 'August' },
  { id: "month9", label: 'September' },
  { id: "month10", label: 'October' },
  { id: "month11", label: 'November' },
  { id: "month12", label: 'December' },
];


// eslint-disable-next-line arrow-body-style
const MonthMaintenance = () => {

  const [selectedYear, setSelectedYear] = useState('');
  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [monthData, setMonthData] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const dispatch = useDispatch();
  const month = useSelector((state) => state?.getDoctorMonthMaintenance?.data)

  const handleDateChange = (monthId, name, field, value) => {
    setMonthData((prevDates) => ({
      ...prevDates,
      [monthId]: {
        ...prevDates[monthId], "name": name,
        [field]: value,
      },
    }));
  };

  const handleSearch = () => {
    setYear(selectedYear);
    const filterData = month?.find((data) => data?.year === selectedYear);
    setId(filterData?._id);
    setMonthData({
      month1: {
        name: filterData?.monthData?.month1?.name,
        submissionDeadline: filterData?.monthData?.month1?.submissionDeadline
      },
      month2: {
        name: filterData?.monthData?.month2?.name,
        submissionDeadline: filterData?.monthData?.month2?.submissionDeadline
      },
      month3: {
        name: filterData?.monthData?.month3?.name,
        submissionDeadline: filterData?.monthData?.month3?.submissionDeadline
      },
      month4: {
        name: filterData?.monthData?.month4?.name,
        submissionDeadline: filterData?.monthData?.month4?.submissionDeadline
      },
      month5: {
        name: filterData?.monthData?.month5?.name,
        submissionDeadline: filterData?.monthData?.month5?.submissionDeadline
      },
      month6: {
        name: filterData?.monthData?.month6?.name,
        submissionDeadline: filterData?.monthData?.month6?.submissionDeadline
      },
      month7: {
        name: filterData?.monthData?.month7?.name,
        submissionDeadline: filterData?.monthData?.month7?.submissionDeadline
      },
      month8: {
        name: filterData?.monthData?.month8?.name,
        submissionDeadline: filterData?.monthData?.month8?.submissionDeadline
      },
      month9: {
        name: filterData?.monthData?.month9?.name,
        submissionDeadline: filterData?.monthData?.month9?.submissionDeadline
      },
      month10: {
        name: filterData?.monthData?.month10?.name,
        submissionDeadline: filterData?.monthData?.month10?.submissionDeadline
      },
      month11: {
        name: filterData?.monthData?.month11?.name,
        submissionDeadline: filterData?.monthData?.month11?.submissionDeadline
      },
      month12: {
        name: filterData?.monthData?.month12?.name,
        submissionDeadline: filterData?.monthData?.month12?.submissionDeadline
      },
    })
    setIsTrue(!!filterData);
    setSelectedYear(filterData?.year)
  }

  const handleSubmit = async () => {
    const payload = {
      year,
      monthData
    }
    const result = await apipost('/api/doctorMonthMaintenance', payload);
    if (result && result.status === 200) {
      dispatch(fetchDoctorMonthMaintenance());
    }
  }

  const handleEdit = async () => {
    const payload = {
      _id: id,
      year: selectedYear,
      monthData
    }
    const result = await apiput('/api/doctorMonthMaintenance', payload);
    if (result && result.status === 200) {
      dispatch(fetchDoctorMonthMaintenance());
    }
  }

  useEffect(() => {
    dispatch(fetchDoctorMonthMaintenance());
  }, [])

  return (
    <div>
      <Box width="100%" pt={3}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
          <Grid item xs={12} sm={2} md={2}>
            <Autocomplete
              size="small"
              onChange={(event, newValue) => {
                setSelectedYear(newValue ? newValue?.label : '');
              }}
              fullWidth
              options={yearList}
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
          <Grid item xs={12} sm={2} md={2}>
            <Button variant='contained' onClick={handleSearch}>Go</Button>
          </Grid>
          <Box width="100%" pt={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Month</TableCell>
                    <TableCell align="left">Submission Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    monthList?.map((month, i) => (
                      <TableRow key={i}>
                        <TableCell align="left" style={{ fontWeight: "bold" }}>{month?.label}</TableCell>
                        <TableCell align="left">
                          <TextField
                            size='small'
                            type='date'
                            value={monthData?.[month?.id]?.submissionDeadline || ''}
                            onChange={(e) => handleDateChange(month?.id, month?.label, 'submissionDeadline', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))

                  }
                  <TableRow>
                    <TableCell align="left">
                      {
                        isTrue === false ?
                          <Button variant='contained' onClick={handleSubmit}>Save</Button>
                          :
                          <Button variant='contained' onClick={handleEdit}>Edit</Button>
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Box>
    </div>
  )
}

export default MonthMaintenance