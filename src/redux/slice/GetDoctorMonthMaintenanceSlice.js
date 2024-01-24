/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchDoctorMonthMaintenance = createAsyncThunk('fetchDoctorMonthMaintenance', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/doctorMonthMaintenance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const GetDoctorMonthMaintenance = createSlice({
  name: 'doctorMonthMaintenanceData',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorMonthMaintenance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctorMonthMaintenance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchDoctorMonthMaintenance.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default GetDoctorMonthMaintenance.reducer;