import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SpecialityManagement from './SpecialityManagement';
import CityManagement from './CityManagement'
import ConutryMaster from './countryMaster';
import ZoneManagement from './ZoneManagement';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('1'); // Use string for value

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <TabContext value={activeTab}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
          <Grid item xs={4} sm={2} md={2}>
            <Container maxWidth="xl">
              <Typography sx={{ textAlign: 'center', marginBottom: "15px", fontSize: "12px" }}>Data Operations</Typography>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleTabChange}
                aria-label="Vertical tabs"
                sx={{ minWidth: 120 }}
              >
                <Tab label="Doctor Management" value="1" />
                <Tab label="City Management" value="2" />
                <Tab label="Zone Management" value="3" />
                <Tab label="Speciality Management" value="4" />
                <Tab label="Logs" value="5" />
                <Tab label="SFC Cities" value="6" />
                <Tab label="Country Master" value="7" />
              </Tabs>
            </Container>
          </Grid>
          <Grid item xs={8} sm={10} md={10}>
            <TabPanel value="1">
              xcfvsd
            </TabPanel>
            <TabPanel value="2">
              <CityManagement />
            </TabPanel>
            <TabPanel value="3">
              <ZoneManagement />
            </TabPanel>
            <TabPanel value="4">
              <SpecialityManagement />
            </TabPanel>
            <TabPanel value="5">
              xcvdc
            </TabPanel>
            <TabPanel value="6">
              xcvdc
            </TabPanel>
            <TabPanel value="7">
              <ConutryMaster />
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </div>
  );
};

export default DataManagement;
