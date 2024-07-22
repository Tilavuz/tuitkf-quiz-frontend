import { SessionInterface } from "@/interface/session-interface";
import { UserInterface } from "@/interface/user-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TopUsersState {
  topUsers: { user: UserInterface; session: SessionInterface }[] | null;
  topFirstUsers: { user: UserInterface; session: SessionInterface }[] | null;
  topSecondUsers: { user: UserInterface; session: SessionInterface }[] | null;
  topThirdUsers: { user: UserInterface; session: SessionInterface }[] | null;
  topFourthUsers: { user: UserInterface; session: SessionInterface }[] | null;
}

const initialState: TopUsersState = {
  topUsers: null,
  topFirstUsers: null,
  topFourthUsers: null,
  topSecondUsers: null,
  topThirdUsers: null
};


const topUsersSlice = createSlice({
  name: "topUsers",
  initialState,
  reducers: {
    getTopUsers: (
      state,
      action: PayloadAction<
        { user: UserInterface; session: SessionInterface }[]
      >
    ) => {
      state.topUsers = action.payload;
    },
    getTopFirstUsers: (
      state,
      action: PayloadAction<
        { user: UserInterface; session: SessionInterface }[]
      >
    ) => {
      state.topFirstUsers = action.payload;
    },
    getTopSecondUsers: (
      state,
      action: PayloadAction<
        { user: UserInterface; session: SessionInterface }[]
      >
    ) => {
      state.topSecondUsers = action.payload;
    },
    getTopThirdUsers: (
      state,
      action: PayloadAction<
        { user: UserInterface; session: SessionInterface }[]
      >
    ) => {
      state.topThirdUsers = action.payload;
    },
    getTopFourthUsers: (
      state,
      action: PayloadAction<
        { user: UserInterface; session: SessionInterface }[]
      >
    ) => {
      state.topFourthUsers = action.payload;
    },
  },
});




export const { getTopFirstUsers, getTopFourthUsers, getTopSecondUsers, getTopThirdUsers, getTopUsers } = topUsersSlice.actions
export default topUsersSlice.reducer