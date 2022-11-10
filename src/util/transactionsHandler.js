import {
  updateDBStockList,
  updateDBInvestedAmount,
  retBankAmount,
  updateBankAmount,
  updateAvailableAmount,
} from "../firebase/dbHandler";

export function isValidTransaction(availableFunds, pendingTransPrice) {
  if (availableFunds >= pendingTransPrice) return true;

  return false;
}

export function retCurrStockDetails(stockSymbol, stockList) {
  //calculates how many shares
  var listLen = 0 || stockList.length;
  var retDetails = {
    index: null,
    shares: 0,
    initInvestment: 0,
  };
  for (let i = 0; i < listLen; i++) {
    if (stockList[i].symbol === stockSymbol) {
      retDetails = {
        index: i,
        shares: stockList[i].shares,
        initInvestment: stockList[i].initInvestment,
      };
    }
  }
  return retDetails;
}

export function calcTotalInvested(currList) {
  var listLen = currList.length;
  var newList = [...currList];
  var totalInvAmt = 0;
  for (let i = 0; i < listLen; i++) {
    totalInvAmt += newList[i].initInvestment;
  }
  console.log("TotalInvAmt", totalInvAmt);
  return totalInvAmt;
}

export async function purchaseStock(
  uID,
  symbol,
  sharesPurchased,
  sharesOwned,
  amountInvested,
  availableFunds,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  var newStockList = [...currStockList];
  var retMssg = "error";
  var newTotalInvestment;
  var newAvailableAmount;
  var newShares = sharesPurchased + sharesOwned;
  var newAmountInvested = Number(
    (amountInvested + pendingTransPrice).toFixed(2)
  );

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
      initInvestment: newAmountInvested,
    };
  } else {
    newStockList.push({
      symbol: symbol,
      shares: sharesPurchased,
      initInvestment: pendingTransPrice,
    });
  }

  //Calculate new total invested from stockList update DB with new invested amt.
  newTotalInvestment = await calcTotalInvested(newStockList);
  console.log("New Total Invested:", newTotalInvestment);
  await updateDBInvestedAmount(uID, newTotalInvestment);

  //update DB with new stock List.
  await updateDBStockList(uID, newStockList);

  //update DB Available amount
  var currBank = retBankAmount(uID);
  newAvailableAmount = Number((currBank - newTotalInvestment).toFixed(2));
  console.log("New Available Amount:", newAvailableAmount);

  await updateAvailableAmount(uID, newAvailableAmount);

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

//TODO: Go over math.
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
  var newShares = sharesOwned - sharesSold;
  var sharesAvailable = sharesOwned - sharesSold >= 0 ? true : false;
  //Check to see if shares are available to sell and return if not.
  if (!sharesAvailable) return;

  var newStockList = [...currStockList];
  var oldBankAmt = retBankAmount(uID);
  var newBankAmt = oldBankAmt - amtInvested + pendingTransPrice;
  var newTotalInvAmt;
  var amtInvestedDiff;

  //if all shares are sold then the investment amount is 0
  if (newShares === 0) {
    amtInvestedDiff = 0;
  } else {
    amtInvestedDiff = pendingTransPrice - amtInvested;
  }
  console.log("SellStock Obj", {
    pendingTransPrice,
    amtInvested,
    oldBankAmt,
    amtInvestedDiff,
  });

  //update stockList
  newStockList[stockListIndex] = {
    symbol: symbol,
    shares: newShares,
    initInvestment: amtInvestedDiff,
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
}
