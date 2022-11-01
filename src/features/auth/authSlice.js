import { createSlice } from "@reduxjs/toolkit";

//create initial state for Auth Object.
//False = User is logged Out
//True = User is logged In.
const initialState = {
  authStatus: false,
};

//create reducers with actions for auth functions. SignUp, Login, and Logout.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignUp: signup,
    authLogIn: login,
    authLogOut: logout,
  },
});

function login(state) {
  state.authStatus = true;
  console.log("authStatus", state.authStatus);
}

function logout(state) {
  state.authStatus = false;
  console.log("authStatus", state.authStatus);
}

function signup(state) {
  state.authStatus = true;
}

export const { authSignUp, authLogIn, authLogOut } = authSlice.actions;

export default authSlice.reducer;
