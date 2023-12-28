import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Stack, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Details } from './view/Details';
import { VisitHistory } from './view/VisitHistory';
import { Clinicaddress } from './view/ClinicAddress';
import { Conversation } from './view/Conversation';
import { Attachments } from './view/Attachments';
import { RelativeDetails } from './view/RelativeDetails';
import { Investment } from './view/Investment';



const ViewDoctor = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Doctors</Typography>
        </Stack>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Details" value="1" />
              <Tab label="Clinic Address" value="2" />
              <Tab label="Visit History" value="3" />
              <Tab label="Conversation" value="4" />
              <Tab label="Attachment" value="5" />
              <Tab label="Investment" value="6" />
              <Tab label="Relative Details" value="7" />
            </TabList>
          </Box>
          <TabPanel value="1"><Details id={id} /></TabPanel>
          <TabPanel value="2"><Clinicaddress id={id} /></TabPanel>
          <TabPanel value="3"><VisitHistory/></TabPanel>

          <TabPanel value="4"><Conversation id={id}/></TabPanel>
          <TabPanel value="5"><Attachments id={id}/></TabPanel>
          <TabPanel value="6"><Investment/></TabPanel>
          <TabPanel value="7"><RelativeDetails/></TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};
export default ViewDoctor;
