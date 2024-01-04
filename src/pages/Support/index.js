/* eslint-disable arrow-body-style */
import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableStyle from '../../components/TableStyle'
import Iconify from '../../components/iconify'
import AddTicket from './Add'

const Support = () => {
  
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);
  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      // eslint-disable-next-line arrow-body-style
      // renderCell: (params) => {
      //     const handleClick = async (data, e) => {
      //         setAnchorEl(e.currentTarget);
      //         setData(data)
      //         setId(data?._id)
      //     };
      //     return (
      //         <Box>
      //             <Edit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchLeaveEntitlementData={fetchLeaveEntitlementData} data={data} />
      //             <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteData} id={id} />
      //             <CustomMenu
      //                 open={open}
      //                 handleClick={handleClick}
      //                 anchorEl={anchorEl}
      //                 handleClose={handleClose}
      //                 params={params}
      //                 id={id}
      //                 handleOpenEdit={handleOpenEdit}
      //                 handleOpenDeleteModel={handleOpenDeleteModel}
      //             />
      //         </Box>
      //     );
      // },
    },
    { field: 'ticketId', headerName: 'Ticket Id', width: 267, cellClassName: 'name-column--cell--capitalize', },
    { field: 'subject', headerName: 'Subject', width: 267, cellClassName: 'name-column--cell--capitalize', },
    { field: 'createdOn', headerName: 'Created On', width: 267, cellClassName: 'name-column--cell--capitalize', },
    { field: 'closedOn', headerName: 'Closed On', width: 267, cellClassName: 'name-column--cell--capitalize', },
    { field: 'status', headerName: 'Status', width: 267, cellClassName: 'name-column--cell--capitalize', },
  ];
  return (
    <div>
      {/* Add Ticket */}
      <AddTicket isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd}/>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Support Ticket System</Typography>
          <Stack direction="row" spacing={2}>
            <Typography >Contact No: 8448440654</Typography>
            <Typography >Email Id: support@cuztomise.com</Typography>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%" pt={3}>
            <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                Add New Ticket
              </Button>
              <TextField
                type='text'
                size='small'
                placeholder='Search'
              />
            </Stack>
            <Card style={{ height: '72vh' }}>
              <DataGrid
                rows={nbNO}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={row => row._id}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </div>
  )
}

export default Support