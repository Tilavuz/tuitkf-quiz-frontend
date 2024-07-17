import { ScienceInterface } from "@/interface/science-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SciencesState {
  sciences: ScienceInterface[] | null;
  loading: boolean;
  scienceTotalPages: number | null;
  sciencesCurrentPage: number | null;
}

const initialState: SciencesState = {
  sciences: null,
  loading: false,
  scienceTotalPages: null,
  sciencesCurrentPage: null,
};

const sciencesSlice = createSlice({
  name: "sciences",
  initialState,
  reducers: {
    getSciences: (
      state,
      action: PayloadAction<{
        scienceTotalPages: number;
        sciencesCurrentPage: number;
        sciences: ScienceInterface[];
      }>
    ) => {
      (state.loading = false),
        (state.sciences = action.payload.sciences),
        (state.scienceTotalPages = action.payload.scienceTotalPages),
        (state.sciencesCurrentPage = action.payload.sciencesCurrentPage);
    },
    startGetSciences: (state) => {
      state.loading = true;
    },
    addScience: (state, action: PayloadAction<ScienceInterface>) => {
      if (state.sciences) {
        state.sciences.push(action.payload);
      } else {
        state.sciences = [action.payload];
      }
    },
    chnageScience: (state, action: PayloadAction<ScienceInterface>) => {
      if (state.sciences) {
        state.sciences = state.sciences.filter((science) =>
          science._id === action.payload._id ? action.payload : science
        );
      }
    },
    removeScience: (state, action: PayloadAction<string>) => {
      if (state.sciences) {
        state.sciences = state.sciences.filter(
          (science) => science._id !== action.payload
        );
      }
    },
  },
});

export const { getSciences, startGetSciences } = sciencesSlice.actions;

export default sciencesSlice.reducer;
