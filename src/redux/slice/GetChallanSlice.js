/* eslint-disable arrow-body-style */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchChallanData = createAsyncThunk('fetchChallanData', async () => {
    const token = localStorage.getItem('token')
    return axios.get(
        `${constant.baseUrl}/api/sampleGiftWithChallan`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    ).then((res) => {
        return res?.data?.result;
    }).catch((error) => alert(error))

});


const GetChallanSlice = createSlice({
    name: 'challanData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallanData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChallanData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchChallanData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default GetChallanSlice.reducer;