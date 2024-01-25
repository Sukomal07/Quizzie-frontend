import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    quiz: {}
}

export const createQuiz = createAsyncThunk("quiz/create", async (quizData) => {
    try {
        const res = axiosInstance.post('/quiz/newquiz', quizData);
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait! creating quiz...",
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

export const getQuiz = createAsyncThunk("quiz/get", async (quizId) => {
    try {
        const res = axiosInstance.get(`/quiz/${quizId}`);
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait! creating quiz...",
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



const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            const payloadData = action?.payload?.data;
            if (payloadData) {
                state.quiz = payloadData
            }
        })
    }
})

export default quizSlice.reducer