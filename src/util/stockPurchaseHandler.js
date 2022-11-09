import {
  retTotalDBStockList,
  databaseRef,
  updateDBStockList,
  updateDBInvestedAmount,
  retBankAmount,
  updateBankAmount,
} from "../firebase/databaseHandler";

export function isValidTransaction(availableFunds, pendingTransPrice) {
  if (availableFunds >= pendingTransPrice) return true;

  return false;
}

export function retCurrStockDetails(stockSymbol, stockList) {
  //calculates how many shares
  var listLen = stockList.length;
  var retDetails = {
    index: null,
    shares: 0,
    amtInvested: 0,
  };
  for (let i = 0; i < listLen; i++) {
    if (stockList[i].symbol === stockSymbol) {
      retDetails = {
        index: i,
        shares: stockList[i].shares,
        amtInvested: stockList[i].amtInvested,
      };
    }
  }
  return retDetails;
}

export function calcTotalInvested(stockList) {
  var listLen = stockList.length;
  var newList = [...stockList];
  var totalInvAmt = 0;
  for (let i = 0; i < listLen; i++) {
    totalInvAmt += newList[i].amtInvested;
  }

  return totalInvAmt;
}

export async function purchaseStock(
  uID,
  symbol,
  sharesPurchased,
  sharesOwned,
  amtInvested,
  availableFunds,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  var newStockList = [...currStockList];
  var newTotalInvAmt = 0;
  var retMssg = "error";
  var newShares = sharesPurchased + sharesOwned;
  var newAmtInv = amtInvested + pendingTransPrice;

  //Check to see if valid transaction.
  //return if transaction is not valid
  var isValid = isValidTransaction(availableFunds, pendingTransPrice);
  if (!isValid) return retMssg;

  //Check to see if stock is owned.
  //If Yes, replace values at index with new values in the stock list.
  //if No, add new entry to stocklist.
  if (sharesOwned >= 1) {
    newStockList[stockListIndex] = {
      symbol: symbol,
      shares: newShares,
      amtInvested: newAmtInv,
    };
  } else {
    newStockList.push({
      symbol: symbol,
      shares: sharesPurchased,
      amtInvested: pendingTransPrice,
    });
  }

  console.log("newStockList From Purchase", newStockList);
  //update DB with new stock List.
  await updateDBStockList(uID, newStockList);

  //Calculate new total invested from stockList update DB with new invested amt.
  newTotalInvAmt = calcTotalInvested(newStockList);
  console.log("NewTotalAmt", newTotalInvAmt);
  await updateDBInvestedAmount(uID, newTotalInvAmt);

  //update Profile Redux Store...
  console.log("PurchaseFunctionObj:", {
    isValid,
    stockListIndex,
    symbol,
    sharesPurchased,
    availableFunds,
    pendingTransPrice,
  });
}

export async function sellStock(
  uID,
  symbol,
  sharesSold,
  sharesOwned,
  amtInvested,
  availableFunds,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  var newStockList = [...currStockList];
  var newTotalInvAmt = 0;
  var retMssg = "error";
  var shareDiff = sharesOwned - sharesSold;
  var areSharesAvail = shareDiff >= 0 ? true : false;
  var amtInvDiff = amtInvested - pendingTransPrice;
  var oldBankAmt = retBankAmount(uID) - amtInvested;
  console.log("oldBankAmt", oldBankAmt);
  var newBankAmt = oldBankAmt + pendingTransPrice;

  //Check to see if valid transaction.
  //return if transaction is not valid
  var isValid = isValidTransaction(availableFunds, pendingTransPrice);
  if (!areSharesAvail) return retMssg;

  //update stockList
  newStockList[stockListIndex] = {
    symbol: symbol,
    shares: shareDiff,
    amtInvested: amtInvDiff,
  };

  console.log("newStockList from Sales", newStockList);
  //update DB with new stock List.
  await updateDBStockList(uID, newStockList);
  //Calculate new total invested from stockList update DB with new invested amt.
  newTotalInvAmt = calcTotalInvested(newStockList);
  console.log("NewTotalAmt", newTotalInvAmt);
  await updateDBInvestedAmount(uID, newTotalInvAmt);

  //update DB Bank Amount after sale...
  await updateBankAmount(uID, newBankAmt);

  console.log("SalesFunctionObj:", {
    isValid,
    stockListIndex,
    symbol,
    sharesSold,
    availableFunds,
    pendingTransPrice,
  });
}
