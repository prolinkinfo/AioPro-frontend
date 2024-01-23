/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchFirmMonthMaintenance = createAsyncThunk('fetchFirmMonthMaintenance', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/firmMonthMaintenance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const GetFirmMonthMaintenance = createSlice({
  name: 'firmMonthMaintenanceData',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirmMonthMaintenance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFirmMonthMaintenance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchFirmMonthMaintenance.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default GetFirmMonthMaintenance.reducer;