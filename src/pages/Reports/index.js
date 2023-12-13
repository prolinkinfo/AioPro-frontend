import React from 'react';
import { Container, Grid, Box, Divider, Typography } from '@mui/material';

const ReportPage = () => {
  return (
    <>
      {/* <Container> */}
      <Box sx={{ padding: '15px 25px' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography>Work Report</Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography>Productivity & Business Reports</Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography>Logs,Attendance & Quiz Reports</Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography>Expense,Leave & Tour Plan Reports</Typography>
              <Divider />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
};
export default ReportPage;
