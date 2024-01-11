import { Box, Card } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React from 'react'
import TableStyle from '../../../components/TableStyle';

const History = () => {
  const columns = [
    { field: 'visitId', headerName: 'Visit ID', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'doctorName', headerName: 'Doctor Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'clinicAddress', headerName: 'Clinic Address', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'city', headerName: 'City', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'employeeName', headerName: 'Employee Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'date', headerName: 'Date', flex: 1, cellClassName: 'name-column--cell--capitalize' },
    { field: 'status', headerName: 'Status', flex: 1, cellClassName: 'name-column--cell--capitalize' },
  ];
  return (
    <div>
      <TableStyle>
        <Box width="100%" p={3}>
          <Card style={{ height: '72vh' }}>
            <DataGrid
              rows={nbNO}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </TableStyle>
    </div>
  )
}

export default History