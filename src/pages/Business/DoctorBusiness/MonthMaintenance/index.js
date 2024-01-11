/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import { Autocomplete, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react'


const yearList = [
  { label: '2022' },
  { label: '2023' },
  { label: '2024' },
  { label: '2025' },
  { label: '2026' },
  { label: '2027' },
];

const monthList = [
  { label: 'January' },
  { label: 'February' },
  { label: 'March' },
  { label: 'Apridl' },
  { label: 'May' },
  { label: 'June' },
  { label: 'July' },
  { label: 'August' },
  { label: 'September' },
  { label: 'October' },
  { label: 'November' },
  { label: 'December' },
];


// eslint-disable-next-line arrow-body-style
const MonthMaintenance = () => {
  return (
    <div>

      <Box width="100%" pt={3}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
          <Grid item xs={12} sm={2} md={2}>
            <Autocomplete
              size="small"
              onChange={(event, newValue) => {
                // fetchData(newValue || '');
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
            <Button variant='contained'>Go</Button>
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
                          <TextField size='small' type='date' />
                        </TableCell>
                      </TableRow>
                    ))
                  }
                  <TableRow>
                    <TableCell align="left"><Button variant='contained'>Save</Button></TableCell>
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