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

  if (currStockList?.length > 0) {
    for (const obj of currStockList) {
      newList.push(obj);
    }
  }

  return newList;
}

export function retCurrStockDetails(stockSymbol, stockList) {
  //calculates how many shares
  var listLen = stockList?.length;
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

/*
TODO: 
-Include Company Name with New Stocks.
-Include Company Website With New Stocks

*/

export async function purchaseStock(
  uID,
  symbol,
  companyName,
  sharesPurchased,
  sharesOwned,
  initAmountInvested,
  availableFunds,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  var retMssg = "Error: Transaction is not valid!";
  var newStockList = copyArray(currStockList);
  var newTotalInvestment;
  var newAvailableFunds;
  var newShares = sharesPurchased + sharesOwned;
  var currBank = retBankAmount(uID);
  var newAmountInvested = Number(initAmountInvested + pendingTransPrice);

  //Check to see if valid transaction & return error message if not.
  var isValid = isValidTransaction(availableFunds, pendingTransPrice);
  if (!isValid) return retMssg;

  //Replace values if exists, push new obj if it does not.

  if (sharesOwned > 0) {
    newStockList[stockListIndex] = {
      symbol: symbol,
      companyName: companyName,
      shares: newShares,
      initInvestment: newAmountInvested,
    };
  } else {
    newStockList.push({
      symbol: symbol,
      companyName: companyName,
      shares: sharesPurchased,
      initInvestment: pendingTransPrice,
    });
  }

  //update DB with new stock List.
  await updateDBStocks(uID, newStockList);
  console.log("PurchaseFunc: NewStockList", newStockList);

  //Update DB with new calculated totlal investment.
  newTotalInvestment = Number(
    await calcTotalInvested(newStockList)?.toFixed(2)
  );
  await updateDBInvested(uID, newTotalInvestment);
  console.log("PurchaseFunc: NewTotalInvested:", newTotalInvestment);

  //update DB Available amount
  newAvailableFunds = Number((currBank - newTotalInvestment)?.toFixed(2));
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

  //Return success message.
  return (retMssg = "Success!");
}

//TODO: Go over math.
export async function sellStock(
  uID,
  symbol,
  companyName,
  sharesSold,
  sharesOwned,
  initAmountInvested,
  availableFunds,
  pendingTransPrice,
  currStockList,
  stockListIndex
) {
  var retMssg = "Error: Transaction is not valid!";
  var newShares = sharesOwned - sharesSold;
  var sharesAvailable = newShares >= 0 ? true : false;
  var newStockList = copyArray(currStockList);
  var avgSharePrice = Number((initAmountInvested / sharesOwned)?.toFixed(2)); //3
  var avgValueOfSharesSold = avgSharePrice * sharesSold; //15
  var currBank = retBankAmount(uID);
  var newInitInvestment = Number(
    (initAmountInvested - avgValueOfSharesSold)?.toFixed(2)
  );
  var newAvailableFunds = Number(
    (availableFunds + pendingTransPrice)?.toFixed(2)
  );
  var newBankAmt;
  var newTotalInvestment;

  //if there are no shares available to complete transaction, return
  if (!sharesAvailable) return retMssg;

  console.log("SellStock Obj", {
    pendingTransPrice,
    initAmountInvested,
    currBank,
    newInitInvestment,
  });

  //TODO: Fix logic so stock is deleted at 0 shares.
  if (newShares === 0) newInitInvestment = 0;

  newStockList[stockListIndex] = {
    symbol: symbol,
    companyName: companyName,
    shares: newShares,
    initInvestment: newInitInvestment,
  };

  //update DB with new stock List.
  await updateDBStocks(uID, newStockList);
  console.log("SellFunc: NewStockList", newStockList);

  //Calculate new total invested from stockList update DB with new invested amt.
  newTotalInvestment = await calcTotalInvested(newStockList);
  await updateDBInvested(uID, newTotalInvestment);
  console.log("SellFunc: NewTotalInvested", newTotalInvestment);

  //update DB Bank Amount after sale...
  newBankAmt = newTotalInvestment + newAvailableFunds;
  await updateBankAmount(uID, newBankAmt);

  //update DB Available Funds...
  await updateDBAvailable(uID, newAvailableFunds);
  console.log("SellFunc: NewAvailableFunds:", newAvailableFunds);
}
