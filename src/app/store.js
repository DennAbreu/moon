import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import profileReducers from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    profile: profileReducers,
  },
});
