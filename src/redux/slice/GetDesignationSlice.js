/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchDesignation = createAsyncThunk('fetchDesignation', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/designationsan`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {

    // console.log("res?.data?.result",res?.data?.result)
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const GetDesignationsanSlice = createSlice({
  name: 'designation',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default GetDesignationsanSlice.reducer;