import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatisticsState {
  users: number | null;
  admins: number | null;
  questions: number | null;
  sciences: number | null;
}

const initialState: StatisticsState = {
    users: null,
    admins: null,
    questions: null,
    sciences: null
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    getStatistics: (state, action: PayloadAction<StatisticsState>) => {
        state.admins = action.payload.admins,
        state.users = action.payload.users,
        state.questions = action.payload.questions,
        state.sciences = action.payload.sciences
    }
  },
});



export const { getStatistics } = statisticsSlice.actions

export default statisticsSlice.reducer