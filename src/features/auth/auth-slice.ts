import { apiClient } from "@/api/api-client";
import { setToken } from "@/helpers/action-token";
import { UserInterface } from "@/interface/user-interface";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


export interface AuthSate {
    loading: boolean,
    error: string | null,
    user: UserInterface | null,
    isLogin: boolean,
    status: string | null
}

const initialState: AuthSate = {
    loading: false,
    error: null,
    user: null,
    isLogin: false,
    status: null
}

export const getUser = createAsyncThunk('user/getUser', async (_, thunkApi) => {
    try {
        const res = await apiClient.get('/auth')
        return res.data
    } catch (error) {
        const result = error as Error
        return thunkApi.rejectWithValue(result.message)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        auth: (state, action: PayloadAction<UserInterface>) => {
            state.isLogin = true,
            state.loading= false,
            state.user = action.payload,
            state.error = null
        },
        changeUserData: (state, action: PayloadAction<UserInterface>) => {
            state.loading= false,
            state.user = action.payload
        },
        logout: (state) => {
            state.loading = false,
            state.error = null,
            setToken('')
        },
        authStart: (state) => {
            state.loading = true,
            state.error = null
        },
        authFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload,
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getUser.fulfilled, (state, action: PayloadAction<UserInterface>) => {
            state.user = action.payload,
            state.status = 'successful'
        })
        .addCase(getUser.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.error.message || "Failed to fetch user";
        })
    }
}) 

export const { auth, logout, authFail, authStart, changeUserData } = authSlice.actions;

export default authSlice.reducer