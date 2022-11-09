import { createSlice } from "@reduxjs/toolkit";
import {
  retBankAmount,
  retName,
  retInvestedAmount,
  retTotalDBStockList,
} from "../../firebase/databaseHandler";

const initialState = {
  name: "",
  userID: "",
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
    profResetStore: resetStore,
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
  state.userID = action.payload;
  state.name = retName(action.payload);
  state.bankTotal = retBankAmount(action.payload);
  state.amountInvested = retInvestedAmount(action.payload);
  state.availableFunds = state.bankTotal - state.amountInvested;
  state.stockList = retTotalDBStockList(action.payload);

  console.log("UserID from PrevUser: ", state.userID);
  console.log("Name from PrevUser: ", state.name);
  console.log("BankTotal from PrevUser: ", state.bankTotal);
  console.log("Amt Invested from PrevUser: ", state.amountInvested);
  console.log("StockList from PrevUser: ", state.stockList);
}

function setName(state) {
  state.name = retName(state.userID);
}

function setBank(state) {
  state.bankTotal = retBankAmount(state.userID);
}

function setAmtInvested(state) {
  state.amountInvested = retInvestedAmount(state.userID);
}

function setAvailableFunds(state) {
  state.availableFunds = state.bankTotal - state.retInvestedAmt;
}
function setStockList(state) {
  state.stockList = retTotalDBStockList(state.userID);
}

function resetStore(state) {
  state.name = "";
  state.userID = "";
  state.bankTotal = 0;
  state.amountInvested = 0;
  state.availableFunds = 0;
  state.stockList = [];
}

export const {
  profSetNewUser,
  profSetPrevUser,
  profSetName,
  profSetBank,
  profSetAmtInvested,
  profSetAvailableFunds,
  profSetStockList,
  profResetStore,
} = profSlice.actions;

export default profSlice.reducer;
