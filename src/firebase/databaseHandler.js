import { onValue, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { useState } from "react";
import { app } from "./firebase-config";

export const databaseRef = getDatabase(app);

//Initial amounts when creating new entry in database.
var bank = 2000;
var invested = 0;
var stocks = [
  { symbol: "AAPL", shares: 42, amtInvested: 50000 },
  { symbol: "GME", shares: 31, amtInvested: 32000 },
];

//New User: write to database for the first time
export function addNewUserDB(userID, name, email) {
  set(ref(databaseRef, `Users/${userID}`), {
    userID,
    name,
    email,
    bank,
    invested,
    stocks,
  });
}

export function retName(userID) {
  //This wil return the total stockList from DB.
  var dbName;
  const nameRef = ref(databaseRef, `Users/${userID}`);
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    dbName = data.name;
  });

  return dbName;
}

export function updateBankAmount(userID, newBankAmt) {
  update(ref(databaseRef, `Users/${userID}`), {
    bank: newBankAmt,
  });
}

export function retBankAmount(userID) {
  var retBankAmt;
  const bankAmtRef = ref(databaseRef, `Users/${userID}`);
  onValue(bankAmtRef, (snapshot) => {
    const data = snapshot.val();
    retBankAmt = data.bank;
  });
  console.log("Bank Amt", retBankAmt);
  return retBankAmt;
}

export function updateDBInvestedAmount(userID, enteredInvAmt) {
  // adds up invested amt from each stock
  update(ref(databaseRef, `Users/${userID}`), {
    invested: enteredInvAmt,
  });
}

export function retInvestedAmount(userID) {
  //This will return the totla invested  amount from DB.
  var retInv;
  const invAmtRef = ref(databaseRef, `Users/${userID}`);
  onValue(invAmtRef, (snapshot) => {
    const data = snapshot.val();
    retInv = data.invested;
  });
  return retInv;
}

export function updateDBStockList(userID, enteredStockList) {
  update(ref(databaseRef, `Users/${userID}`), {
    stocks: enteredStockList,
  });
}

export function retTotalDBStockList(userID) {
  //This wil return the total stockList from DB.
  var dbStockList;
  const stockListRef = ref(databaseRef, `Users/${userID}`);
  onValue(stockListRef, (snapshot) => {
    const data = snapshot.val();
    dbStockList = data.stocks;
  });

  return dbStockList;
}

export function retIndividualStockDetail(searchSymbol, stockList) {
  //Returns info about individual stock
  const retDetails = {
    sharesOwned: 0,
    investedAmount: 0,
  };
  var stockArrLen = stockList.length;

  if (stockArrLen > 0) {
  }

  return retDetails;
}

export function returnAllInfo(userID) {
  var retData;
  const allInfoRef = ref(databaseRef, `Users/${userID}`);
  onValue(allInfoRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Data", data);
    retData = {
      name: "Dog",
    };
  });
  return retData;
}
