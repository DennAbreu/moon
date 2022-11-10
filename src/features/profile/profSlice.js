import { createSlice } from "@reduxjs/toolkit";
import {
  retBankAmount,
  retName,
  retInvestedAmount,
  retTotalDBStockList,
} from "../../firebase/dbHandler";

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
    profSetAmountInvested: setAmountInvested,
    profSetAvailableFunds: setAvailableFunds,
    profSetStockList: setStockList,
    profResetStore: resetStore,
  },
});

function setNewProfileState(state, action) {
  state.userID = action.payload.id;
  state.name = action.payload.name;
  state.bankTotal = 2143.16;
  state.amountInvested = 143.16;
  state.availableFunds = 2000;
  state.stockList = action.payload.stockList;

  console.log("Set New ProfileState Details", {
    userID: state.userID,
    name: state.name,
    bankTotal: state.bankTotal,
    amountInvested: state.amountInvested,
    availableFunds: state.availableFunds,
    stockList: state.stockList,
  });
}

function setPrevUserProfileState(state, action) {
  state.userID = action.payload;
  state.name = retName(action.payload);
  state.bankTotal = retBankAmount(action.payload);
  state.amountInvested = retInvestedAmount(action.payload);
  state.availableFunds = state.bankTotal - state.amountInvested;
  state.stockList = retTotalDBStockList(action.payload);

  console.log("Set Prev ProfileState Details", {
    userID: state.userID,
    name: state.name,
    bankTotal: state.bankTotal,
    amountInvested: state.amountInvested,
    availableFunds: state.availableFunds,
    stockList: state.stockList,
  });
}

function setName(state, action) {
  state.name = retName(state.userID);
}

function setBank(state, action) {
  state.bankTotal = action.payload.totalBank;
}

function setAmountInvested(state, action) {
  state.amountInvested = action.payload.amountInvested;
}

function setAvailableFunds(state, action) {
  state.availableFunds = state.bankTotal - state.amountInvested;
}
function setStockList(state, action) {
  state.stockList = action.payload.stockList;
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
  profSetAmountInvested,
  profSetAvailableFunds,
  profSetStockList,
  profResetStore,
} = profSlice.actions;

export default profSlice.reducer;
