import {
  updateDBStocks,
  updateDBInvested,
  retBankAmount,
  updateBankAmount,
  updateDBAvailable,
} from "../firebase/dbHandler";

export function isValidTransaction(availableFunds, pendingTransPrice) {
  if (availableFunds >= pendingTransPrice) return true;

  return false;
}

export function copyArray(currStockList) {
  var newList = [];

  for (const obj of currStockList) {
    newList.push(obj);
  }

  return newList;
}

export function retCurrStockDetails(stockSymbol, stockList) {
  //calculates how many shares
  var listLen = 0 || stockList.length;
  var retDetails = {
    index: undefined,
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
  var retMssg = "error";
  var newStockList = [...currStockList];
  var newTotalInvestment;
  var newAvailableFunds;
  var newShares = sharesPurchased + sharesOwned;
  var currBank = retBankAmount(uID);
  var newAmountInvested = Number(
    (amountInvested + pendingTransPrice).toFixed(2)
  );

  //Check to see if valid transaction.
  //return if transaction is not valid
  var isValid = isValidTransaction(availableFunds, pendingTransPrice);
  if (!isValid) return retMssg;

  //Check to see if stock is owned.
  //Replace values if it does, push new obj if it does not.

  if (sharesOwned > 0) {
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

  //update DB with new stock List.
  await updateDBStocks(uID, newStockList);
  console.log("PurchaseFunc: NewStockList", newStockList);

  //Update DB with new calculated totlal investment.
  newTotalInvestment = Number(await calcTotalInvested(newStockList).toFixed(2));
  await updateDBInvested(uID, newTotalInvestment);
  console.log("PurchaseFunc: NewTotalInvested:", newTotalInvestment);

  //update DB Available amount
  newAvailableFunds = Number((currBank - newTotalInvestment).toFixed(2));
  await updateDBAvailable(uID, newAvailableFunds);
  console.log("PurchaseFunc: NewAvailableAmount:", newAvailableFunds);

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
  amountInvested,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  //Check to see if shares are available to sell and return if not.
  var newShares = sharesOwned - sharesSold;
  var sharesAvailable = newShares >= 0 ? true : false;
  var newStockList = copyArray(currStockList);
  var pricePerStock = Number((amountInvested / sharesOwned).toFixed(2));
  var currBank = retBankAmount(uID);
  var newBankAmt = currBank - pricePerStock + pendingTransPrice;
  var investedDiff;
  var newAvailableFunds;
  var newTotalInvestment;

  //if there are no shares available, return
  if (!sharesAvailable) return;
  //if all shares are sold then the investment amount is 0
  newShares === 0
    ? (investedDiff = 0)
    : (investedDiff = pendingTransPrice - amountInvested);

  console.log("SellStock Obj", {
    pendingTransPrice,
    amountInvested,
    currBank,
    investedDiff,
  });

  //update stockList with new information.
  newStockList[stockListIndex] = {
    symbol: symbol,
    shares: newShares,
    initInvestment: investedDiff,
  };

  //update DB with new stock List.
  await updateDBStocks(uID, newStockList);
  console.log("SellFunc: NewStockList", newStockList);

  //Calculate new total invested from stockList update DB with new invested amt.
  newTotalInvestment = await calcTotalInvested(newStockList);
  await updateDBInvested(uID, newTotalInvestment);
  console.log("SellFunc: NewTotalAmt", newTotalInvestment);

  //update DB Bank Amount after sale...
  await updateBankAmount(uID, newBankAmt);

  //update DB Available Funds...
  newAvailableFunds = Number((newBankAmt - newTotalInvestment).toFixed(2));
  await updateDBAvailable(uID, newAvailableFunds);
  console.log("SellFunc: NewAvailableAmount:", newAvailableFunds);
}
