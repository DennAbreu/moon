import { createSlice } from "@reduxjs/toolkit";
import {
  retBankAmount,
  retInvestedAmt,
  retTotalDBStockList,
  retUserName,
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
    profSetPrevUser: setPrevUserProfileState,
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
  state.availableFunds = state.bankTotal - state.amountInvested;
  state.stockList = retTotalDBStockList(action.payload.id);

  console.log("UserID from SetProfileState: ", state.userID);
  console.log("BankTotal from SetProfileState: ", state.bankTotal);
  console.log("StockList from SetProfileState: ", state.stockList);
}

function setPrevUserProfileState(state, action) {
  state.userID = action.payload.id;
  state.name = retUserName(action.payload.id);
  state.bankTotal = retBankAmount(action.payload.id);
  state.amountInvested = retInvestedAmt(action.payload.id);
  state.availableFunds = state.bankTotal - state.amountInvested;
  state.stockList = retTotalDBStockList(action.payload.id);

  console.log("UserID from PrevUser: ", state.userID);
  console.log("BankTotal from PrevUser: ", state.bankTotal);
  console.log("StockList from PrevUser: ", state.stockList);
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
  profSetPrevUser,
  profSetName,
  profSetBank,
  profSetAmtInvested,
  profSetAvailableFunds,
  profSetStockList,
} = profSlice.actions;

export default profSlice.reducer;
