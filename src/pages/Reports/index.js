import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Divider, Typography, Stack, Button } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Iconify from '../../components/iconify';
import Setting from './Setting';

const ReportPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  return (
    <>
      <Setting isOpen={isOpenAdd} handleClose={handleCloseAdd} />
      <Container maxWidth="xl">
        <Button
          variant="contained"
          // startIcon={<Iconify icon="eva:plus-fill" />}
          style={{ float: 'right', marginTop: '5px' }}
          onClick={handleOpenAdd}
        >
          <SettingsSuggestIcon />
        </Button>
      </Container>

      <Box sx={{ padding: '15px 25px' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6" my="5px">
                Work Report
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
              <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
                <Link
                  to={`/${userRole}/dashboard/reports/visit`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <Typography variant="h6">Visit Report</Typography>
                </Link>
              </Box>
              <Box>
                <Typography p="5px 8px" minHeight="120px">
                  This report is based on the closed calls, 2 reports will be generated, one for no visits less than the
                  particular number, and one for visits greater than a particular number for a specific month.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
              <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
                <Link
                  to={`/${userRole}/dashboard/reports/firmvisits`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <Typography variant="h6">Firm Visit Report</Typography>
                </Link>
              </Box>
              <Box>
                <Typography p="5px 8px" minHeight="120px">
                  Report showing firm’s closed, skipped and open calls by a particular employee during a period.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6" my="5px">
                Productivity & Business Reports
              </Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6" my="5px">
                Logs,Attendance & Quiz Reports
              </Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6" my="5px">
                Expense,Leave & Tour Plan Reports
              </Typography>
              <Divider />
            </Box>
            <Box sx={{ margin: '10px 5px', border: '2px solid #eee', borderRadius: '10px' }}>
              <Box sx={{ backgroundColor: '#eee', color: '#000', padding: '8px 10px' }}>
                <Link to={`/${userRole}/dashboard/reports/leave`} style={{ textDecoration: 'none', color: '#000' }}>
                  <Typography variant="h6">Leave Report</Typography>
                </Link>
              </Box>
              <Box>
                <Typography p="5px 8px" minHeight="120px">
                  A report showing the leaves status of the particular employees during a specific period.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ReportPage;
