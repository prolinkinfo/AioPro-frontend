import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableStyle from '../../../components/TableStyle';
import Iconify from '../../../components/iconify';
import { fetchFaqMaster } from '../../../redux/slice/GetFAQMasterSlice';

const FaqMaster = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const faqMasterList = useSelector((state) => state?.getFaqMaster?.data)

  useEffect(() => {
    dispatch(fetchFaqMaster());
  }, [])
  
  return (
    <div>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">FAQ Bank</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                <Link
                  to={`/${userRole}/dashboard/setting/applicationMaster/faqMaster/add`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Add New
                </Link>
              </Button>
            </Stack>

            <Card style={{padding:"15px"}}>
              <TableContainer component={Paper} style={{ borderRadius: "0" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className='faq-table presantationTable'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>Answer</TableCell>
                      <TableCell>Question</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      faqMasterList && faqMasterList.length > 0 && faqMasterList.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell><Button variant='outlined' size='small' onClick={() => navigate(`/${userRole}/dashboard/setting/applicationMaster/faqMaster/add`, { state: { data: item } })}>Edit</Button></TableCell>
                          <TableCell>
                            <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                          </TableCell>
                          <TableCell>{item.question}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>


          </Box>
        </TableStyle>
      </Container>
    </div>
  );
};

export default FaqMaster;
