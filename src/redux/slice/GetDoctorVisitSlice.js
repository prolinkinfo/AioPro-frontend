/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchDoctorVisitData = createAsyncThunk('fetchDoctorVisitData', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/doctorvisit`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const getDoctorVisitSlice = createSlice({
  name: 'doctorVisitData',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorVisitData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctorVisitData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchDoctorVisitData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default getDoctorVisitSlice.reducer;