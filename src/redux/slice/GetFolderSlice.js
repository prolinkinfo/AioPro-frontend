/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchFolder = createAsyncThunk('fetchFolder', async () => {
  const token = localStorage.getItem('token')
  return axios.get(
    `${constant.baseUrl}/api/folder`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((res) => {
    return res?.data?.result;
  }).catch((error) => alert(error))

});


const GetFolderSlice = createSlice({
  name: 'folderData',
  initialState: {
    data: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default GetFolderSlice.reducer;