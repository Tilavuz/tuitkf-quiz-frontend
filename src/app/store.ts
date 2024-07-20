import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import userReducer from "@/features/auth/user-slice";
import scienceReducer from "@/features/sciences/sciences-slice";
import questionReducer from "@/features/question/question-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    science: scienceReducer,
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch