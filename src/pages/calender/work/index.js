import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


export const WorkCalender = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  return (
    <Box>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link to={`/${userRole}/dashboard/reports/visit`} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant="h6">Approvel Tour Plan</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                Approve & unlock tour plans of employees for the selected month.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link to={`/${userRole}/dashboard/reports/firmvisits`} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant="h6">Deviation Approval</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                Approve & deny tour plans deviation request of employee.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link
                to={`/${userRole}/dashboard/calendar/addtourplan`}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <Typography variant="h6">Add Tour Plan (Monthly)</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                Add monthly tour plan for employee.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link to={`/${userRole}/dashboard/calendar/viewtourplan`} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant="h6">View Tour Plan</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                View the tour plans of the employees.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link to={`/${userRole}/dashboard/reports/visit`} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant="h5">Modify Tour Plan</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                Revised Tour Plan worked only in case of Approved or Not Submitted.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
            <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
              <Link to={`/${userRole}/dashboard/reports/firmvisits`} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography variant="h6">Tour Plan Block/Unblock</Typography>
              </Link>
            </Box>
            <Box>
              <Typography p="5px 8px" minHeight="80px">
                List of blocked employees Who have not submitted next month's tour plan before the submission day.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
