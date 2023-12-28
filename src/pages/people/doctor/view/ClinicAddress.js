import { useDispatch, useSelector } from 'react-redux';
import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { fetchDoctorVisitData } from '../../../../redux/slice/GetDoctorVisitSlice';
import { apiget } from '../../../../service/api';
import Iconify from '../../../../components/iconify/Iconify';

export const Clinicaddress = ({ id }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const [visit, seVisit] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const { data, errro, isLoading } = useSelector((state) => state?.getDoctorVisit);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorVisitData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const filtered = data?.filter(({ visitBy }) => visitBy?.includes(id));
      seVisit(filtered?.length > 0 ? filtered : []);
    }
  }, [data]);

  const fetchDoctorData = async () => {
    const result = await apiget(`/api/doctor/${id}`);
    if (result && result.status === 200) {
      setAddressList(result?.data?.result && result?.data?.result[0]?.clinicAddress);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 80,

      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              to={`/${userRole}/dashboard/people/doctor/${params?.row?._id}`}
              style={{ color: '#000', textDecoration: 'none', textAlign: 'center' }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mx: 1.5}}  />
            </Link>
          </div>
        );
      },
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      width: 150,
    },
    {
      field: 'clinicAddress',
      headerName: 'Address',
      width: 300,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 130,
      renderCell: (params) => {
        return <Box>{params?.row?.addressInformation?.city}</Box>;
      },
    },
    {
      field: 'preferredDay',
      headerName: 'Preferred Day',
      width: 150,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.assignedTo}</Box>;
      },
    },
    {
      field: 'startTime',
      headerName: 'Freferrd Time',
      width: 180,
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      width: 150,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      width: 120,
      renderCell: (params) => {
        return <Box>{params?.row?.workInformation?.speciality}</Box>;
      },
    },
    {
      field: 'status',
      headerName: 'Edit Reson',
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
            rows={addressList}
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
