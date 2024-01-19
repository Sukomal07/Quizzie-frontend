import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: JSON.parse(localStorage.getItem("data")) || {}
}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("/account/signup", data);
        toast.promise(res, {
            loading: "Wait! Creating your account",
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

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/account/login", data);
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

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const res = axiosInstance.post("/account/logout");
        toast.promise(res, {
            loading: "Loging out...",
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            if (action && action.payload) {
                localStorage.setItem("data", JSON.stringify(action?.payload?.data));
            }
            state.isLoggedIn = true
            state.data = action?.payload?.data
        })
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
        })
    }
})

export default authSlice.reducer