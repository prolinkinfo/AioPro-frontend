import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TravelAllowance from './TravelAllowance';
import OtherAllowance from './OtherAllowance';

const Allowance = () => {
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
              <Typography sx={{ textAlign: 'center',marginBottom:"15px",fontSize:"12px" }}>Allowance Settings</Typography>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleTabChange}
                aria-label="Vertical tabs"
                sx={{ minWidth: 120 }}
              >
                <Tab label="Travel Allowance" value="1" />
                <Tab label="Other Allowance" value="2" />
              </Tabs>
            </Container>
          </Grid>
          <Grid item xs={8} sm={10} md={10}>
            <TabPanel value="1">
              <TravelAllowance />
            </TabPanel>
            <TabPanel value="2">
              <OtherAllowance />
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </div>
  );
};

export default Allowance;
