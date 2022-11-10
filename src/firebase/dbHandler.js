import { onValue, ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "./firebase-config";

export const databaseRef = getDatabase(app);

//Initial amounts when creating new entry in database.
var bank = 2143.16;
var invested = 143.16;
var available = Number((bank - invested).toFixed(2));
var stocks = [{ symbol: "AAPL", shares: 1, initInvestment: 143.16 }];

//New User: write to database for the first time
export function addNewUserDB(userID, name, email) {
  set(ref(databaseRef, `Users/${userID}`), {
    userID,
    name,
    email,
    bank,
    invested,
    available,
    stocks,
  });
}

export function retName(userID) {
  //This wil return the name from DB.
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
  console.log("retBankAmount", retBankAmt);
  return retBankAmt;
}

export function updateDBInvestedAmount(userID, newInvtAmt) {
  // updates overall investment in DB
  update(ref(databaseRef, `Users/${userID}`), {
    invested: newInvtAmt,
  });
}

export function retInvestedAmount(userID) {
  //This will return the total  invested  amount from DB.
  var retInvested;
  const invAmtRef = ref(databaseRef, `Users/${userID}`);
  onValue(invAmtRef, (snapshot) => {
    const data = snapshot.val();
    retInvested = data.invested;
  });
  console.log("retInvestedAmount", retInvested);
  return retInvested;
}

export function updateAvailableAmount(userID, newAvailableAmt) {
  update(ref(databaseRef, `Users/${userID}`), {
    available: newAvailableAmt,
  });
}

export function retAvailableAmount(userID) {
  //This wil return the total stockList from DB.
  var availableAmt;
  const stockListRef = ref(databaseRef, `Users/${userID}`);
  onValue(stockListRef, (snapshot) => {
    const data = snapshot.val();
    availableAmt = data.available;
  });
  console.log("retAvailableAmount", availableAmt);

  return availableAmt;
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
