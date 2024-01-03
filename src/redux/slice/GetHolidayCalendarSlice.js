/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchHolidayCalendarData = createAsyncThunk('fetchHolidayCalendarData', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/holidaycalendar`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const getHolidayCalendarSlice = createSlice({
  name: 'holidayCalendarData',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidayCalendarData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHolidayCalendarData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchHolidayCalendarData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default getHolidayCalendarSlice.reducer;