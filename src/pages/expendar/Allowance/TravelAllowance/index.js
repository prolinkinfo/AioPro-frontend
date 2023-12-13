import React ,{ useState }from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../../../../components/iconify';
import CustomizedAccordions from './abc';
import TravelAllowanceModel from './Add';

const TravelAllowance = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  return (
    <div>
      <TravelAllowanceModel isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd}  />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Travel Allowance</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
            Add
          </Button>
        </Stack>
        <Box sx={{ marginTop: '25px' }}>
          <CustomizedAccordions />
        </Box>
      </Container>
    </div>
  );
};
export default TravelAllowance;
