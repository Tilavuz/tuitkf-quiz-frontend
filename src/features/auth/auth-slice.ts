import { setToken } from "@/helpers/action-token";
import { UserInterface } from "@/interface/user-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface AuthSate {
    loading: boolean,
    error: string | null,
    user: UserInterface | null,
    isLogin: boolean
}

const initialState: AuthSate = {
    loading: false,
    error: null,
    user: null,
    isLogin: false
}


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
    }
}) 



export const { auth, logout, authFail, authStart, changeUserData } = authSlice.actions;

export default authSlice.reducer