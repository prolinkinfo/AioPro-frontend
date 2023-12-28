/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { allusers, apiget } from '../service/api';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [allUserList, setAllUserList] = useState([]);
  const [opdList, setOpdList] = useState([]);
  const [meetingList, setMeetingList] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  async function fetchUserData() {
    const result = await apiget('/api/users');
    if (result && result.status === 200) {
      const filter = result?.data?.filter((user) => user?.role !== 'Dr');
      setAllUserList(filter);
    }
  }

  async function fetchOpdData() {
    const result = await apiget('/api/opd');
    if (result && result.status === 200) {
      setOpdList(result?.data);
    }
  }

  async function fetchMeetingData() {
    const result = await apiget(`/api/meeting/?createdBy=${user?.id}`);
    if (result && result.status === 200) {
      // Get the current date as a string in "YYYY-MM-DD" format
      const today = new Date().toISOString().split('T')[0];

      // Filter meetings created today
      const meetingsCreatedToday = result?.data?.filter(
        (meeting) => meeting?.createdOn?.split('T')[0] === today && meeting?.status === 'verified'
      );
      setMeetingList(meetingsCreatedToday);
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchOpdData();
    fetchMeetingData();
  }, []);

  function getFormattedDate() {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${day} - ${month} - ${year}`;
    return formattedDate;
  }



  return (
    <>
      <Helmet>{/* <title> Dashboard | Minimal UI </title> */}</Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5, textTransform: 'capitalize' }}>
          Hi, {user?.userName}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Imployees" total={allUserList.length} icon={'mdi:users'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doctors" total={opdList?.length} color="info" icon={'healthicons:health'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Firms"
              total={meetingList?.length}
              color="warning"
              icon={'healthicons:group-discussion-meetingx3'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Expenses" total="10" color="error" icon={'mdi:events'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'Doctor Visit',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 67, 43],
                },
                {
                  name: 'Firm Visit',
                  type: 'area',
                  fill: 'gradient',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Attendance"
              chartData={[
                { label: 'Present', value: 4344, type: 'radialBar' },
                { label: 'Absent', value: 5435, type: 'radialBar' },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title={`Field Activities   (${getFormattedDate()})`}
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTasks
              title={`Visit  (${getFormattedDate()})`}
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
