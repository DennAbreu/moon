import { createSlice } from "@reduxjs/toolkit";
import { retTotalStockList } from "../../firebase/databaseHandler";

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
    profSetName: setName,
    profSetStockList: setStockList,
  },
});

function setStockList(userID, state) {
  return (state.stockList = retTotalStockList(userID));
}

function setName() {
  return 1;
}

export const { profSetName, profSetStockList } = profSlice.actions;
export default profSlice.reducer;
