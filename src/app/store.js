import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profReducer from "../features/profile/profSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prof: profReducer,
  },
});
