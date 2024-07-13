import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface AuthSate {
    loading: boolean,
    error: string | null
}

const initialState: AuthSate = {
    loading: false,
    error: null
}


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
}) 