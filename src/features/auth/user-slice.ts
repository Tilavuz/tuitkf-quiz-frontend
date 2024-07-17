import { UserInterface } from "@/interface/user-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  users: UserInterface[] | null;
  loading: boolean;
  totalPages: number | null;
  currentPage: number | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
  totalPages: null,
  currentPage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (
      state,
      action: PayloadAction<{
        totalPages: number;
        currentPage: number;
        users: UserInterface[];
      }>
    ) => {
      (state.loading = false),
        (state.users = action.payload.users),
        (state.totalPages = action.payload.totalPages),
        (state.currentPage = action.payload.currentPage);
    },
    startGetUser: (state) => {
      state.loading = true;
    },
  },
});

export const { getUsers, startGetUser } = userSlice.actions;

export default userSlice.reducer;
