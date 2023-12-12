import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../../../../components/iconify';

const OtherAllowance = () => {
  return (
    <div>
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
        <Typography variant="h4">Other Allowance</Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add
        </Button>
      </Stack>
      <Box sx={{ marginTop: '25px' }}>
        hello 
        {/* <CustomizedAccordions /> */}
      </Box>
    </Container>
  </div>
  )
}
export default OtherAllowance;