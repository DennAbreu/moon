import { ref, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "./firebase-config";

const databaseRef = getDatabase(app);

//Initial amounts when creating new entry in database.
var bank = 2000;
var invested = 0;
var stocks = "empty";

//New User: write to database for the first time
export function addNewUserDB(userID, name, email) {
  set(ref(databaseRef, `/${userID}`), {
    userID,
    name,
    email,
    bank,
    invested,
    stocks,
  });
}

export function updateBankAmount(userID, newBankAmt) {
  update(ref(databaseRef, `/${userID}`), {
    bank: newBankAmt,
  });
}

export function retBankAmount(userID) {
  return 80000;
}

export function updateInvestedAmount(userID) {
  // adds up invested amt from each stock
}
export function retInvestedAmt(userID) {
  //This wil return the totla invested  amount from DB.
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
  //This wil return the stockList from DB.
}
