import { SessionInterface } from "@/interface/session-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionsState {
  sessions: SessionInterface[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessionsState = {
  sessions: null,
  loading: false,
  error: null,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    getSessions: (state, action: PayloadAction<SessionInterface[]>) => {
      state.sessions = action.payload;
    },
    removeSession: (state, action: PayloadAction<string>) => {
      if (state.sessions) {
        state.sessions = state.sessions?.filter(
          (session) => session._id !== action.payload
        );
      }
    },
    addSession: (state, action: PayloadAction<SessionInterface>) => {
        if(state.sessions) {
            state.sessions = [...state.sessions, action.payload]
        }else {
            state.sessions = [action.payload]
        }
    }
  },
});

export const { getSessions, removeSession, addSession } = sessionsSlice.actions;

export default sessionsSlice.reducer;
