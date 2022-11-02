import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

function setStockList() {
  return 0;
}

function setName() {
  return 1;
}

export const { profSetName, profSetStockList } = profSlice.actions;
export default profSlice.reducer;
