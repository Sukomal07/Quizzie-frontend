import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    totalQuizzes: 0,
    totalQuestions: 0,
    totalViews: 0,
    trendingQuizzes: []
}

export const getTrending = createAsyncThunk("trendingQuiz/dashboard", async () => {
    try {
        const res = axiosInstance.get("/quiz/dashboard");

        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

const trendingSlice = createSlice({
    name: 'trendingQuiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTrending.fulfilled, (state, action) => {
            const payloadData = action?.payload?.data;
            if (payloadData) {
                const { totalQuestions, totalQuizzes, totalViews, trendingQuizzes } = payloadData;

                state.totalQuestions = totalQuestions;
                state.totalQuizzes = totalQuizzes;
                state.totalViews = totalViews;
                state.trendingQuizzes = [...trendingQuizzes];
            }
        })
    }
})

export default trendingSlice.reducer