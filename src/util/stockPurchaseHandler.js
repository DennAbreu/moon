import { retTotalDBStockList } from "../firebase/databaseHandler";

export function isValidTransaction(availableFunds, pendingTransPrice) {
  if (availableFunds >= pendingTransPrice) return true;

  return false;
}

export function applyStockListChanges(searchSymbol, stockList, shares, amtInv) {
  const retStockList = {};

  //Changes the entry using the stock symbol
}

export function retIndividualStockDetail(dbRef, searchSymbol, stockList) {
  //Returns info about individual stock
  const retDetails = {
    sharesOwned: 0,
    investedAmount: 0,
  };

  return retDetails;
}

export function purchaseStock(
  symbol,
  shares,
  availableFunds,
  pendingTransPrice
) {
  //Returns current stocklist from database..
  const currList = retTotalDBStockList();
  //if stock exists..update stock
  //if stock does not exist..new entry
  //update InvestedAmt
  //update Bnk Amt
  // var valid = isValidTransaction(availableFunds, pendingTransPrice);
  console.log({ symbol, shares, availableFunds, pendingTransPrice });
}
