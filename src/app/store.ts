import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import userReducer from "@/features/auth/user-slice";
import themeReducer from "@/features/theme/theme-slice";
import scienceReducer from "@/features/sciences/sciences-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    science: scienceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch