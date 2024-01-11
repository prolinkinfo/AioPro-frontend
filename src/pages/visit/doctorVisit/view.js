
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Details from './Details';
import History from './History';
import FeedBack from './FeedBack';
import Images from './Images';
import VisitPresentation from './VisitPresentation';
import { apiget } from '../../../service/api';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [visitData, setVisitData] = useState({})
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    const result = await apiget(`/api/doctorvisit/${id}`);

    if (result && result.status === 200) {
      setVisitData(result?.data?.result)
    }
  }

  React.useEffect(()=>{
    fetchData();
  },[id])

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
        <Typography variant="h4">Visit Details</Typography>
      </Stack>
      <Box sx={{ width: '100%' }} mt={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="History" {...a11yProps(1)} />
            <Tab label="Feedback Form" {...a11yProps(2)} />
            <Tab label="Images" {...a11yProps(3)} />
            <Tab label="Visit Presentation" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Details data={visitData}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <History />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FeedBack />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Images />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <VisitPresentation />
        </CustomTabPanel>

      </Box>
    </Container>
  );
}