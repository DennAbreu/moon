import { createSlice } from "@reduxjs/toolkit";

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
    profUpdateUser: updateProfileState,
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

function updateProfileState(state, action) {
  state.userID = action.payload.userID;
  state.name = action.payload.name;
  state.bankTotal = action.payload.bank;
  state.amountInvested = action.payload.invested;
  state.availableFunds = action.payload.available;
  state.stockList = action.payload.stocks;

  console.log("Update Profile Slice Details", {
    userID: state.userID,
    name: state.name,
    bankTotal: state.bankTotal,
    amountInvested: state.amountInvested,
    availableFunds: state.availableFunds,
    stockList: state.stockList,
  });
}

function setName(state, action) {
  state.name = action.payload.name;
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
  profUpdateUser,
  profSetName,
  profSetBank,
  profSetAmountInvested,
  profSetAvailableFunds,
  profSetStockList,
  profResetStore,
} = profSlice.actions;

export default profSlice.reducer;
