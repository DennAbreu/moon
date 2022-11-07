import { retTotalDBStockList, databaseRef } from "../firebase/databaseHandler";

export function isValidTransaction(availableFunds, pendingTransPrice) {
  if (availableFunds >= pendingTransPrice) return true;

  return false;
}

export function applyStockListChanges(searchSymbol, stockList, shares, amtInv) {
  const retStockList = {};

  //Changes the entry using the stock symbol
}

export function purchaseStock(
  symbol,
  shares,
  availableFunds,
  pendingTransPrice,
  currStockList
) {
  //Returns current stocklist from database..
  //if stock exists..update stock
  //if stock does not exist..new entry
  //update InvestedAmt
  //update Bnk Amt
  // var valid = isValidTransaction(availableFunds, pendingTransPrice);
  console.log({ symbol, shares, availableFunds, pendingTransPrice });
}
