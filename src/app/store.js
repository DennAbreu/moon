import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import profReducers from "../features/profile/profSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    prof: profReducers,
  },
});
