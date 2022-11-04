import { createSlice } from "@reduxjs/toolkit";
import {
  retBankAmount,
  retInvestedAmt,
  retTotalDBStockList,
} from "../../firebase/databaseHandler";

const initialState = {
  name: "",
  userID: "",
  email: "",
  bankTotal: 0,
  amountInvested: 0,
  availableFunds: 0,
  stockList: [],
};

export const profSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profSetNewUser: setNewProfileState,
    profSetName: setName,
    profSetBank: setBank,
    profSetAmtInvested: setAmtInvested,
    profSetAvailableFunds: setAvailableFunds,
    profSetStockList: setStockList,
  },
});

function setNewProfileState(state, action) {
  state.userID = action.payload.id;
  state.name = action.payload.name;
  state.bankTotal = 2000;
  state.amountInvested = 0;
  state.availableFunds = 2000;

  console.log("State.UserID from SetProfileState: ", state.userID);
  console.log("State.bankTotal from SetProfileState: ", state.bankTotal);
}

function setName(state) {
  // state.name = retBankAmount(state.userID);
}

function setBank(state) {
  state.bankTotal = retBankAmount(state.userID);
}

function setAmtInvested(state) {
  state.amountInvested = retInvestedAmt(state.userID);
}

function setAvailableFunds(state) {
  //
}
function setStockList(state) {
  state.stockList = retTotalDBStockList(state.userID);
}

export const {
  profSetNewUser,
  profSetName,
  profSetBank,
  profSetAmtInvested,
  profSetAvailableFunds,
  profSetStockList,
} = profSlice.actions;

export default profSlice.reducer;
