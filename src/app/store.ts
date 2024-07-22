import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import userReducer from "@/features/auth/user-slice";
import scienceReducer from "@/features/sciences/sciences-slice";
import questionReducer from "@/features/question/question-slice";
import statisticsReducer from "@/features/statistics/statistics-slice";
import sessionsReducer from "@/features/sessions/sessions-slice";
import topUsersReducer from "@/features/top-users/top-users-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    science: scienceReducer,
    question: questionReducer,
    statistics: statisticsReducer,
    sessions: sessionsReducer,
    topUsers: topUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch