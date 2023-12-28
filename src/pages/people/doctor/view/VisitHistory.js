import { useDispatch, useSelector } from 'react-redux';
import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { fetchDoctorVisitData } from '../../../../redux/slice/GetDoctorVisitSlice';

export const VisitHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const [visit, seVisit] = useState([]);
  const { data, errro, isLoading } = useSelector((state) => state?.getDoctorVisit);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDoctorVisitData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const filtered = data?.filter(({ visitBy }) => visitBy?.includes(id));
      seVisit(filtered?.length > 0 ? filtered : []);
    }
  }, [data]);

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 80,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        return (
          <div>
            <Link
              to={`/${userRole}/dashboard/people/doctor/${params?.row?._id}`}
              style={{ color: '#000', textDecoration: 'none' }}
            >
              <VisibilityIcon fontSize="30px" />
            </Link>
          </div>
        );
      },
    },
    {
      field: 'visitId',
      headerName: 'Visit ID',
      width: 120,
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      width: 170,
    },
    {
      field: 'clinicAddress',
      headerName: 'Clinic Address',
      width: 250,
      renderCell: (params) => {
        return <Box>{params?.row?.addressInformation?.city}</Box>;
      },
    },
    {
      field: 'cityName',
      headerName: 'Ciry',
      width: 100,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.assignedTo}</Box>;
      },
    },
    {
      field: 'employeeName',
      headerName: 'Assigned To',
      width: 180,
    },
    {
      field: 'visitDate',
      headerName: 'Visit Time',
      width: 150,
    },
    {
      field: 'visitDate',
      headerName: 'Date',
      width: 120,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.speciality}</Box>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
  ];

  return (
    <div>
      <Card style={{ height: '63vh', marginTop: '10px' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>Loading...</Box>
        ) : (
          <DataGrid
            rows={visit}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row._id}
          />
        )}
      </Card>
    </div>
  );
};
