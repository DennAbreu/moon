import { onValue, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "./firebase-config";

export const databaseRef = getDatabase(app);

//Initial amounts when creating new entry in database.
var bank = 2000;
var invested = 0;
var stocks = [
  { symbol: "aapl", shares: 42, amtInvested: 50000 },
  { symbol: "gme", shares: 31, amtInvested: 32000 },
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

export function retUserName(userID) {
  //This will return the totla invested  amount from DB.
  var retUserName;
  const userNameRef = ref(databaseRef, `Users/${userID}`);
  onValue(userNameRef, (snapshot) => {
    const data = snapshot.val();
    retUserName = data.name;
  });
  return retUserName;
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
  return retBankAmt;
}

export function updateInvestedAmount(userID, inputList) {
  // adds up invested amt from each stock
  var newInvAmt = calcTotalInvestedAmt(userID);
  update(ref(databaseRef, `Users/${userID}`), {
    bank: newInvAmt,
  });
}

export function retInvestedAmt(userID) {
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
  //TODO: Work on this.
  update(ref(databaseRef, `/${userID}`), {
    stocks: enteredStockList,
  });

  //update invested amount everytime stockList is updated...
  updateInvestedAmount(userID);
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

export function calcTotalInvestedAmt(userID, inputList) {
  //Go through entire array and add up invested amount
  var totalAmt = 0;
  //Iterate through
}

export function retIndividualStockDetail(searchSymbol, stockList) {
  //Returns info about individual stock
  var slLen = stockList.length;

  const retDetails = {
    sharesOwned: 0,
    investedAmount: 0,
  };

  if (stockList.length > 0) {
  }

  return retDetails;
}
