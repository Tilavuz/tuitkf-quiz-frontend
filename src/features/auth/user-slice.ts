import { UserInterface } from "@/interface/user-interface";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";




export interface UserState {
  users: UserInterface[] | null;
  loading: boolean;
  totalPages: number | 0;
  currentPage: number | 0;
}

const initialState: UserState = {
  users: null,
  loading: false,
  totalPages: 0,
  currentPage: 0
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<{ totalPage: number, currentPage: number, users: UserInterface[] }>) => {
            state.loading = false,
            state.users = action.payload.users,
            state.totalPages = action.payload.totalPage,
            state.currentPage = action.payload.currentPage
        },
        startGetUser: (state) => {
            state.loading = true
        }
    }
})



export const { getUsers, startGetUser } = userSlice.actions


export default userSlice.reducer